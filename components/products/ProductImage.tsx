// components/products/ProductImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden group">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - imagen ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Botón de zoom */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Ampliar imagen"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* Indicador de imagen */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-3/4 bg-neutral-100 overflow-hidden transition-all ${
                selectedImage === index
                  ? "ring-2 ring-black"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal de zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white hover:text-neutral-300 text-4xl font-light"
            aria-label="Cerrar zoom"
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
            <Image
              src={images[selectedImage]}
              alt={`${productName} - zoom`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
