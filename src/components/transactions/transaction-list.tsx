"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/config";
import { getAuthHeaders, mockLogin, addCacheBuster } from "@/lib/auth";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: { 
    name: string; 
    color: string;
    id: string;
  };
  date: string;
  description?: string;
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTransaction, setDeleteTransaction] = useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log('🏁 TransactionList component mounted');
    fetchTransactions();
  }, []);

  useEffect(() => {
    console.log('📋 Transactions state updated:', transactions.length, 'items');
  }, [transactions]);

  const fetchTransactions = async () => {
    console.log('🔄 Fetching transactions...');
    try {
      const url = addCacheBuster(`${API_BASE_URL}/transactions`);
      const response = await fetch(url, {
        headers: getAuthHeaders()
      });
      console.log('📊 Transactions response status:', response.status);
      
      if (response.status === 401) {
        await mockLogin();
        const retryUrl = addCacheBuster(`${API_BASE_URL}/transactions`);
        const retryResponse = await fetch(retryUrl, {
          headers: getAuthHeaders()
        });
        if (retryResponse.ok) {
          const data = await retryResponse.json();
          console.log('✅ Transactions data received after login:', data.length, 'items');
          setTransactions(data);
        }
        setIsLoading(false);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Transactions data received:', data.length, 'items');
        setTransactions(data);
      }
    } catch (error) {
      console.error("❌ Failed to fetch transactions:", error);
      toast.error("Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTransaction) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${deleteTransaction.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      toast.success(`Transaction "${deleteTransaction.title}" deleted successfully`);
      setTransactions(transactions.filter(tx => tx.id !== deleteTransaction.id));
      setDeleteTransaction(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete transaction");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
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
                    onClick={() => setDeleteTransaction(transaction)}
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

      <AlertDialog open={!!deleteTransaction} onOpenChange={() => setDeleteTransaction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the transaction "{deleteTransaction?.title}" and all associated data.
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
