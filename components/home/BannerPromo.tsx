// components/home/BannerPromo.tsx
import Link from "next/link";

export default function BannerPromo() {
  return (
    <section className="py-12 lg:py-20 bg-black text-white">
      <div className="container-elegant">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative aspect-4/3 lg:aspect-3/4 overflow-hidden order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop"
              alt="Nueva Colección"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 lg:pl-12">
            <p className="text-sm font-medium tracking-wider mb-4 text-gray-300">
              COLECCIÓN ESPECIAL
            </p>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
              Verano 2025
              <br />
              Estilo & Elegancia
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Descubre nuestra nueva colección de verano con diseños exclusivos
              que combinan sofisticación y comodidad. Hasta 40% de descuento en
              piezas seleccionadas.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 shrink-0 text-white mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-medium mb-1">Diseños Exclusivos</h3>
                  <p className="text-sm text-gray-300">
                    Piezas únicas diseñadas para destacar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 shrink-0 text-white mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-medium mb-1">Materiales Premium</h3>
                  <p className="text-sm text-gray-300">
                    Telas de la más alta calidad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 shrink-0 text-white mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-medium mb-1">Envío Gratis</h3>
                  <p className="text-sm text-gray-300">
                    En todos los pedidos de la colección
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/productos"
              className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-elegant"
            >
              Ver Colección
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
