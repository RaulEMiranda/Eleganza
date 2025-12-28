// app/(shop)/cuenta/pedidos/page.tsx
"use client";

import { Metadata } from "next";
import AccountLayout from "@/components/account/AccountLayout";
import OrderCard from "@/components/account/OrderCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Package } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const { user } = useAuthStore();
  const { getOrdersByUserId } = useOrderStore();

  const orders = user ? getOrdersByUserId(user.id) : [];

  return (
    <AccountLayout>
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-light mb-2">Mis Pedidos</h2>
          <p className="text-gray-600">
            Revisa el historial y estado de tus compras
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-300">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No tienes pedidos aún</p>
            <Link
              href="/productos"
              className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-elegant"
            >
              Explorar Productos
            </Link>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
