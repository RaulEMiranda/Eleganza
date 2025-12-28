// components/account/OrderTracking.tsx
"use client";

import { Order, OrderStatus } from "@/types/order";
import { Check, Package, Truck, Home, X } from "lucide-react";

interface OrderTrackingProps {
  order: Order;
}

const trackingSteps = [
  { status: "pending", label: "Pedido Realizado", icon: Package },
  { status: "processing", label: "Procesando", icon: Package },
  { status: "shipped", label: "Enviado", icon: Truck },
  { status: "delivered", label: "Entregado", icon: Home },
];

const statusOrder: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

export default function OrderTracking({ order }: OrderTrackingProps) {
  const currentStatusIndex = statusOrder.indexOf(order.status);
  const isCancelled =
    order.status === "cancelled" || order.status === "refunded";

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 p-6">
        <div className="flex items-center gap-3 text-red-800">
          <X className="w-6 h-6" />
          <div>
            <p className="font-medium">
              Pedido{" "}
              {order.status === "cancelled" ? "Cancelado" : "Reembolsado"}
            </p>
            <p className="text-sm text-red-600">
              Este pedido ha sido{" "}
              {order.status === "cancelled" ? "cancelado" : "reembolsado"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="relative">
        {/* Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{
              width: `${
                (currentStatusIndex / (trackingSteps.length - 1)) * 100
              }%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {trackingSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;

            return (
              <div key={step.status} className="flex flex-col items-center">
                {/* Icon circle */}
                <div
                  className={`
                  relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all
                  ${
                    isCompleted
                      ? "bg-black text-white"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }
                  ${isCurrent ? "ring-4 ring-black/10" : ""}
                `}
                >
                  {isCompleted ? (
                    isCurrent ? (
                      <Icon className="w-5 h-5" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Label */}
                <p
                  className={`
                  mt-2 text-xs text-center max-w-20
                  ${isCompleted ? "font-medium text-black" : "text-gray-500"}
                `}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status details */}
      <div className="bg-gray-50 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estado actual:</span>
          <span className="font-medium capitalize">{order.status}</span>
        </div>

        {order.trackingNumber && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Número de seguimiento:</span>
            <span className="font-mono text-xs">{order.trackingNumber}</span>
          </div>
        )}

        {order.estimatedDelivery && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Entrega estimada:</span>
            <span className="font-medium">
              {new Date(order.estimatedDelivery).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        {order.deliveredAt && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Entregado el:</span>
            <span className="font-medium text-green-600">
              {new Date(order.deliveredAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
