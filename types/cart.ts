// types/cart.ts

import { Product } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  price: number; // Precio al momento de agregar al carrito
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
}

export interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minPurchase?: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    size: string,
    color: string,
    quantity?: number
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  coupon?: Coupon;
}
