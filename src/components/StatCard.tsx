import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("gradient-card shadow-soft hover:shadow-elevated transition-all duration-300 border-border/50", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-display font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "mt-2 text-sm font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-7 w-7 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
