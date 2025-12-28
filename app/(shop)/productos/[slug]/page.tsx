// app/(shop)/producto/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";
import { getProductReviews, getAverageRating } from "@/data/reviews";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { PRODUCTS } from "@/data/products";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generar metadata básica para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Producto no encontrado - Eleganza",
    };
  }

  return {
    title: `${product.name} - Eleganza`,
    description: product.description,
  };
}

// Generar rutas estáticas para todos los productos
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // Buscar el producto
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Obtener reviews del producto
  const productReviews = getProductReviews(product.id);
  const averageRating = getAverageRating(product.id);

  // Obtener productos relacionados (misma categoría)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      reviews={productReviews}
      averageRating={averageRating}
      relatedProducts={relatedProducts}
    />
  );
}
