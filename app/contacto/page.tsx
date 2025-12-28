// app/contacto/page.tsx
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { CONTACT_INFO } from "@/constants";
import toast from "react-hot-toast";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío (aquí conectarías con tu backend/email service)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("¡Mensaje enviado exitosamente! Te contactaremos pronto.");

      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Error al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 lg:py-20">
        <div className="container-elegant text-center">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Contáctanos
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos
            lo antes posible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 lg:py-16">
        <div className="container-elegant">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
            {/* Email */}
            <div className="bg-white p-6 shadow-elegant text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-sm text-gray-600 hover:text-black transition-elegant"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            {/* Teléfono */}
            <div className="bg-white p-6 shadow-elegant text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                className="text-sm text-gray-600 hover:text-black transition-elegant"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>

            {/* Dirección */}
            <div className="bg-white p-6 shadow-elegant text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Dirección</h3>
              <p className="text-sm text-gray-600">{CONTACT_INFO.address}</p>
            </div>

            {/* Horario */}
            <div className="bg-white p-6 shadow-elegant text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Horario</h3>
              <p className="text-sm text-gray-600">
                Lun - Vie: 9:00 - 18:00
                <br />
                Sáb: 10:00 - 14:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-20">
        <div className="container-elegant">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white p-8 lg:p-12 shadow-elegant">
              <h2 className="text-2xl lg:text-3xl font-serif font-semibold mb-6">
                Envíanos un Mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Correo Electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Asunto
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta-producto">
                      Consulta sobre Producto
                    </option>
                    <option value="pedido">Estado de Pedido</option>
                    <option value="devolucion">Cambios y Devoluciones</option>
                    <option value="sugerencia">Sugerencias</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Adicional */}
            <div className="space-y-8">
              {/* FAQ Link */}
              <div className="bg-blue-50 border border-blue-200 p-6">
                <h3 className="font-semibold mb-3 text-blue-900">
                  ¿Tienes una pregunta rápida?
                </h3>
                <p className="text-sm text-blue-800 mb-4">
                  Puede que ya esté respondida en nuestras preguntas frecuentes.
                </p>
                <a
                  href="/preguntas-frecuentes"
                  className="inline-block px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-elegant"
                >
                  Ver Preguntas Frecuentes
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-green-50 border border-green-200 p-6">
                <h3 className="font-semibold mb-3 text-green-900">
                  ¿Necesitas ayuda inmediata?
                </h3>
                <p className="text-sm text-green-800 mb-4">
                  Contáctanos por WhatsApp y te responderemos al instante.
                </p>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-elegant"
                >
                  Chatear por WhatsApp
                </a>
              </div>

              {/* Horarios */}
              <div className="bg-white p-6 shadow-elegant">
                <h3 className="font-semibold mb-4">Horarios de Atención</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunes - Viernes</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sábado</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domingo</span>
                    <span className="font-medium text-red-600">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="bg-white p-6 shadow-elegant">
                <h3 className="font-semibold mb-4">Síguenos</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Mantente al día con nuestras novedades y promociones.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-gray-300 text-center hover:border-black transition-elegant text-sm font-medium"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-gray-300 text-center hover:border-black transition-elegant text-sm font-medium"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Opcional) */}
      <section className="py-12 lg:py-20 bg-gray-100">
        <div className="container-elegant">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
              Encuéntranos
            </h2>
            <p className="text-gray-600">Visítanos en nuestra tienda física</p>
          </div>
          <div className="bg-gray-300 h-96 flex items-center justify-center shadow-elegant">
            <p className="text-gray-600">
              [Aquí iría el mapa de Google Maps con tu ubicación]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
