// app/preguntas-frecuentes/page.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { CONTACT_INFO } from "@/constants";

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  // Envíos
  {
    id: 1,
    category: "Envíos",
    question: "¿Cuánto tiempo tarda el envío?",
    answer:
      "El tiempo de entrega varía según el método de envío seleccionado. El envío estándar tarda de 5 a 7 días hábiles, el envío express de 2 a 3 días hábiles, y el envío next day se entrega al día siguiente. Los tiempos pueden variar según tu ubicación.",
  },
  {
    id: 2,
    category: "Envíos",
    question: "¿El envío tiene costo?",
    answer:
      "Ofrecemos envío gratis en compras mayores a S/. 200. Para compras menores, el costo de envío estándar es de S/. 15. Los envíos express y next day tienen costos adicionales que se muestran al momento del checkout.",
  },
  {
    id: 3,
    category: "Envíos",
    question: "¿Puedo rastrear mi pedido?",
    answer:
      "Sí, una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento. También puedes verificar el estado de tu pedido en la sección 'Mis Pedidos' de tu cuenta.",
  },
  {
    id: 4,
    category: "Envíos",
    question: "¿Realizan envíos a todo el Perú?",
    answer:
      "Sí, realizamos envíos a todo el Perú. Los tiempos de entrega pueden variar según la ciudad o región. Para zonas alejadas, el tiempo de entrega puede extenderse de 1 a 3 días adicionales.",
  },

  // Devoluciones
  {
    id: 5,
    category: "Devoluciones",
    question: "¿Cuál es la política de devoluciones?",
    answer:
      "Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto. Los artículos deben estar sin usar, con las etiquetas originales y en su empaque original. El reembolso se procesará dentro de 5 a 7 días hábiles después de recibir el producto.",
  },
  {
    id: 6,
    category: "Devoluciones",
    question: "¿Cómo inicio una devolución?",
    answer:
      "Para iniciar una devolución, ve a 'Mis Pedidos' en tu cuenta, selecciona el pedido y haz clic en 'Solicitar Devolución'. También puedes contactarnos directamente a través de nuestro formulario de contacto o WhatsApp.",
  },
  {
    id: 7,
    category: "Devoluciones",
    question: "¿Quién paga el envío de devolución?",
    answer:
      "Las devoluciones son gratuitas. Te proporcionaremos una etiqueta de envío prepagada para que puedas devolver tu producto sin costo adicional.",
  },
  {
    id: 8,
    category: "Devoluciones",
    question: "¿Puedo cambiar un producto por otro?",
    answer:
      "Sí, puedes cambiar un producto por otro de diferente talla o color. Simplemente inicia el proceso de devolución y realiza un nuevo pedido con el producto deseado, o contáctanos para gestionar el cambio directamente.",
  },

  // Pagos
  {
    id: 9,
    category: "Pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PayPal y transferencias bancarias. Todos los pagos son procesados de forma segura a través de pasarelas de pago certificadas.",
  },
  {
    id: 10,
    category: "Pagos",
    question: "¿Es seguro pagar en línea?",
    answer:
      "Sí, utilizamos encriptación SSL de 256 bits y trabajamos con procesadores de pago certificados que cumplen con los más altos estándares de seguridad. Nunca almacenamos información completa de tus tarjetas.",
  },
  {
    id: 11,
    category: "Pagos",
    question: "¿Puedo pagar en cuotas?",
    answer:
      "Sí, ofrecemos opciones de pago en cuotas sin intereses con tarjetas de crédito participantes. Las opciones disponibles se mostrarán al momento del pago según tu tarjeta.",
  },

  // Productos
  {
    id: 12,
    category: "Productos",
    question: "¿Cómo sé qué talla elegir?",
    answer:
      "Tenemos una guía de tallas detallada disponible en cada página de producto. También puedes consultar nuestra sección de 'Guía de Tallas' en el footer para información más detallada sobre medidas y equivalencias.",
  },
  {
    id: 13,
    category: "Productos",
    question: "¿Los productos son originales?",
    answer:
      "Sí, todos nuestros productos son 100% originales y auténticos. Trabajamos directamente con marcas reconocidas y garantizamos la autenticidad de cada artículo que vendemos.",
  },
  {
    id: 14,
    category: "Productos",
    question: "¿Tienen tienda física?",
    answer:
      "Sí, contamos con una tienda física en Lima. Puedes visitarnos en Av. Javier Prado Este 1234, San Isidro, Lima. Nuestro horario es de lunes a viernes de 9:00 AM a 6:00 PM y sábados de 10:00 AM a 2:00 PM.",
  },
  {
    id: 15,
    category: "Productos",
    question: "¿Cómo cuido mis prendas?",
    answer:
      "Cada producto incluye una etiqueta con instrucciones específicas de cuidado. En general, recomendamos lavar las prendas delicadas a mano o en ciclo suave, evitar el uso de blanqueador y secar a la sombra.",
  },

  // Cuenta
  {
    id: 16,
    category: "Cuenta",
    question: "¿Necesito crear una cuenta para comprar?",
    answer:
      "Sí, necesitas crear una cuenta para realizar compras. Esto te permite rastrear tus pedidos, guardar direcciones, acceder a tu lista de deseos y recibir ofertas exclusivas.",
  },
  {
    id: 17,
    category: "Cuenta",
    question: "¿Cómo cambio mi contraseña?",
    answer:
      "Puedes cambiar tu contraseña en la sección 'Mi Cuenta' > 'Configuración de Seguridad'. Si olvidaste tu contraseña, usa la opción '¿Olvidaste tu contraseña?' en la página de inicio de sesión.",
  },
  {
    id: 18,
    category: "Cuenta",
    question: "¿Puedo modificar mis datos personales?",
    answer:
      "Sí, puedes actualizar tus datos personales en cualquier momento desde la sección 'Mi Cuenta' > 'Información Personal'. Los cambios se guardarán automáticamente.",
  },
];

const categories = [
  "Todos",
  "Envíos",
  "Devoluciones",
  "Pagos",
  "Productos",
  "Cuenta",
];

export default function PreguntasFrecuentesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "Todos" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 lg:py-20">
        <div className="container-elegant text-center">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Encuentra respuestas rápidas a las preguntas más comunes
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar pregunta..."
                className="w-full pl-12 pr-4 py-4 text-black focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-elegant">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-medium whitespace-nowrap transition-elegant ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-20">
        <div className="container-elegant max-w-4xl">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No se encontraron preguntas que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Todos");
                }}
                className="mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-elegant"
              >
                Ver Todas las Preguntas
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-200 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-elegant"
                  >
                    <div className="flex-1">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-medium mt-1">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 shrink-0 ml-4 transition-transform ${
                        openFAQ === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openFAQ === faq.id && (
                    <div className="px-6 pb-5 pt-2 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container-elegant text-center">
          <h2 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de soporte está listo para ayudarte con cualquier
            pregunta o inquietud que tengas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant"
            >
              Contactar Soporte
            </a>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-gray-300 font-medium hover:border-black transition-elegant"
            >
              Chatear por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
