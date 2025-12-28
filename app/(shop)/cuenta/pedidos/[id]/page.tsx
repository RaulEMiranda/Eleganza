// app/(shop)/cuenta/pedidos/[id]/page.tsx
"use client";

import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import AccountLayout from "@/components/account/AccountLayout";
import OrderTracking from "@/components/account/OrderTracking";
import { useOrderStore } from "@/store/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ChevronLeft, Package, MapPin, CreditCard, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const { getOrderById, cancelOrder } = useOrderStore();

  const order = getOrderById(id);

  // Verificar si el pedido existe y pertenece al usuario
  if (!order || !user || order.userId !== user.id) {
    notFound();
  }

  const handleCancelOrder = () => {
    if (confirm("¿Estás seguro de que deseas cancelar este pedido?")) {
      cancelOrder(order.id);
    }
  };

  const canCancel = order.status === "pending" || order.status === "processing";

  return (
    <AccountLayout>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4 transition-elegant"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a mis pedidos
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-light mb-2">
                Pedido {order.orderNumber}
              </h2>
              <p className="text-gray-600">
                Realizado el{" "}
                {new Date(order.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {canCancel && (
              <button
                onClick={handleCancelOrder}
                className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 transition-elegant"
              >
                <X className="w-4 h-4" />
                Cancelar Pedido
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Estado del Pedido
              </h3>
              <OrderTracking order={order} />
            </div>

            {/* Items */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">
                Productos ({order.items.length})
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
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

                    <div className="flex-1">
                      <Link
                        href={`/producto/${item.product.slug}`}
                        className="font-medium hover:underline line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        {item.size && <span>Talla: {item.size}</span>}
                        {item.size && item.color && <span>•</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Cantidad: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resumen */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">Resumen</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>S/ {order.subtotal.toFixed(2)}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Descuento</span>
                    <span className="text-green-600">
                      -S/ {order.discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span>
                    {order.shipping === 0
                      ? "GRATIS"
                      : `S/ ${order.shipping.toFixed(2)}`}
                  </span>
                </div>

                {order.tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Impuestos</span>
                    <span>S/ {order.tax.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-medium">
                    S/ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {order.couponCode && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800">
                    Cupón aplicado: {order.couponCode}
                  </p>
                </div>
              )}
            </div>

            {/* Dirección de Envío */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Dirección de Envío
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                {order.shippingAddress.company && (
                  <p className="text-gray-600">
                    {order.shippingAddress.company}
                  </p>
                )}
                <p className="text-gray-600">
                  {order.shippingAddress.address1}
                </p>
                {order.shippingAddress.address2 && (
                  <p className="text-gray-600">
                    {order.shippingAddress.address2}
                  </p>
                )}
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
                <p className="text-gray-600">{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Método de Pago
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium capitalize">
                  {order.paymentMethod.replace("-", " ")}
                </p>
                <p className="text-gray-600">
                  Estado:{" "}
                  <span
                    className={
                      order.paymentStatus === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {order.paymentStatus === "completed"
                      ? "Pagado"
                      : "Pendiente"}
                  </span>
                </p>
              </div>
            </div>

            {/* Notas del Cliente */}
            {order.customerNotes && (
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Notas</h3>
                <p className="text-sm text-gray-600">{order.customerNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
