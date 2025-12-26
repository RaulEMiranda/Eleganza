// types/product.ts

export interface Product {
  id: string;
  slug: string; // "zapatos-tacon-stiletto-negro-elegante"
  name: string;
  description: string;
  longDescription: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  price: number;
  originalPrice?: number; // Para mostrar descuentos
  discount?: number; // Porcentaje de descuento
  images: string[];
  mainImage: string;
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  stock: number;
  sku: string; // Código de producto
  brand?: string;
  material?: string;
  featured: boolean; // Productos destacados
  isNew: boolean; // Nuevos productos
  isBestSeller: boolean;
  rating: number; // 0-5
  reviewCount: number;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductVariant {
  productId: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface ProductFilter {
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  inStock?: boolean;
  rating?: number;
  sortBy?: "price-asc" | "price-desc" | "newest" | "popular" | "rating";
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
}
