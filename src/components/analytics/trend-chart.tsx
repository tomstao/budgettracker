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
  { month: "Jan", income: 5000, expense: 3200, net: 1800 },
  { month: "Feb", income: 4800, expense: 2800, net: 2000 },
  { month: "Mar", income: 5200, expense: 3500, net: 1700 },
  { month: "Apr", income: 4500, expense: 3100, net: 1400 },
  { month: "May", income: 5800, expense: 2900, net: 2900 },
  { month: "Jun", income: 5100, expense: 3300, net: 1800 },
];

export function TrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
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
              <Line
                type="monotone"
                dataKey="net"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                name="Net"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
