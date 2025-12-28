// app/checkout/confirmacion/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

function ConfirmacionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    const order = searchParams.get("order");
    if (!order) {
      router.push("/");
      return;
    }
    setOrderNumber(order);
  }, [searchParams, router]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 lg:py-16">
      <div className="container-elegant max-w-3xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-fadeIn">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold mb-3">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-lg text-gray-600">
            Tu pedido ha sido confirmado exitosamente
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-8 shadow-elegant mb-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-serif font-semibold">
                Número de Pedido
              </h2>
              <span className="text-2xl font-mono font-semibold text-blue-600">
                {orderNumber}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Hemos enviado la confirmación a{" "}
              <strong className="text-black">{user?.email}</strong>
            </p>
          </div>

          {/* What's Next */}
          <div className="space-y-6">
            <h3 className="font-serif font-semibold text-lg">
              ¿Qué sigue ahora?
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    1. Confirmación por correo
                  </h4>
                  <p className="text-sm text-gray-600">
                    Recibirás un correo con los detalles de tu pedido y el
                    número de seguimiento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    2. Preparación del pedido
                  </h4>
                  <p className="text-sm text-gray-600">
                    Empaquetaremos cuidadosamente tus productos en las próximas
                    24 horas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">3. Envío y entrega</h4>
                  <p className="text-sm text-gray-600">
                    Te notificaremos cuando tu pedido esté en camino. Tiempo
                    estimado: 3-5 días hábiles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Consejo:</strong> Puedes rastrear tu pedido en
                cualquier momento desde tu cuenta en la sección "Mis Pedidos".
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/cuenta/pedidos"
            className="flex items-center justify-center gap-2 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant"
          >
            Ver mis pedidos
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/productos"
            className="flex items-center justify-center gap-2 py-4 border border-gray-300 font-medium hover:bg-gray-50 transition-elegant"
          >
            Seguir comprando
          </Link>
        </div>

        {/* Customer Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Necesitas ayuda?{" "}
            <Link
              href="/contacto"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Contáctanos
            </Link>
          </p>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 text-center p-8 bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200">
          <p className="text-lg font-serif mb-2">
            Gracias por confiar en{" "}
            <span className="font-semibold">Eleganza</span>
          </p>
          <p className="text-sm text-gray-600">
            Esperamos que disfrutes tu compra. ¡Vuelve pronto!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Cargando confirmación...</p>
          </div>
        </div>
      }
    >
      <ConfirmacionContent />
    </Suspense>
  );
}
