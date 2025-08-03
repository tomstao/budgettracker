import {
  Home,
  CreditCard,
  PiggyBank,
  Settings,
  FolderOpen,
  TrendingUp,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Categories", href: "/categories", icon: FolderOpen },
  { name: "Budgets", href: "/budgets", icon: PiggyBank },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
];