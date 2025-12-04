import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, TrendingUp, Calendar } from "lucide-react";

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Analytics & Reports</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Visualize waste management data and trends
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button className="gradient-primary text-primary-foreground hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <BarChart3 className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-3xl font-display font-bold text-foreground">2,847</p>
              <p className="mt-1 text-sm text-muted-foreground">Total Devices</p>
              <p className="mt-2 text-xs text-success">↑ 12.5% this month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-success mb-2" />
              <p className="text-3xl font-display font-bold text-foreground">98.5%</p>
              <p className="mt-1 text-sm text-muted-foreground">Recycling Rate</p>
              <p className="mt-2 text-xs text-success">↑ 2.3% this month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <BarChart3 className="mx-auto h-8 w-8 text-accent mb-2" />
              <p className="text-3xl font-display font-bold text-foreground">1,245 kg</p>
              <p className="mt-1 text-sm text-muted-foreground">CO₂ Saved</p>
              <p className="mt-2 text-xs text-success">↑ 15.3% this month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-warning mb-2" />
              <p className="text-3xl font-display font-bold text-foreground">143</p>
              <p className="mt-1 text-sm text-muted-foreground">Pending Disposal</p>
              <p className="mt-2 text-xs text-warning">↑ 8.2% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Placeholders */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-display">Monthly Recycling Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Chart visualization area</p>
                  <p className="text-xs text-muted-foreground">Monthly data comparison</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-display">Device Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Chart visualization area</p>
                  <p className="text-xs text-muted-foreground">Category distribution</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-display">Environmental Impact Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Chart visualization area</p>
                  <p className="text-xs text-muted-foreground">CO₂ reduction timeline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-display">Disposal Request Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Chart visualization area</p>
                  <p className="text-xs text-muted-foreground">Status breakdown</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Report */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-display">Monthly Summary Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Devices Added</p>
                  <p className="mt-1 text-2xl font-display font-bold text-foreground">347</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Devices Disposed</p>
                  <p className="mt-1 text-2xl font-display font-bold text-foreground">89</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Recycling Efficiency</p>
                  <p className="mt-1 text-2xl font-display font-bold text-success">98.5%</p>
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-foreground">Key Insights:</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Recycling rate improved by 2.3% compared to last month</li>
                  <li>• 143 devices pending disposal approval - 15% increase</li>
                  <li>• Environmental impact score: A+ (maintained)</li>
                  <li>• Top performing category: Laptops & Computers (98% recycling rate)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
