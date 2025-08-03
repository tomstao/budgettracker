"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data - replace with actual API calls
const mockData = [
  { month: "Jan", income: 5000, expense: 3200 },
  { month: "Feb", income: 4800, expense: 2800 },
  { month: "Mar", income: 5200, expense: 3500 },
  { month: "Apr", income: 4500, expense: 3100 },
  { month: "May", income: 5800, expense: 2900 },
  { month: "Jun", income: 5100, expense: 3300 },
];

export function IncomeExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
              />
              <Bar dataKey="income" fill="hsl(var(--chart-2))" name="Income" />
              <Bar dataKey="expense" fill="hsl(var(--chart-1))" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
