// components/products/ProductPurchaseActions.tsx
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/useCartStore";

interface ProductPurchaseActionsProps {
  product: Product;
  selectedSize: string | null;
  selectedColor: string | null;
}

export default function ProductPurchaseActions({
  product,
  selectedSize,
  selectedColor,
}: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Validar variantes si son requeridas
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Por favor selecciona una talla");
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Por favor selecciona un color");
      return;
    }

    // Agregar al carrito con la nueva estructura
    addItem(
      product, // Producto completo
      selectedSize || "", // Talla (string vacío si no hay)
      selectedColor || "", // Color (string vacío si no hay)
      quantity // Cantidad
    );

    toast.success(`${product.name} agregado al carrito`);
  };

  const isOutOfStock = !product.inStock || product.stock === 0;

  return (
    <div className="space-y-4 sticky top-24">
      {/* Selector de cantidad */}
      <div>
        <label className="block text-sm font-medium uppercase tracking-wide mb-3">
          Cantidad
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-neutral-300">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="p-3 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value) || 1)
              }
              className="w-16 text-center border-x border-neutral-300 py-3 focus:outline-none"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stock}
              className="p-3 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-neutral-600">
            {product.stock} disponibles
          </span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`
            w-full py-4 px-6 flex items-center justify-center gap-3
            font-medium transition-all
            ${
              isOutOfStock
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-neutral-800"
            }
          `}
        >
          <ShoppingCart className="w-5 h-5" />
          {isOutOfStock ? "Agotado" : "Agregar al carrito"}
        </button>

        <button
          disabled={isOutOfStock}
          className={`
            w-full py-4 px-6 font-medium transition-all
            ${
              isOutOfStock
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                : "bg-white text-black border-2 border-black hover:bg-black hover:text-white"
            }
          `}
        >
          Comprar ahora
        </button>
      </div>

      {/* Información adicional */}
      <div className="text-sm text-neutral-600 space-y-1 pt-4">
        <p>✓ Pago seguro garantizado</p>
        <p>✓ Envío en 24-48 horas</p>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-amber-600 font-medium">
            ⚠ ¡Solo quedan {product.stock} unidades!
          </p>
        )}
      </div>
    </div>
  );
}
