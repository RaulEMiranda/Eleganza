// components/checkout/OrderSummary.tsx
"use client";

import { CartItem } from "@/types/cart";
import { ShippingMethod } from "@/types/order";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

interface OrderSummaryProps {
  items: CartItem[];
  shippingMethod: ShippingMethod;
}

export default function OrderSummary({
  items,
  shippingMethod,
}: OrderSummaryProps) {
  const { getSubtotal, coupon } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = shippingMethod.price;
  const discount = coupon
    ? coupon.type === "percentage"
      ? (subtotal * coupon.value) / 100
      : coupon.value
    : 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="bg-white p-6 shadow-elegant">
      <h2 className="text-xl font-serif font-semibold mb-6">
        Resumen del Pedido
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-20 h-20 bg-gray-100 shrink-0">
              <Image
                src={item.product.mainImage}
                alt={item.product.name}
                fill
                className="object-cover"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2">
                {item.product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Talla: {item.size} | Color: {item.color}
              </p>
              <p className="text-sm font-medium mt-1">
                S/ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">
              Descuento{coupon && ` (${coupon.code})`}
            </span>
            <span className="font-medium text-green-600">
              -S/ {discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">GRATIS</span>
            ) : (
              `S/ ${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {shipping === 0 && subtotal >= 200 && (
          <div className="bg-green-50 border border-green-200 p-3">
            <p className="text-xs text-green-700">
              🎉 ¡Felicidades! Tienes envío gratis
            </p>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-semibold">S/ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Pago 100% seguro</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <span>Aceptamos todas las tarjetas</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Cambios y devoluciones gratis</span>
        </div>
      </div>
    </div>
  );
}
