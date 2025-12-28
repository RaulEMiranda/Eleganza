// components/cart/CartItem.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/store/useCartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    // Verificar stock disponible
    if (item.quantity < item.product.stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Imagen */}
      <Link
        href={`/producto/${item.product.slug}`}
        className="relative w-20 h-20 shrink-0 bg-gray-100"
      >
        <Image
          src={item.product.mainImage}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Información */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/producto/${item.product.slug}`}
              className="font-medium text-sm hover:text-gray-600 transition-elegant line-clamp-2"
            >
              {item.product.name}
            </Link>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              {item.size && <span>Talla: {item.size}</span>}
              {item.size && item.color && <span>•</span>}
              {item.color && <span>Color: {item.color}</span>}
            </div>
          </div>

          {/* Botón eliminar */}
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-gray-100 transition-elegant shrink-0"
            aria-label="Eliminar producto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Precio y cantidad */}
        <div className="flex items-center justify-between">
          {/* Cantidad */}
          <div className="flex items-center border border-gray-300">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="p-1.5 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-elegant"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 text-sm font-medium min-w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={item.quantity >= item.product.stock}
              className="p-1.5 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-elegant"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Precio */}
          <div className="text-right">
            <p className="font-medium text-sm">
              S/ {(item.price * item.quantity).toFixed(2)}
            </p>
            {item.product.originalPrice && item.product.discount && (
              <p className="text-xs text-gray-500 line-through">
                S/ {(item.product.originalPrice * item.quantity).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Advertencia de stock bajo */}
        {item.product.stock <= 5 && item.product.stock > 0 && (
          <p className="text-xs text-amber-600 mt-2">
            ¡Solo quedan {item.product.stock} unidades!
          </p>
        )}
      </div>
    </div>
  );
}
