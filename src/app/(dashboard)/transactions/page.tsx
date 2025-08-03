import { TransactionList } from "@/components/transactions/transaction-list";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import {NewTransaction} from "@/components/transactions/transaction-new";

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
            <NewTransaction/>
      </div>

      <TransactionFilters />
      <TransactionList />
    </div>
  );
}
