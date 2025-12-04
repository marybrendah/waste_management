import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Disposal() {
  const requests = [
    { id: 1, device: "Dell Laptop XPS 13", requester: "John Doe", date: "2025-11-25", status: "Pending", priority: "High", reason: "Hardware failure" },
    { id: 2, device: "HP Printer LaserJet", requester: "Jane Smith", date: "2025-11-24", status: "Approved", priority: "Medium", reason: "Outdated model" },
    { id: 3, device: "Samsung Monitor 24\"", requester: "Mike Johnson", date: "2025-11-23", status: "Completed", priority: "Low", reason: "Screen damage" },
    { id: 4, device: "iPhone 12", requester: "Sarah Wilson", date: "2025-11-22", status: "Pending", priority: "High", reason: "Battery issues" },
    { id: 5, device: "Cisco Router", requester: "Tom Brown", date: "2025-11-21", status: "Rejected", priority: "Low", reason: "Can be repaired" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "Approved":
        return <CheckCircle className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Approved":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "Pending":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Rejected":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "Medium":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Disposal Requests</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage device disposal and recycling requests
            </p>
          </div>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            New Request
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-display font-bold text-warning">12</p>
              <p className="mt-1 text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-display font-bold text-primary">45</p>
              <p className="mt-1 text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-display font-bold text-success">89</p>
              <p className="mt-1 text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-soft border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-display font-bold text-destructive">5</p>
              <p className="mt-1 text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-display">All Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-4 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{request.device}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Requested by <span className="font-medium">{request.requester}</span> on {request.date}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground italic">
                          Reason: {request.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
