import { TransactionList } from "@/components/transactions/transaction-list";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and track your income and expenses.
          </p>
        </div>
        <Link href="/transactions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </Link>
      </div>

      <TransactionFilters />
      <TransactionList />
    </div>
  );
}
