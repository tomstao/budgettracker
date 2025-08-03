export interface AnalyticsData {
  period: string;
  income: number;
  expense: number;
  netAmount: number;
}

export interface TrendData {
  date: string;
  income: number;
  expense: number;
  netAmount: number;
}

export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  amount: number;
  percentage: number;
  transactionCount: number;
}

export interface MonthlyComparison {
  month: string;
  currentYear: number;
  previousYear: number;
  difference: number;
  percentageChange: number;
}

export interface SpendingInsights {
  averageDailySpending: number;
  averageMonthlySpending: number;
  highestSpendingDay: string;
  highestSpendingAmount: number;
  mostUsedCategory: string;
  categoryUsageCount: number;
}

export interface ExportData {
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  analytics: {
    trends: TrendData[];
    breakdown: CategoryBreakdown[];
    insights: SpendingInsights;
  };
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  categoryId: string;
  category: Category;
  description?: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
