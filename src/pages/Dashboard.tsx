import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Trash2, 
  Recycle, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Devices",
      value: "2,847",
      icon: Package,
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: "Pending Disposal",
      value: "143",
      icon: Clock,
      trend: { value: 8.2, isPositive: false }
    },
    {
      title: "Recycled This Month",
      value: "89",
      icon: Recycle,
      trend: { value: 23.1, isPositive: true }
    },
    {
      title: "CO₂ Saved (kg)",
      value: "1,245",
      icon: TrendingUp,
      trend: { value: 15.3, isPositive: true }
    }
  ];

  const recentDisposals = [
    { id: 1, device: "Dell Laptop XPS 13", status: "Pending", date: "2025-11-25", priority: "High" },
    { id: 2, device: "HP Printer LaserJet", status: "Approved", date: "2025-11-24", priority: "Medium" },
    { id: 3, device: "Samsung Monitor 24\"", status: "Recycled", date: "2025-11-23", priority: "Low" },
    { id: 4, device: "iPhone 12", status: "Pending", date: "2025-11-22", priority: "High" },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome to EcoTrack - Your E-Waste Management System
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Disposals */}
          <Card className="lg:col-span-2 shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-display">
                <Trash2 className="h-5 w-5 text-primary" />
                Recent Disposal Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDisposals.map((disposal) => (
                  <div
                    key={disposal.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{disposal.device}</p>
                      <p className="text-sm text-muted-foreground">{disposal.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          disposal.priority === "High"
                            ? "bg-destructive/10 text-destructive"
                            : disposal.priority === "Medium"
                            ? "bg-warning/10 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {disposal.priority}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          disposal.status === "Recycled"
                            ? "bg-success/10 text-success"
                            : disposal.status === "Approved"
                            ? "bg-primary/10 text-primary"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {disposal.status === "Recycled" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : disposal.status === "Approved" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {disposal.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full" variant="outline">
                View All Requests
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-display">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gradient-primary text-primary-foreground hover:opacity-90" size="lg">
                <Package className="mr-2 h-5 w-5" />
                Add New Device
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Trash2 className="mr-2 h-5 w-5" />
                Request Disposal
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Recycle className="mr-2 h-5 w-5" />
                Track Recycling
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card className="gradient-card shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-display">
              <TrendingUp className="h-5 w-5 text-primary" />
              Environmental Impact This Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-4xl font-display font-bold text-primary">1,245 kg</p>
                <p className="mt-2 text-sm text-muted-foreground">CO₂ Emissions Reduced</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display font-bold text-accent">892</p>
                <p className="mt-2 text-sm text-muted-foreground">Devices Recycled</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display font-bold text-success">98.5%</p>
                <p className="mt-2 text-sm text-muted-foreground">Recycling Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
