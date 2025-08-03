export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  categoryId: string;
  category: Category;
  period: "monthly" | "yearly";
  startDate: string;
  endDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBudgetRequest {
  name: string;
  amount: number;
  categoryId: string;
  period: "monthly" | "yearly";
  startDate: string;
  endDate: string;
}

export interface UpdateBudgetRequest {
  id: string;
  name?: string;
  amount?: number;
  categoryId?: string;
  period?: "monthly" | "yearly";
  startDate?: string;
  endDate?: string;
}

export interface BudgetProgress {
  budgetId: string;
  budgetName: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentageUsed: number;
  isOverBudget: boolean;
  categoryName: string;
  categoryColor: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: "income" | "expense";
  userId: string;
  createdAt: string;
  updatedAt: string;
}
