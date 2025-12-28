// components/category/CategoryBanner.tsx
import Image from "next/image";
import { Category } from "@/types";

interface CategoryBannerProps {
  category: Category;
}

export default function CategoryBanner({ category }: CategoryBannerProps) {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden mb-8">
      {/* Imagen de fondo */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
      />

      {/* Overlay oscuro para mejorar legibilidad del texto */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

      {/* Contenido del banner */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-2 md:mb-3">
            {category.name}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
}
