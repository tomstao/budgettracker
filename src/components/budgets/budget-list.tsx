"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual API calls
const mockBudgets = [
  {
    id: "1",
    name: "Food & Dining Budget",
    amount: 500,
    spent: 320,
    category: { name: "Food & Dining", color: "#ef4444" },
    period: "monthly" as const,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: "2",
    name: "Transportation Budget",
    amount: 200,
    spent: 145,
    category: { name: "Transportation", color: "#f59e0b" },
    period: "monthly" as const,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: "3",
    name: "Entertainment Budget",
    amount: 150,
    spent: 89,
    category: { name: "Entertainment", color: "#8b5cf6" },
    period: "monthly" as const,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: "4",
    name: "Shopping Budget",
    amount: 300,
    spent: 267,
    category: { name: "Shopping", color: "#06b6d4" },
    period: "monthly" as const,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
];

export function BudgetList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockBudgets.map((budget) => {
        const percentage = (budget.spent / budget.amount) * 100;
        const remaining = budget.amount - budget.spent;
        const isOverBudget = budget.spent > budget.amount;

        return (
          <Card key={budget.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{budget.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {budget.category.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      budget.period === "monthly" ? "default" : "secondary"
                    }
                  >
                    {budget.period}
                  </Badge>
                  <Link href={`/budgets/${budget.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: budget.category.color }}
                />
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(budget.spent)} /{" "}
                    {formatCurrency(budget.amount)}
                  </p>
                  <p
                    className={`text-xs ${
                      isOverBudget ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {isOverBudget
                      ? "Over budget"
                      : `${formatCurrency(remaining)} remaining`}
                  </p>
                </div>
              </div>

              <Progress
                value={Math.min(percentage, 100)}
                className="h-2"
                style={
                  {
                    "--progress-background": isOverBudget
                      ? "#ef4444"
                      : budget.category.color,
                  } as React.CSSProperties
                }
              />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(1)}% used</span>
                <span>
                  {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Add new budget card */}
      <Card className="border-dashed border-2 border-border hover:border-border/80 transition-colors">
        <CardContent className="flex items-center justify-center h-48">
          <Link
            href="/budgets/new"
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Add New Budget</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
