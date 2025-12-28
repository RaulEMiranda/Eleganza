// app/(shop)/cuenta/pedidos/[id]/not-found.tsx

import Link from "next/link";
import { Package } from "lucide-react";

export default function OrderNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <h1 className="text-3xl font-light">Pedido no encontrado</h1>
          <p className="text-gray-600">
            El pedido que buscas no existe o no tienes acceso a él.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            href="/cuenta/pedidos"
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-elegant"
          >
            Ver Mis Pedidos
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-white border border-gray-300 hover:border-black transition-elegant"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
