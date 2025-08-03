import { BudgetList } from "@/components/budgets/budget-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
          <p className="text-muted-foreground">
            Set and track your spending limits by category.
          </p>
        </div>
        <Link href="/budgets/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Budget
          </Button>
        </Link>
      </div>

      <BudgetList />
    </div>
  );
}
