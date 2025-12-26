// types/wishlist.ts

import { Product } from "./product";

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
}
