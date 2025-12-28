// app/(shop)/productos/page.tsx
import Link from "next/link";
import { MAIN_CATEGORIES } from "@/constants/categories";
import CategoryCard from "@/components/products/CategoryCard";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function ProductsPage() {
  return (
    <div className="container-elegant py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Categorías", href: "/productos" }]} />

      {/* Header */}
      <div className="mt-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-3">
          Explora por Categoría
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl">
          Descubre nuestra colección de moda elegante y sofisticada organizada
          por categorías
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
        {MAIN_CATEGORIES.map((category, index) => {
          let variant: "default" | "large" | "wide" = "default";

          if (index === 0) variant = "large";
          if (index === 3) variant = "wide";
          if (index === 5) variant = "large";

          return (
            <CategoryCard
              key={category.id}
              category={category}
              variant={variant}
            />
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-12 md:mt-16 text-center border-t border-gray-200 pt-12 md:pt-16">
        <h2 className="text-2xl md:text-3xl font-serif mb-4">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="text-gray-600 mb-6 px-4">
          Contáctanos y te ayudaremos a encontrar el producto perfecto
        </p>

        <Link
          href="/contacto"
          className="inline-block px-6 md:px-8 py-3 md:py-4 bg-black text-white hover:bg-gray-900 transition-elegant"
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}
