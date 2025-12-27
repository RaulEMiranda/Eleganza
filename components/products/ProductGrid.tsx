// components/products/ProductGrid.tsx
"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { SkeletonProduct } from "../ui/Skeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({
  products,
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonProduct key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600">No se encontraron productos</p>
        <p className="text-sm text-gray-500 mt-2">
          Intenta ajustar los filtros o busca algo diferente
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
