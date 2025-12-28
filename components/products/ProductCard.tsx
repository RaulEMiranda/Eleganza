// components/products/ProductCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    isInWishlist,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
  } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Verificar si el producto tiene variantes (tallas o colores)
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasColors = product.colors && product.colors.length > 0;

    if (hasSizes || hasColors) {
      // Si tiene variantes, redirigir al detalle del producto
      toast("Por favor selecciona talla y color en la página del producto", {
        icon: "👉",
      });
      // El usuario puede hacer click en el link normalmente
      return;
    }

    // Si no tiene variantes, agregar directamente al carrito
    try {
      addToCart(
        product,
        "", // Sin talla
        "", // Sin color
        1 // Cantidad 1
      );
      toast.success(`${product.name} agregado al carrito`);
    } catch (error) {
      toast.error("Error al agregar al carrito");
    }
  };

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="space-y-3">
        {/* Image Container */}
        <div className="relative aspect-product bg-gray-100 overflow-hidden">
          <Image
            src={product.images[currentImageIndex] || product.mainImage}
            alt={product.name}
            fill
            className="object-cover transition-elegant group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="default" size="sm">
                Nuevo
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="danger" size="sm">
                -{discount}%
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="outline" size="sm" className="bg-white">
                Best Seller
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "absolute top-3 right-3 p-2 bg-white transition-elegant opacity-0 group-hover:opacity-100",
              inWishlist && "opacity-100"
            )}
            aria-label={
              inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"
            }
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-elegant",
                inWishlist ? "fill-red-600 text-red-600" : "text-black"
              )}
            />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-elegant">
            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className={cn(
                "w-full py-3 transition-elegant flex items-center justify-center gap-2",
                product.inStock
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm font-medium">
                {product.inStock ? "Agregar al Carrito" : "Agotado"}
              </span>
            </button>
          </div>

          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-elegant">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={cn(
                    "w-1.5 h-1.5 transition-elegant",
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  )}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-lg font-medium">Agotado</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:underline transition-elegant">
            {product.name}
          </h3>

          <p className="text-xs text-gray-600">{product.category}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="flex gap-1 pt-1">
              {product.colors.slice(0, 5).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-black"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({product.reviewCount})</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
