"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/config";
import { getAuthHeaders, mockLogin, addCacheBuster } from "@/lib/auth";

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: "income" | "expense";
  transactionCount?: number;
}

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log('🏁 CategoryList component mounted, starting fetch...');
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log('📋 Categories state updated:', categories.length, 'items');
  }, [categories]);

  const fetchCategories = async () => {
    console.log('🔄 Fetching categories...');
    try {
      const url = addCacheBuster(`${API_BASE_URL}/categories`);
      console.log('📡 Categories URL:', url);
      const response = await fetch(url, {
        headers: getAuthHeaders()
      });
      console.log('📊 Categories response status:', response.status);
      
      if (response.status === 401) {
        console.log('🔐 Authentication required, attempting login...');
        await mockLogin();
        const retryUrl = addCacheBuster(`${API_BASE_URL}/categories`);
        const retryResponse = await fetch(retryUrl, {
          headers: getAuthHeaders()
        });
        if (retryResponse.ok) {
          const data = await retryResponse.json();
          console.log('✅ Categories data received after login:', data.length, 'items');
          setCategories(data);
        }
        setIsLoading(false);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Categories data received:', data.length, 'items');
        console.log('📋 First category:', data[0]);
        setCategories(data);
      } else {
        console.error('❌ Categories fetch failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error("❌ Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${deleteCategory.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      toast.success(`Category "${deleteCategory.name}" deleted successfully`);
      setCategories(categories.filter(cat => cat.id !== deleteCategory.id));
      setDeleteCategory(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    console.log('⏳ CategoryList showing loading state...');
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  console.log('🎨 CategoryList rendering with:', categories.length, 'categories, isLoading:', isLoading);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
        <Card key={category.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: category.color + "20" }}
                >
                  {category.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <Badge
                    variant={
                      category.type === "income" ? "default" : "secondary"
                    }
                  >
                    {category.type}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/categories/${category.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/80"
                  onClick={() => setDeleteCategory(category)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {category.transactionCount || 0} transactions
              </span>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      </div>

      <AlertDialog open={!!deleteCategory} onOpenChange={() => setDeleteCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category "{deleteCategory?.name}" and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
