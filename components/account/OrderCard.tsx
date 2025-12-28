// components/account/OrderCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Order, OrderStatus } from "@/types/order";
import { Package, ChevronRight } from "lucide-react";

interface OrderCardProps {
  order: Order;
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pendiente",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link
      href={`/cuenta/pedidos/${order.id}`}
      className="block border border-gray-200 hover:border-black transition-elegant p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-medium mb-1">{order.orderNumber}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium ${
            statusColors[order.status]
          }`}
        >
          {statusLabels[order.status]}
        </span>
      </div>

      {/* Items preview */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {order.items.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="relative w-16 h-16 shrink-0 bg-gray-100"
          >
            <Image
              src={item.product.mainImage}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>
        ))}
        {order.items.length > 4 && (
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-xs text-gray-500 shrink-0">
            +{order.items.length - 4}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-lg font-medium">S/ {order.total.toFixed(2)}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
