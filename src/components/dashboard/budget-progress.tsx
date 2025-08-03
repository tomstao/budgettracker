"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils/currency";

// Mock data - replace with actual API calls
const mockBudgets = [
  {
    id: "1",
    name: "Food & Dining",
    budget: 500,
    spent: 320,
    color: "hsl(var(--chart-1))",
  },
  {
    id: "2",
    name: "Transportation",
    budget: 200,
    spent: 145,
    color: "hsl(var(--chart-4))",
  },
  {
    id: "3",
    name: "Entertainment",
    budget: 150,
    spent: 89,
    color: "hsl(var(--chart-5))",
  },
  {
    id: "4",
    name: "Shopping",
    budget: 300,
    spent: 267,
    color: "hsl(var(--chart-6))"
  },
];

export function BudgetProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockBudgets.map((budget) => {
            const percentage = (budget.spent / budget.budget) * 100;
            const remaining = budget.budget - budget.spent;

            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: budget.color }}
                    />
                    <span className="font-medium text-sm">{budget.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(budget.spent)} /{" "}
                      {formatCurrency(budget.budget)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(remaining)} remaining
                    </p>
                  </div>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                  style={
                    {
                      "--progress-background": budget.color,
                    } as React.CSSProperties
                  }
                />
                <p className="text-xs text-muted-foreground">
                  {percentage.toFixed(1)}% used
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
