// app/(shop)/categoria/[slug]/page.tsx
"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { ProductFilter } from "@/types";
import { useProducts } from "@/hooks/useProducts";
import { CATEGORIES } from "@/constants/categories";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import ProductSort from "@/components/products/ProductSort";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CategoryBanner from "@/components/category/CategoryBanner";
import Button from "@/components/ui/Button";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = CATEGORIES.find((c) => c.slug === slug);

  const [filter, setFilter] = useState<ProductFilter>({
    categories: [slug],
    sortBy: "price-asc",
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { products, total } = useProducts(filter);

  if (!category) {
    notFound();
  }

  const handleSortChange = (sortBy: string) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: sortBy as ProductFilter["sortBy"],
    }));
  };

  return (
    <div className="container-elegant py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Categorías", href: "/productos" },
          { label: category.name, href: `/categoria/${category.slug}` },
        ]}
      />

      {/* Banner de Categoría */}
      <div className="mt-6">
        <CategoryBanner category={category} />
      </div>

      {/* Filters & Results */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
          </Button>

          {/* Results Count */}
          <p className="text-sm text-gray-600">
            <span className="font-medium text-black">{total}</span> productos
          </p>
        </div>

        {/* Sort */}
        <div className="hidden sm:block">
          <ProductSort
            value={filter.sortBy || "relevant"}
            onChange={handleSortChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ProductFilters
              filter={filter}
              onChange={setFilter}
              showCategories={true}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="p-6">
              <ProductFilters
                filter={filter}
                onChange={setFilter}
                onClose={() => setShowMobileFilters(false)}
                showMobileClose
                showCategories={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
