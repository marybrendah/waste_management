import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, Database, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const roleDisplayNames: Record<string, string> = {
  student: "Student",
  it_staff: "IT Staff",
  environmental_officer: "Environmental Officer",
  admin: "Administrator",
};

const roleColors: Record<string, string> = {
  student: "bg-secondary text-secondary-foreground",
  it_staff: "bg-primary text-primary-foreground",
  environmental_officer: "bg-accent text-accent-foreground",
  admin: "bg-destructive text-destructive-foreground",
};

export default function Settings() {
  const { user, profile, roles, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setDepartment(profile.department || "");
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        department: department,
      })
      .eq("id", user.id);

    setIsSaving(false);
    
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Settings</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage your account and system preferences
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Profile Settings */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-display">
              <User className="h-5 w-5 text-primary" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={user?.email || ""} 
                disabled 
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input 
                id="department" 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g., Computing and Technology" 
              />
            </div>
            <div className="space-y-2">
              <Label>Role(s)</Label>
              <div className="flex flex-wrap gap-2">
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <Badge key={role} className={roleColors[role] || "bg-secondary"}>
                      {roleDisplayNames[role] || role}
                    </Badge>
                  ))
                ) : (
                  <Badge className="bg-secondary text-secondary-foreground">Student</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Contact an administrator to change your role
              </p>
            </div>
            <Button 
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="gradient-primary text-primary-foreground hover:opacity-90"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-display">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates for disposal requests</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Recycling Milestones</p>
                <p className="text-sm text-muted-foreground">Get notified when recycling goals are achieved</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Monthly Reports</p>
                <p className="text-sm text-muted-foreground">Receive monthly environmental impact reports</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-display">
              <Database className="h-5 w-5 text-primary" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" defaultValue="Uganda Christian University - Bishop Barham University College" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept">Department</Label>
              <Input id="dept" defaultValue="Department of Computing and Technology" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Auto-approve Low Priority</p>
                <p className="text-sm text-muted-foreground">Automatically approve low priority disposal requests</p>
              </div>
              <Switch />
            </div>
            <Button className="gradient-primary text-primary-foreground hover:opacity-90">
              Update Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-display">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button variant="outline">Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
