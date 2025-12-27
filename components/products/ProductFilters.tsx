// components/products/ProductFilters.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { ProductFilter } from "@/types";
import { useFilterOptions } from "@/hooks/useProducts";
import { MAIN_CATEGORIES } from "@/constants/categories";
import { formatPrice, cn } from "@/lib/utils";

interface ProductFiltersProps {
  filter: ProductFilter;
  onChange: (filter: ProductFilter) => void;
  onClose?: () => void;
  showMobileClose?: boolean;
  showCategories?: boolean;
}

export default function ProductFilters({
  filter,
  onChange,
  onClose,
  showMobileClose = false,
  showCategories = false,
}: ProductFiltersProps) {
  const pathname = usePathname();
  const options = useFilterOptions();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    price: true,
    sizes: true,
    colors: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSizeToggle = (size: string) => {
    const currentSizes = filter.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    onChange({ ...filter, sizes: newSizes });
  };

  const handleColorToggle = (color: string) => {
    const currentColors = filter.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter((c) => c !== color)
      : [...currentColors, color];

    onChange({ ...filter, colors: newColors });
  };

  const handlePriceChange = (min: number, max: number) => {
    onChange({ ...filter, priceRange: { min, max } });
  };

  const clearFilters = () => {
    onChange({ sortBy: filter.sortBy });
  };

  const hasActiveFilters =
    (filter.sizes && filter.sizes.length > 0) ||
    (filter.colors && filter.colors.length > 0) ||
    filter.priceRange;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-black transition-elegant"
            >
              Limpiar
            </button>
          )}
          {showMobileClose && onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-elegant lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories as Links - Solo si showCategories es true */}
      {showCategories && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium mb-4">Categorías</h3>
          <div className="space-y-2">
            <Link
              href="/productos"
              className={cn(
                "block px-4 py-2 text-sm transition-elegant",
                pathname === "/productos"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              )}
            >
              Todas las categorías
            </Link>
            {MAIN_CATEGORIES.map((category) => {
              const isActive = pathname === `/categoria/${category.slug}`;
              return (
                <Link
                  key={category.id}
                  href={`/categoria/${category.slug}`}
                  className={cn(
                    "block px-4 py-2 text-sm transition-elegant",
                    isActive ? "bg-black text-white" : "hover:bg-gray-100"
                  )}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="font-medium">Precio</span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Mínimo
                </label>
                <input
                  type="number"
                  value={filter.priceRange?.min || options.priceRange.min}
                  onChange={(e) =>
                    handlePriceChange(
                      Number(e.target.value),
                      filter.priceRange?.max || options.priceRange.max
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-sm"
                  min={options.priceRange.min}
                  max={options.priceRange.max}
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Máximo
                </label>
                <input
                  type="number"
                  value={filter.priceRange?.max || options.priceRange.max}
                  onChange={(e) =>
                    handlePriceChange(
                      filter.priceRange?.min || options.priceRange.min,
                      Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-sm"
                  min={options.priceRange.min}
                  max={options.priceRange.max}
                />
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Rango:{" "}
              {formatPrice(filter.priceRange?.min || options.priceRange.min)} -{" "}
              {formatPrice(filter.priceRange?.max || options.priceRange.max)}
            </p>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={() => toggleSection("sizes")}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="font-medium">Tallas</span>
          {expandedSections.sizes ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.sizes && (
          <div className="grid grid-cols-4 gap-2">
            {options.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-3 py-2 text-sm border transition-elegant ${
                  filter.sizes?.includes(size)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="font-medium">Colores</span>
          {expandedSections.colors ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.colors && (
          <div className="space-y-2">
            {options.colors.map((color) => (
              <label
                key={color}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filter.colors?.includes(color) || false}
                  onChange={() => handleColorToggle(color)}
                  className="w-4 h-4 border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stock */}
      <div className="border-t border-gray-200 pt-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filter.inStock || false}
            onChange={(e) =>
              onChange({ ...filter, inStock: e.target.checked || undefined })
            }
            className="w-4 h-4 border-gray-300 text-black focus:ring-black"
          />
          <span className="text-sm font-medium">Solo productos en stock</span>
        </label>
      </div>
    </div>
  );
}
