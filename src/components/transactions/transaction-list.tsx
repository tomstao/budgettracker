"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual API calls
const mockTransactions = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 125.5,
    type: "expense" as const,
    category: { name: "Food & Dining", color: "hsl(var(--chart-1))" },
    date: "2024-01-15",
    description: "Weekly grocery shopping at Walmart",
  },
  {
    id: "2",
    title: "Salary",
    amount: 5000,
    type: "income" as const,
    category: { name: "Salary", color: "hsl(var(--chart-2))" },
    date: "2024-01-14",
    description: "Monthly salary payment",
  },
  {
    id: "3",
    title: "Gas Station",
    amount: 45.0,
    type: "expense" as const,
    category: { name: "Transportation", color: "hsl(var(--chart-4))" },
    date: "2024-01-13",
    description: "Fuel for car",
  },
  {
    id: "4",
    title: "Freelance Project",
    amount: 800,
    type: "income" as const,
    category: { name: "Freelance", color: "hsl(var(--chart-3))" },
    date: "2024-01-12",
    description: "Web development project payment",
  },
  {
    id: "5",
    title: "Restaurant",
    amount: 67.8,
    type: "expense" as const,
    category: { name: "Food & Dining", color: "hsl(var(--chart-1))" },
    date: "2024-01-11",
    description: "Dinner with friends",
  },
];

export function TransactionList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: transaction.category.color }}
                />
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category.name}
                  </p>
                  {transaction.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {transaction.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-chart-2"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <Badge
                  variant={
                    transaction.type === "income" ? "default" : "secondary"
                  }
                >
                  {transaction.type}
                </Badge>

                <div className="flex items-center space-x-2">
                  <Link href={`/transactions/${transaction.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/transactions/${transaction.id}/edit`}>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
