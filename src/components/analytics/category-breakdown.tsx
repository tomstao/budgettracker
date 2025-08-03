"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";

// Mock data - replace with actual API calls
const mockData = [
  { name: "Food & Dining", amount: 1250, percentage: 35, color: "hsl(var(--chart-1))" },
  { name: "Transportation", amount: 800, percentage: 22, color: "hsl(var(--chart-2))" },
  { name: "Entertainment", amount: 600, percentage: 17, color: "hsl(var(--chart-3))" },
  { name: "Shopping", amount: 450, percentage: 13, color: "hsl(var(--chart-4))" },
  { name: "Utilities", amount: 300, percentage: 8, color: "hsl(var(--chart-5))" },
  { name: "Other", amount: 150, percentage: 5, color: "hsl(var(--muted-foreground))" },
];

export function CategoryBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockData.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <p className="font-medium text-sm">{category.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.percentage}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">
                  {formatCurrency(category.amount)}
                </p>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: category.color,
                      width: `${category.percentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
