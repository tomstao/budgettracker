import { BudgetList } from "@/components/budgets/budget-list";
import { NewBudget } from "@/components/budgets/budget-new";

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
        <NewBudget />
      </div>

      <BudgetList />
    </div>
  );
}
