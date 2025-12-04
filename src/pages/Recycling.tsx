import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Recycle, TrendingUp, Package, Leaf } from "lucide-react";

export default function Recycling() {
  const stats = [
    {
      title: "Total Recycled",
      value: "892",
      icon: Recycle,
      trend: { value: 23.1, isPositive: true }
    },
    {
      title: "In Progress",
      value: "34",
      icon: Package,
      trend: { value: 5.2, isPositive: true }
    },
    {
      title: "Recycling Rate",
      value: "98.5%",
      icon: TrendingUp,
      trend: { value: 2.3, isPositive: true }
    },
    {
      title: "Environmental Score",
      value: "A+",
      icon: Leaf,
    }
  ];

  const recyclableCategories = [
    { name: "Laptops & Computers", recycled: 245, total: 250, percentage: 98 },
    { name: "Mobile Devices", recycled: 189, total: 200, percentage: 94.5 },
    { name: "Monitors & Displays", recycled: 156, total: 160, percentage: 97.5 },
    { name: "Printers", recycled: 78, total: 80, percentage: 97.5 },
    { name: "Network Equipment", recycled: 124, total: 130, percentage: 95.4 },
    { name: "Accessories", recycled: 100, total: 120, percentage: 83.3 },
  ];

  const recentRecycling = [
    { id: 1, batch: "BATCH-2025-11-001", devices: 15, date: "2025-11-25", status: "Completed", weight: "45kg" },
    { id: 2, batch: "BATCH-2025-11-002", devices: 8, date: "2025-11-23", status: "Completed", weight: "28kg" },
    { id: 3, batch: "BATCH-2025-11-003", devices: 12, date: "2025-11-20", status: "In Progress", weight: "38kg" },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground">Recycling Tracker</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Monitor recycling progress and environmental impact
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Recycling Categories */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-display">Recycling by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recyclableCategories.map((category) => (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{category.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {category.recycled} of {category.total} devices
                      </p>
                    </div>
                    <span className="text-lg font-semibold text-primary">
                      {category.percentage}%
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Batches & Environmental Impact */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Batches */}
          <Card className="shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-display">Recent Recycling Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecycling.map((batch) => (
                  <div
                    key={batch.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{batch.batch}</p>
                      <p className="text-sm text-muted-foreground">
                        {batch.devices} devices • {batch.weight} • {batch.date}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        batch.status === "Completed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full" variant="outline">
                View All Batches
              </Button>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card className="gradient-card shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-display">
                <Leaf className="h-5 w-5 text-success" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-success/10 p-4 text-center">
                  <p className="text-4xl font-display font-bold text-success">1,245 kg</p>
                  <p className="mt-1 text-sm text-muted-foreground">CO₂ Emissions Prevented</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-display font-bold text-primary">892</p>
                    <p className="mt-1 text-xs text-muted-foreground">Devices Recycled</p>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-display font-bold text-accent">3,456 kg</p>
                    <p className="mt-1 text-xs text-muted-foreground">Materials Recovered</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success"></span>
                    Equivalent to planting 150 trees
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    Saved 2,340 liters of water
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    Prevented 890 kg of toxic waste
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
