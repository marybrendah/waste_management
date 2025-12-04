import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Download } from "lucide-react";

export default function Inventory() {
  const devices = [
    { id: 1, name: "Dell Laptop XPS 13", category: "Laptop", status: "Active", location: "IT Department", purchaseDate: "2022-03-15", condition: "Good" },
    { id: 2, name: "HP Printer LaserJet Pro", category: "Printer", status: "Active", location: "Administration", purchaseDate: "2021-07-22", condition: "Fair" },
    { id: 3, name: "Samsung Monitor 24\"", category: "Monitor", status: "Disposed", location: "Storage", purchaseDate: "2019-11-10", condition: "Poor" },
    { id: 4, name: "iPhone 12", category: "Mobile", status: "Active", location: "IT Support", purchaseDate: "2023-01-05", condition: "Excellent" },
    { id: 5, name: "Cisco Router", category: "Network", status: "Active", location: "Server Room", purchaseDate: "2020-09-18", condition: "Good" },
    { id: 6, name: "MacBook Pro 16\"", category: "Laptop", status: "Maintenance", location: "Design Lab", purchaseDate: "2023-05-12", condition: "Good" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Disposed":
        return "bg-muted text-muted-foreground";
      case "Maintenance":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "text-success";
      case "Good":
        return "text-primary";
      case "Fair":
        return "text-warning";
      case "Poor":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Device Inventory</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage and track all IT equipment
            </p>
          </div>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Device
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-soft border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device List */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-display">All Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Device Name</th>
                    <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Category</th>
                    <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Location</th>
                    <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Purchase Date</th>
                    <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Condition</th>
                    <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-4 text-sm font-medium text-foreground">{device.name}</td>
                      <td className="py-4 text-sm text-muted-foreground">{device.category}</td>
                      <td className="py-4">
                        <Badge className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">{device.location}</td>
                      <td className="py-4 text-sm text-muted-foreground">{device.purchaseDate}</td>
                      <td className="py-4">
                        <span className={`text-sm font-medium ${getConditionColor(device.condition)}`}>
                          {device.condition}
                        </span>
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
