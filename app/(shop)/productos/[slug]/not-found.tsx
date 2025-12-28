// app/(shop)/producto/[slug]/not-found.tsx

import Link from "next/link";
import { Search } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icono */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-neutral-100 flex items-center justify-center">
            <Search className="w-12 h-12 text-neutral-400" />
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <h1 className="text-3xl font-light">Producto no encontrado</h1>
          <p className="text-neutral-600">
            Lo sentimos, el producto que buscas no existe o ha sido eliminado.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            href="/productos"
            className="px-8 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
          >
            Ver todos los productos
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-white border border-neutral-300 hover:border-black transition-colors"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Sugerencias */}
        <div className="pt-8 border-t">
          <p className="text-sm text-neutral-600 mb-4">
            También puedes explorar nuestras categorías:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/categoria/zapatos"
              className="text-sm hover:underline text-neutral-700 hover:text-black"
            >
              Zapatos
            </Link>
            <Link
              href="/categoria/tacones"
              className="text-sm hover:underline text-neutral-700 hover:text-black"
            >
              Tacones
            </Link>
            <Link
              href="/categoria/carteras"
              className="text-sm hover:underline text-neutral-700 hover:text-black"
            >
              Carteras
            </Link>
            <Link
              href="/categoria/camisas"
              className="text-sm hover:underline text-neutral-700 hover:text-black"
            >
              Camisas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
