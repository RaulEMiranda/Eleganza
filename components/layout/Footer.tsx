// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";
import { SITE_NAME, CONTACT_INFO, FOOTER_LINKS } from "@/constants";
import { FOOTER_CATEGORIES } from "@/constants/categories";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-elegant py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-serif">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="text-gray-400">
              Recibe ofertas exclusivas y noticias sobre nuestros nuevos
              productos
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 bg-white text-black focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-elegant font-medium"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold">{SITE_NAME}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Moda elegante y sofisticada para el hombre y la mujer moderna.
              Calidad premium en cada producto.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-700 hover:border-white transition-elegant"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-700 hover:border-white transition-elegant"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-2 border border-gray-700 hover:border-white transition-elegant"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-3">
              {FOOTER_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-elegant text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-elegant text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-elegant text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-elegant py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {SITE_NAME}. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {FOOTER_LINKS.policies.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-elegant"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
