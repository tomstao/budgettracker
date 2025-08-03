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

export interface CreateTransactionRequest {
  title: string;
  amount: number;
  type: "income" | "expense";
  categoryId: string;
  description?: string;
  date: string;
}

export interface UpdateTransactionRequest {
  id: string;
  title?: string;
  amount?: number;
  type?: "income" | "expense";
  categoryId?: string;
  description?: string;
  date?: string;
}

export interface TransactionFilters {
  type?: "income" | "expense";
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  netAmount: number;
  transactionCount: number;
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
