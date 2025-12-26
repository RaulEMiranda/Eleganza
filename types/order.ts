// types/order.ts

import { CartItem } from "./cart";
import { Address } from "./user";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod =
  | "credit-card"
  | "debit-card"
  | "paypal"
  | "bank-transfer";

export interface Order {
  id: string;
  orderNumber: string; // Ej: "ORD-2024-001234"
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;

  // Información de envío
  shippingAddress: Address;
  billingAddress: Address;

  // Estado y pago
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "completed" | "failed";

  // Seguimiento
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;

  // Notas
  customerNotes?: string;

  // Cupón usado
  couponCode?: string;
  couponDiscount?: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem extends CartItem {
  priceAtPurchase: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string; // "3-5 días"
  isAvailable: boolean;
}

export interface PaymentDetails {
  method: PaymentMethod;
  cardLastFour?: string;
  cardBrand?: string; // "Visa", "Mastercard"
}

export interface OrderTracking {
  orderId: string;
  status: OrderStatus;
  events: TrackingEvent[];
}

export interface TrackingEvent {
  status: OrderStatus;
  description: string;
  location?: string;
  timestamp: string;
}
