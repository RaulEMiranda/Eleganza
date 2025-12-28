// app/(shop)/producto/[slug]/ProductDetailClient.tsx
"use client";

import { useState } from "react";
import { Product, ProductReview } from "@/types/product";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductVariantSelector from "@/components/products/ProductVariantSelector";
import ProductPurchaseActions from "@/components/products/ProductPurchaseActions";
import ProductReviews from "@/components/products/ProductReviews";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailClientProps {
  product: Product;
  reviews: ProductReview[];
  averageRating: number;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  reviews,
  averageRating,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí podrías integrar con un store de favoritos
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Detalle del producto */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Galería de imágenes */}
          <div>
            <ProductImageGallery
              images={product.images}
              mainImage={product.mainImage}
              productName={product.name}
            />
          </div>

          {/* Información y compra */}
          <div className="space-y-8">
            <ProductInfo
              product={product}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />

            <ProductVariantSelector
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
            />

            <ProductPurchaseActions
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />
          </div>
        </div>

        {/* Tabs: Descripción y Reseñas */}
        <div className="border-t pt-12">
          {/* Tab headers */}
          <div className="flex gap-8 mb-8 border-b">
            <button
              onClick={() => setActiveTab("info")}
              className={`
                pb-4 px-2 font-medium transition-colors relative
                ${
                  activeTab === "info"
                    ? "text-black"
                    : "text-neutral-400 hover:text-neutral-600"
                }
              `}
            >
              Información del producto
              {activeTab === "info" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`
                pb-4 px-2 font-medium transition-colors relative
                ${
                  activeTab === "reviews"
                    ? "text-black"
                    : "text-neutral-400 hover:text-neutral-600"
                }
              `}
            >
              Opiniones ({reviews.length})
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          </div>

          {/* Tab content */}
          <div className="max-w-4xl">
            {activeTab === "info" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Descripción</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {product.longDescription || product.description}
                  </p>
                </div>

                {product.material && (
                  <div>
                    <h3 className="text-xl font-medium mb-4">
                      Especificaciones
                    </h3>
                    <dl className="space-y-3">
                      {product.material && (
                        <div className="flex border-b pb-3">
                          <dt className="font-medium w-48">Material:</dt>
                          <dd className="text-neutral-700">
                            {product.material}
                          </dd>
                        </div>
                      )}
                      {product.brand && (
                        <div className="flex border-b pb-3">
                          <dt className="font-medium w-48">Marca:</dt>
                          <dd className="text-neutral-700">{product.brand}</dd>
                        </div>
                      )}
                      {product.sku && (
                        <div className="flex border-b pb-3">
                          <dt className="font-medium w-48">SKU:</dt>
                          <dd className="text-neutral-700">{product.sku}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <ProductReviews
                reviews={reviews}
                averageRating={averageRating}
                totalReviews={reviews.length}
              />
            )}
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="bg-neutral-50 border-t">
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
