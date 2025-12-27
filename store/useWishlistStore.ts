// store/useWishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, WishlistItem } from "@/types";
import toast from "react-hot-toast";
import { generateId } from "@/lib/utils";

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.find(
          (item) => item.product.id === product.id
        );

        if (exists) {
          toast.error("Este producto ya está en tu lista de deseos");
          return;
        }

        const newItem: WishlistItem = {
          id: generateId(),
          product,
          addedAt: new Date().toISOString(),
        };

        set((state) => ({
          items: [...state.items, newItem],
        }));

        toast.success("Agregado a tu lista de deseos");
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
        toast.success("Eliminado de tu lista de deseos");
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.product.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
        toast.success("Lista de deseos vacía");
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
