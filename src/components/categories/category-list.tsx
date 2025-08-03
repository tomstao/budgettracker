"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual API calls
const mockCategories = [
  {
    id: "1",
    name: "Food & Dining",
    color: "#ef4444",
    icon: "🍽️",
    type: "expense" as const,
    transactionCount: 15,
  },
  {
    id: "2",
    name: "Transportation",
    color: "#f59e0b",
    icon: "🚗",
    type: "expense" as const,
    transactionCount: 8,
  },
  {
    id: "3",
    name: "Entertainment",
    color: "#8b5cf6",
    icon: "🎬",
    type: "expense" as const,
    transactionCount: 6,
  },
  {
    id: "4",
    name: "Shopping",
    color: "#06b6d4",
    icon: "🛍️",
    type: "expense" as const,
    transactionCount: 12,
  },
  {
    id: "5",
    name: "Salary",
    color: "#22c55e",
    icon: "💰",
    type: "income" as const,
    transactionCount: 3,
  },
  {
    id: "6",
    name: "Freelance",
    color: "#3b82f6",
    icon: "💼",
    type: "income" as const,
    transactionCount: 5,
  },
];

export function CategoryList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockCategories.map((category) => (
        <Card key={category.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: category.color + "20" }}
                >
                  {category.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <Badge
                    variant={
                      category.type === "income" ? "default" : "secondary"
                    }
                  >
                    {category.type}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/categories/${category.id}/edit`}>
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
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {category.transactionCount} transactions
              </span>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add new category card */}
      <Card className="border-dashed border-2 border-border hover:border-border/80 transition-colors">
        <CardContent className="flex items-center justify-center h-32">
          <Link
            href="/categories/new"
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Add New Category</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
