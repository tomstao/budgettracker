import { TrendChart } from "@/components/analytics/trend-chart";
import { CategoryBreakdown } from "@/components/analytics/category-breakdown";
import { IncomeExpenseChart } from "@/components/analytics/income-expense-chart";
import { ExportButton } from "@/components/analytics/export-button";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">
            Gain insights into your spending patterns and financial trends.
          </p>
        </div>
        <ExportButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart />
        <CategoryBreakdown />
      </div>

      <IncomeExpenseChart />
    </div>
  );
}
