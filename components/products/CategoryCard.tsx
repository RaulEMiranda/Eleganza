// components/products/CategoryCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  variant?: "default" | "large" | "wide";
}

export default function CategoryCard({
  category,
  variant = "default",
}: CategoryCardProps) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className={cn(
        "group relative overflow-hidden bg-gray-100 transition-elegant hover:shadow-elegant-lg",
        variant === "large" && "row-span-2",
        variant === "wide" && "col-span-2"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          variant === "default" && "aspect-4/5",
          variant === "large" && "aspect-4/9",
          variant === "wide" && "aspect-21/9"
        )}
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-elegant group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-white text-3xl font-serif font-bold group-hover:underline decoration-2 underline-offset-4 transition-elegant">
                {category.name}
              </h3>
              <p className="text-white/90 text-sm line-clamp-2 max-w-md">
                {category.description}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-elegant">
              <span className="text-sm font-medium uppercase tracking-wide">
                Explorar
              </span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-elegant" />
      </div>
    </Link>
  );
}
