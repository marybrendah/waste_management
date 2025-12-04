import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Trash2, 
  BarChart3, 
  Settings, 
  Recycle,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Disposal", href: "/disposal", icon: Trash2 },
  { name: "Recycling", href: "/recycling", icon: Recycle },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile, roles, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const displayName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : 'User';
  
  const primaryRole = roles[0] || 'student';

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar border-r border-sidebar-border px-6 pb-4">
          <div className="flex h-20 shrink-0 items-center">
            <Recycle className="h-8 w-8 text-primary" />
            <span className="ml-3 text-xl font-display font-semibold text-sidebar-foreground">
              EcoTrack
            </span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 transition-all duration-200",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-primary"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="border-t border-sidebar-border pt-4">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
                      <User className="h-5 w-5 text-sidebar-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-sidebar-foreground truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-sidebar-foreground/60 capitalize">
                        {primaryRole.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="mt-2 w-full flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          <div className="flex items-center gap-x-2">
            <Recycle className="h-6 w-6 text-primary" />
            <span className="text-lg font-display font-semibold">EcoTrack</span>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm">
            <nav className="fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto bg-sidebar border-r border-sidebar-border px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <Recycle className="h-8 w-8 text-primary" />
                <span className="ml-3 text-xl font-display font-semibold text-sidebar-foreground">
                  EcoTrack
                </span>
              </div>
              <ul role="list" className="mt-6 space-y-1 flex-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "group flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 transition-all duration-200",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-sidebar-border pt-4 mt-4">
                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
                    <User className="h-5 w-5 text-sidebar-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 capitalize">
                      {primaryRole.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="mt-2 w-full flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};
