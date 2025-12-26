// components/layout/SearchBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus en el input cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery("");
    }
  };

  if (!isOpen) return null;

  const searchContent = (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Bar */}
      <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 animate-slideDown">
        <div className="container-elegant">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 py-6"
          >
            <Search className="w-6 h-6 text-gray-400" />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="flex-1 text-lg bg-transparent border-none focus:outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-elegant"
              aria-label="Cerrar búsqueda"
            >
              <X className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* Sugerencias rápidas */}
        {query.trim() === "" && (
          <div className="container-elegant pb-6">
            <div className="space-y-3">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Búsquedas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Tacones negros",
                  "Vestidos elegantes",
                  "Zapatos formales",
                  "Carteras",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      router.push(
                        `/buscar?q=${encodeURIComponent(suggestion)}`
                      );
                      onClose();
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm transition-elegant"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(searchContent, document.body);
}
