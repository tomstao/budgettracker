"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/config";
import { getAuthHeaders, mockLogin, addCacheBuster } from "@/lib/auth";

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: { 
    name: string; 
    color: string;
    id: string;
  };
  period: "monthly" | "yearly";
  startDate: string;
  endDate: string;
}

export function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteBudget, setDeleteBudget] = useState<Budget | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const url = addCacheBuster(`${API_BASE_URL}/budgets`);
      const response = await fetch(url, {
        headers: getAuthHeaders()
      });
      if (response.status === 401) {
        await mockLogin();
        const retryUrl = addCacheBuster(`${API_BASE_URL}/budgets`);
        const retryResponse = await fetch(retryUrl, {
          headers: getAuthHeaders()
        });
        if (retryResponse.ok) {
          const data = await retryResponse.json();
          setBudgets(data);
        }
        setIsLoading(false);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setBudgets(data);
      }
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
      toast.error("Failed to load budgets");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteBudget) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/budgets/${deleteBudget.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to delete budget");
      }

      toast.success(`Budget "${deleteBudget.name}" deleted successfully`);
      setBudgets(budgets.filter(budget => budget.id !== deleteBudget.id));
      setDeleteBudget(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete budget");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
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
                    onClick={() => setDeleteBudget(budget)}
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
                      ? "hsl(var(--destructive))"
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

      </div>

      <AlertDialog open={!!deleteBudget} onOpenChange={() => setDeleteBudget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the budget "{deleteBudget?.name}" and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
