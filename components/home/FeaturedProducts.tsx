// components/home/FeaturedProducts.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<"all" | "new" | "bestseller">(
    "all"
  );

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "new") return product.isNew;
    if (activeTab === "bestseller") return product.isBestSeller;
    return true;
  }).slice(0, 8);

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="container-elegant">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-4">
            Productos Destacados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Descubre nuestras piezas más populares y las últimas novedades
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 font-medium transition-elegant ${
                activeTab === "all"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:border-black"
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-2 font-medium transition-elegant ${
                activeTab === "new"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:border-black"
              }`}
            >
              Nuevos
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-6 py-2 font-medium transition-elegant ${
                activeTab === "bestseller"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:border-black"
              }`}
            >
              Más Vendidos
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/productos"
            className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}
