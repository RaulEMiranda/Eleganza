// components/products/RelatedProducts.tsx
"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = "También te puede interesar",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light mb-8 text-center">
          {title}
        </h2>

        {/* Grid responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
