"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data - replace with actual API calls
const mockData = [
  { name: "Jan", income: 5000, expense: 3200 },
  { name: "Feb", income: 4800, expense: 2800 },
  { name: "Mar", income: 5200, expense: 3500 },
  { name: "Apr", income: 4500, expense: 3100 },
  { name: "May", income: 5800, expense: 2900 },
  { name: "Jun", income: 5100, expense: 3300 },
];

export function ExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
                labelFormatter={(label) => `${label} 2024`}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
