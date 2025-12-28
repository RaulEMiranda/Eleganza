// store/useCartStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";
import { CartItem, Coupon, CartState } from "@/types/cart";

// Cupones disponibles (mock data)
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "BIENVENIDO10",
    type: "percentage",
    value: 10,
    minPurchase: 100,
    isActive: true,
  },
  {
    code: "ENVIOGRATIS",
    type: "fixed",
    value: 15,
    minPurchase: 150,
    isActive: true,
  },
  {
    code: "VERANO20",
    type: "percentage",
    value: 20,
    minPurchase: 200,
    expiresAt: "2025-03-31T23:59:59Z",
    isActive: true,
  },
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: undefined,

      addItem: (
        product: Product,
        size: string,
        color: string,
        quantity = 1
      ) => {
        const items = get().items;

        // Generar ID único basado en producto + variantes
        const itemId = `${product.id}-${size}-${color}`;

        // Verificar si ya existe el item con las mismas variantes
        const existingItem = items.find((item) => item.id === itemId);

        if (existingItem) {
          // Si existe, incrementar cantidad
          set({
            items: items.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Si no existe, agregar nuevo item
          const newItem: CartItem = {
            id: itemId,
            product,
            quantity,
            size,
            color,
            price: product.price, // Precio al momento de agregar
          };
          set({
            items: [...items, newItem],
          });
        }
      },

      removeItem: (id: string) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [], coupon: undefined });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().coupon;
        let discount = 0;

        if (coupon) {
          if (coupon.type === "percentage") {
            discount = (subtotal * coupon.value) / 100;
          } else {
            discount = coupon.value;
          }
        }

        // Envío gratis si el subtotal es mayor a 200
        const shipping = subtotal >= 200 ? 0 : 15;

        return Math.max(0, subtotal - discount + shipping);
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      applyCoupon: (code: string) => {
        const subtotal = get().getSubtotal();
        const coupon = AVAILABLE_COUPONS.find(
          (c) => c.code.toLowerCase() === code.toLowerCase() && c.isActive
        );

        if (!coupon) {
          throw new Error("Cupón inválido o expirado");
        }

        if (coupon.minPurchase && subtotal < coupon.minPurchase) {
          throw new Error(
            `Compra mínima de S/ ${coupon.minPurchase.toFixed(2)} requerida`
          );
        }

        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          throw new Error("Cupón expirado");
        }

        set({ coupon });
      },

      removeCoupon: () => {
        set({ coupon: undefined });
      },
    }),
    {
      name: "eleganza-cart-storage",
    }
  )
);
