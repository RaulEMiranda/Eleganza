// components/products/ProductInfo.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import {
  Star,
  Heart,
  Share2,
  ChevronDown,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";

interface ProductInfoProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductInfo({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductInfoProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "description"
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error al compartir:", err);
      }
    } else {
      // Fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  const discount = product.discount || 0;

  return (
    <div className="space-y-6">
      {/* Categoría y breadcrumb */}
      <div className="text-sm text-neutral-600">
        <a href="/" className="hover:text-black">
          Inicio
        </a>
        <span className="mx-2">/</span>
        <a
          href={`/categoria/${product.categorySlug}`}
          className="hover:text-black capitalize"
        >
          {product.category}
        </a>
      </div>

      {/* Título */}
      <div>
        <h1 className="text-3xl md:text-4xl font-light mb-2">{product.name}</h1>

        {/* Rating y reviews */}
        {product.rating && (
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? "fill-black text-black"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-neutral-600">
              {product.rating.toFixed(1)} ({product.reviewCount || 0} opiniones)
            </span>
          </div>
        )}
      </div>

      {/* Precio */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-light">
          S/ {product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-neutral-400 line-through">
              S/ {product.originalPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="bg-red-600 text-white px-2 py-1 text-sm font-medium">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Stock */}
      <div>
        {product.inStock && product.stock > 0 ? (
          <p className="text-sm text-green-700">
            ✓ En stock ({product.stock} disponibles)
          </p>
        ) : (
          <p className="text-sm text-red-600">Agotado</p>
        )}
      </div>

      {/* Descripción corta */}
      <p className="text-neutral-700 leading-relaxed">{product.description}</p>

      {/* Acciones rápidas */}
      <div className="flex gap-2 pt-4 border-t">
        <button
          onClick={onToggleFavorite}
          className={`
            flex items-center gap-2 px-4 py-2 transition-all
            ${
              isFavorite
                ? "bg-black text-white"
                : "bg-white border border-neutral-300 hover:border-black"
            }
          `}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          <span className="text-sm font-medium">
            {isFavorite ? "En favoritos" : "Guardar"}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 hover:border-black transition-all"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">Compartir</span>
        </button>
      </div>

      {/* Beneficios */}
      <div className="grid grid-cols-1 gap-3 pt-6 border-t">
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium">
              Envío gratis en compras mayores a S/ 150
            </p>
            <p className="text-neutral-600">Recibe en 2-5 días hábiles</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium">Devoluciones gratis hasta 30 días</p>
            <p className="text-neutral-600">Sin preguntas</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium">Compra protegida</p>
            <p className="text-neutral-600">Garantía de calidad</p>
          </div>
        </div>
      </div>

      {/* Secciones expandibles */}
      <div className="space-y-2 pt-6 border-t">
        {/* Descripción detallada */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("description")}
            className="w-full flex items-center justify-between py-4 text-left hover:bg-neutral-50 transition-colors px-2"
          >
            <span className="font-medium">Descripción</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedSection === "description" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "description" && (
            <div className="pb-4 px-2 text-sm text-neutral-700 leading-relaxed">
              <p>{product.longDescription || product.description}</p>
            </div>
          )}
        </div>

        {/* Detalles del producto */}
        {product.material && (
          <div className="border-b">
            <button
              onClick={() => toggleSection("details")}
              className="w-full flex items-center justify-between py-4 text-left hover:bg-neutral-50 transition-colors px-2"
            >
              <span className="font-medium">Detalles del producto</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSection === "details" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSection === "details" && (
              <div className="pb-4 px-2 text-sm">
                <dl className="space-y-2">
                  {product.material && (
                    <div className="flex">
                      <dt className="font-medium w-32">Material:</dt>
                      <dd className="text-neutral-700">{product.material}</dd>
                    </div>
                  )}
                  {product.brand && (
                    <div className="flex">
                      <dt className="font-medium w-32">Marca:</dt>
                      <dd className="text-neutral-700">{product.brand}</dd>
                    </div>
                  )}
                  {product.sku && (
                    <div className="flex">
                      <dt className="font-medium w-32">SKU:</dt>
                      <dd className="text-neutral-700">{product.sku}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        )}

        {/* Cuidados */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("care")}
            className="w-full flex items-center justify-between py-4 text-left hover:bg-neutral-50 transition-colors px-2"
          >
            <span className="font-medium">Cuidados y mantenimiento</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedSection === "care" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "care" && (
            <div className="pb-4 px-2 text-sm text-neutral-700 space-y-2">
              <p>• Lavar a mano con agua fría</p>
              <p>• No usar blanqueador</p>
              <p>• Secar a la sombra</p>
              <p>• Planchar a baja temperatura si es necesario</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
