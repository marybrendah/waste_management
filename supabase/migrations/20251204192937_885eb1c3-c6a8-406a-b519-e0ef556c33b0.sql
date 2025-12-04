-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('it_staff', 'student', 'environmental_officer', 'admin');

-- Create enum for device status
CREATE TYPE public.device_status AS ENUM ('active', 'disposed', 'pending_disposal', 'recycled');

-- Create enum for disposal status
CREATE TYPE public.disposal_status AS ENUM ('pending', 'approved', 'rejected', 'completed');

-- Create enum for device condition
CREATE TYPE public.device_condition AS ENUM ('working', 'repairable', 'non_functional', 'hazardous');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'student',
  UNIQUE (user_id, role)
);

-- Create devices table
CREATE TABLE public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  serial_number TEXT UNIQUE,
  location TEXT,
  condition device_condition DEFAULT 'working',
  status device_status DEFAULT 'active',
  acquisition_date DATE,
  added_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create disposal_requests table
CREATE TABLE public.disposal_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES public.devices(id) ON DELETE CASCADE NOT NULL,
  requested_by UUID REFERENCES auth.users(id) NOT NULL,
  reason TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  status disposal_status DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recycling_records table
CREATE TABLE public.recycling_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES public.devices(id) ON DELETE CASCADE NOT NULL,
  disposal_request_id UUID REFERENCES public.disposal_requests(id),
  recycling_partner TEXT,
  weight_kg DECIMAL(10,2),
  materials_recovered TEXT[],
  co2_saved_kg DECIMAL(10,2),
  certificate_number TEXT,
  recycled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disposal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recycling_records ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is staff (IT staff, environmental officer, or admin)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('it_staff', 'environmental_officer', 'admin')
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Staff can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_staff(auth.uid()));

-- User roles policies (only admins can modify)
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Devices policies
CREATE POLICY "Authenticated users can view devices" ON public.devices
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can insert devices" ON public.devices
  FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update devices" ON public.devices
  FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));

CREATE POLICY "Admins can delete devices" ON public.devices
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Disposal requests policies
CREATE POLICY "Users can view their own requests" ON public.disposal_requests
  FOR SELECT USING (auth.uid() = requested_by);

CREATE POLICY "Staff can view all requests" ON public.disposal_requests
  FOR SELECT USING (public.is_staff(auth.uid()));

CREATE POLICY "Authenticated users can create requests" ON public.disposal_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = requested_by);

CREATE POLICY "Users can update their own pending requests" ON public.disposal_requests
  FOR UPDATE USING (auth.uid() = requested_by AND status = 'pending');

CREATE POLICY "Staff can update all requests" ON public.disposal_requests
  FOR UPDATE USING (public.is_staff(auth.uid()));

-- Recycling records policies
CREATE POLICY "Authenticated users can view recycling records" ON public.recycling_records
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can insert recycling records" ON public.recycling_records
  FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update recycling records" ON public.recycling_records
  FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));

-- Trigger to create profile and assign default role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_devices_updated_at
  BEFORE UPDATE ON public.devices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_disposal_requests_updated_at
  BEFORE UPDATE ON public.disposal_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();