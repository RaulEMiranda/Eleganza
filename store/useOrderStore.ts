// store/useOrderStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrderStatus } from "@/types/order";
import { useCartStore } from "./useCartStore";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

interface OrderStore {
  orders: Order[];

  // Acciones
  createOrder: (orderData: Partial<Order>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByUserId: (userId: string) => Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
}

// Función para generar número de orden único
const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  return `ORD-${year}-${random}`;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      // Crear nuevo pedido
      createOrder: (orderData: Partial<Order>) => {
        const cartStore = useCartStore.getState();
        const authStore = useAuthStore.getState();

        if (!authStore.user) {
          throw new Error("Usuario no autenticado");
        }

        if (cartStore.items.length === 0) {
          throw new Error("El carrito está vacío");
        }

        const now = new Date().toISOString();
        const orderNumber = generateOrderNumber();

        // Calcular fechas estimadas
        const estimatedDeliveryDate = new Date();
        estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

        const newOrder: Order = {
          id: `order-${Date.now()}`,
          orderNumber,
          userId: authStore.user.id,
          items: cartStore.items,
          subtotal: cartStore.getSubtotal(),
          tax: 0, // Podrías calcular impuestos aquí
          shipping: cartStore.getSubtotal() >= 200 ? 0 : 15,
          discount: cartStore.coupon
            ? cartStore.coupon.type === "percentage"
              ? (cartStore.getSubtotal() * cartStore.coupon.value) / 100
              : cartStore.coupon.value
            : 0,
          total: cartStore.getTotal(),
          shippingAddress: orderData.shippingAddress!,
          billingAddress:
            orderData.billingAddress || orderData.shippingAddress!,
          status: "pending",
          paymentMethod: orderData.paymentMethod || "credit-card",
          paymentStatus: "pending",
          estimatedDelivery: estimatedDeliveryDate.toISOString(),
          customerNotes: orderData.customerNotes,
          couponCode: cartStore.coupon?.code,
          couponDiscount: cartStore.coupon
            ? cartStore.coupon.type === "percentage"
              ? (cartStore.getSubtotal() * cartStore.coupon.value) / 100
              : cartStore.coupon.value
            : undefined,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
        }));

        // Limpiar carrito después de crear el pedido
        cartStore.clearCart();

        toast.success(`Pedido ${orderNumber} creado exitosamente`);
        return newOrder;
      },

      // Obtener pedido por ID
      getOrderById: (orderId: string) => {
        return get().orders.find((order) => order.id === orderId);
      },

      // Obtener pedidos de un usuario
      getOrdersByUserId: (userId: string) => {
        return get()
          .orders.filter((order) => order.userId === userId)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      },

      // Actualizar estado del pedido
      updateOrderStatus: (orderId: string, status: OrderStatus) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id === orderId) {
              const updates: Partial<Order> = {
                status,
                updatedAt: new Date().toISOString(),
              };

              // Si se marca como entregado, agregar fecha
              if (status === "delivered") {
                updates.deliveredAt = new Date().toISOString();
                updates.paymentStatus = "completed";
              }

              // Si se marca como enviado, generar número de tracking
              if (status === "shipped" && !order.trackingNumber) {
                updates.trackingNumber = `TRK${Math.floor(
                  Math.random() * 9999999999
                )
                  .toString()
                  .padStart(10, "0")}`;
              }

              return { ...order, ...updates };
            }
            return order;
          }),
        }));

        toast.success("Estado del pedido actualizado");
      },

      // Cancelar pedido
      cancelOrder: (orderId: string) => {
        const order = get().getOrderById(orderId);

        if (!order) {
          toast.error("Pedido no encontrado");
          return;
        }

        if (order.status === "delivered") {
          toast.error("No se puede cancelar un pedido ya entregado");
          return;
        }

        if (order.status === "shipped") {
          toast.error(
            "No se puede cancelar un pedido ya enviado. Solicita una devolución."
          );
          return;
        }

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: "cancelled" as OrderStatus,
                  paymentStatus: "failed" as const,
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));

        toast.success("Pedido cancelado exitosamente");
      },
    }),
    {
      name: "eleganza-orders-storage",
    }
  )
);
