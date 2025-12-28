// components/home/NewArrivals.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

// Mock data - nuevos productos
const newProducts: Product[] = [
  {
    id: "9",
    slug: "blusa-seda-rosa",
    name: "Blusa de Seda Rosa",
    description: "Blusa elegante de seda natural",
    longDescription: "Blusa rosa suave en seda 100% natural",
    category: "Mujer",
    categorySlug: "mujer",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1564257577310-9db47c3c51ae?w=800&h=1000&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1564257577310-9db47c3c51ae?w=800&h=1000&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Rosa", hex: "#EC4899", available: true }],
    inStock: true,
    stock: 14,
    sku: "BLS-009",
    featured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 42,
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
  },
  {
    id: "10",
    slug: "pantalon-chino-beige",
    name: "Pantalón Chino Beige",
    description: "Pantalón casual elegante",
    longDescription: "Pantalón chino beige de corte moderno",
    category: "Hombre",
    categorySlug: "hombre",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [{ name: "Beige", hex: "#D4C5B9", available: true }],
    inStock: true,
    stock: 22,
    sku: "PNT-010",
    featured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 38,
    createdAt: "2025-01-18",
    updatedAt: "2025-01-18",
  },
  {
    id: "11",
    slug: "gafas-sol-aviador",
    name: "Gafas de Sol Aviador",
    description: "Gafas clásicas estilo aviador",
    longDescription: "Gafas de sol con diseño aviador clásico",
    category: "Accesorios",
    categorySlug: "accesorios",
    price: 179.99,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=1000&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=1000&fit=crop",
    sizes: ["Único"],
    colors: [{ name: "Negro", hex: "#000000", available: true }],
    inStock: true,
    stock: 30,
    sku: "GFS-011",
    featured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 51,
    createdAt: "2025-01-17",
    updatedAt: "2025-01-17",
  },
  {
    id: "12",
    slug: "vestido-floral-verano",
    name: "Vestido Floral de Verano",
    description: "Vestido ligero con estampado floral",
    longDescription: "Vestido veraniego con hermoso estampado floral",
    category: "Mujer",
    categorySlug: "mujer",
    price: 229.99,
    images: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&h=1000&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&h=1000&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Multicolor", hex: "#EC4899", available: true }],
    inStock: true,
    stock: 16,
    sku: "VST-012",
    featured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 63,
    createdAt: "2025-01-16",
    updatedAt: "2025-01-16",
  },
  {
    id: "13",
    slug: "zapatillas-cuero-blancas",
    name: "Zapatillas de Cuero Blancas",
    description: "Zapatillas casuales de cuero",
    longDescription: "Zapatillas blancas en cuero premium",
    category: "Zapatos",
    categorySlug: "zapatos",
    price: 289.99,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop",
    sizes: ["38", "39", "40", "41", "42"],
    colors: [{ name: "Blanco", hex: "#FFFFFF", available: true }],
    inStock: true,
    stock: 19,
    sku: "ZPT-013",
    featured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 74,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
];

export default function NewArrivals() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container-elegant">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-2">
              Nuevos Productos
            </h2>
            <p className="text-gray-600">
              Las últimas incorporaciones a nuestra colección
            </p>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 border-2 border-gray-300 hover:border-black flex items-center justify-center transition-elegant"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 border-2 border-gray-300 hover:border-black flex items-center justify-center transition-elegant"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          {newProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/productos/nuevos"
            className="inline-block text-sm font-medium border-b-2 border-black pb-1 hover:text-gray-600 transition-elegant"
          >
            Ver Todos los Nuevos Productos
          </Link>
        </div>
      </div>
    </section>
  );
}
