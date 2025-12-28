// components/cart/CartDrawer.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import toast from "react-hot-toast";
import CartItem from "./CartItem";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    getSubtotal,
    getTotal,
    getItemCount,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Bloquear scroll cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Ingresa un código de cupón");
      return;
    }

    try {
      applyCoupon(couponCode);
      toast.success("¡Cupón aplicado exitosamente!");
      setCouponCode("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cupón inválido");
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.success("Cupón removido");
  };

  const handleClearCart = () => {
    if (confirm("¿Estás seguro de vaciar el carrito?")) {
      clearCart();
      toast.success("Carrito vaciado");
    }
  };

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal >= 200 ? 0 : 15;
  const discount = coupon
    ? coupon.type === "percentage"
      ? (subtotal * coupon.value) / 100
      : coupon.value
    : 0;

  if (!isMounted || !isOpen) return null;

  const drawerContent = (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel - desde la DERECHA */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white animate-slideLeft flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-serif font-semibold">
              Carrito ({getItemCount()})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-elegant"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            // Carrito vacío
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-6">
                Agrega productos para comenzar tu compra
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-elegant"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Botón vaciar carrito */}
              {items.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-elegant"
                >
                  <Trash2 className="w-4 h-4" />
                  Vaciar carrito
                </button>
              )}

              {/* Cupón */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Cupón de descuento
                </h3>
                {coupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        {coupon.code}
                      </p>
                      <p className="text-xs text-green-600">
                        {coupon.type === "percentage"
                          ? `${coupon.value}% de descuento`
                          : `S/ ${coupon.value.toFixed(2)} de descuento`}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Remover cupón"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleApplyCoupon()
                      }
                      placeholder="Código de cupón"
                      className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-elegant text-sm font-medium"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Cupones disponibles: BIENVENIDO10, ENVIOGRATIS, VERANO20
                </p>
              </div>

              {/* Resumen */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">Descuento</span>
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

                {subtotal < 200 && subtotal > 0 && (
                  <p className="text-xs text-gray-500">
                    Agrega S/ {(200 - subtotal).toFixed(2)} más para envío
                    gratis
                  </p>
                )}

                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-semibold">
                    S/ {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Botones de acción */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-3">
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-4 bg-black text-white text-center font-medium hover:bg-gray-800 transition-elegant"
            >
              Proceder al Pago
            </Link>
            <button
              onClick={onClose}
              className="block w-full py-3 border border-gray-300 text-center font-medium hover:bg-gray-50 transition-elegant"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
