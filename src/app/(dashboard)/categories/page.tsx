import { CategoryList } from "@/components/categories/category-list";
import { NewCategory } from "@/components/categories/category-new";
import { ApiTest } from "@/components/debug/api-test";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">
            Organize your transactions with custom categories.
          </p>
        </div>
        <NewCategory />
      </div>

      <ApiTest />
      <CategoryList />
    </div>
  );
}
