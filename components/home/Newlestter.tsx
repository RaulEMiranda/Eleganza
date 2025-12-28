// components/home/Newsletter.tsx
"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío (aquí conectarías con tu servicio de email)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubscribed(true);
      toast.success("¡Gracias por suscribirte!");
      setEmail("");

      // Reset después de 3 segundos
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      toast.error("Error al suscribirse. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-black text-white">
      <div className="container-elegant">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Mail className="w-8 h-8" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-4">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe ofertas exclusivas,
            novedades y tips de estilo directamente en tu correo
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-elegant disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Suscribiendo...
                  </>
                ) : isSubscribed ? (
                  <>
                    <Check className="w-5 h-5" />
                    ¡Suscrito!
                  </>
                ) : (
                  "Suscribirse"
                )}
              </button>
            </div>
          </form>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-green-400"
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
                <p className="font-medium">10% de Descuento</p>
              </div>
              <p className="text-sm text-gray-400">En tu primera compra</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-green-400"
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
                <p className="font-medium">Acceso Anticipado</p>
              </div>
              <p className="text-sm text-gray-400">A nuevas colecciones</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-green-400"
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
                <p className="font-medium">Tips de Estilo</p>
              </div>
              <p className="text-sm text-gray-400">Y consejos exclusivos</p>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-gray-400 mt-8">
            Al suscribirte, aceptas recibir correos de marketing de Eleganza.
            Puedes darte de baja en cualquier momento.{" "}
            <a
              href="/politicas/privacidad"
              className="underline hover:text-white"
            >
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
