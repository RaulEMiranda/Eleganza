// components/layout/MobileMenu.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { MAIN_CATEGORIES } from "@/constants/categories";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuContent = (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white animate-slideRight">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-serif font-semibold">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-elegant"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 space-y-6">
          {/* Main Links */}
          <div className="space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="block text-base font-medium hover:text-gray-600 transition-elegant"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              onClick={onClose}
              className="block text-base font-medium hover:text-gray-600 transition-elegant"
            >
              Nuevos Productos
            </Link>
            <Link
              href="/categoria/zapatos-mujer"
              onClick={onClose}
              className="block text-base font-medium hover:text-gray-600 transition-elegant"
            >
              Ofertas
            </Link>
            <Link
              href="/sacos-blazers"
              onClick={onClose}
              className="block text-base font-medium hover:text-gray-600 transition-elegant"
            >
              Más Vendidos
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Categorías
            </h3>
            {MAIN_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
                onClick={onClose}
                className="block text-base hover:text-gray-600 transition-elegant"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Account Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Mi Cuenta
            </h3>
            <Link
              href="/cuenta"
              onClick={onClose}
              className="block text-base hover:text-gray-600 transition-elegant"
            >
              Perfil
            </Link>
            <Link
              href="/cuenta/pedidos"
              onClick={onClose}
              className="block text-base hover:text-gray-600 transition-elegant"
            >
              Mis Pedidos
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );

  return createPortal(menuContent, document.body);
}
