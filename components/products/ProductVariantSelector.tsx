// components/products/ProductVariantSelector.tsx
"use client";

import { Product } from "@/types/product";

interface ProductVariantSelectorProps {
  product: Product;
  selectedSize: string | null;
  selectedColor: string | null;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export default function ProductVariantSelector({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: ProductVariantSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Selector de tallas */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium uppercase tracking-wide">
              Talla
            </label>
            {selectedSize && (
              <span className="text-sm text-neutral-600">
                Seleccionado: {selectedSize}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {product.sizes.map((size) => {
              const isAvailable = product.inStock && product.stock > 0;
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  disabled={!isAvailable}
                  className={`
                    py-3 px-4 text-sm font-medium transition-all
                    ${
                      isSelected
                        ? "bg-black text-white"
                        : isAvailable
                        ? "bg-white border border-neutral-300 hover:border-black"
                        : "bg-neutral-100 text-neutral-400 cursor-not-allowed line-through"
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selector de colores */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium uppercase tracking-wide">
              Color
            </label>
            {selectedColor && (
              <span className="text-sm text-neutral-600">
                {product.colors.find((c) => c.name === selectedColor)?.name}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color.name;
              const isAvailable = color.available;

              return (
                <button
                  key={color.name}
                  onClick={() => isAvailable && onColorChange(color.name)}
                  disabled={!isAvailable}
                  className={`
                    group relative flex items-center gap-3 py-2 px-4 transition-all
                    ${
                      isSelected
                        ? "bg-black text-white"
                        : isAvailable
                        ? "bg-white border border-neutral-300 hover:border-black"
                        : "bg-neutral-100 border border-neutral-200 cursor-not-allowed opacity-50"
                    }
                  `}
                  title={color.name}
                >
                  {/* Círculo de color */}
                  <span
                    className={`
                      w-5 h-5 border-2 transition-colors
                      ${isSelected ? "border-white" : "border-neutral-300"}
                    `}
                    style={{ backgroundColor: color.hex }}
                  />
                  {/* Nombre del color */}
                  <span className="text-sm font-medium">{color.name}</span>

                  {/* Checkmark cuando está seleccionado */}
                  {isSelected && (
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Guía de tallas */}
      {product.sizes && product.sizes.length > 0 && (
        <button className="text-sm text-neutral-600 hover:text-black underline">
          Guía de tallas
        </button>
      )}
    </div>
  );
}
