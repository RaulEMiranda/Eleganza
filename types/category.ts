// types/category.ts

export interface Category {
  id: string;
  slug: string; // "zapatos-tacon"
  name: string;
  description: string;
  image: string;
  icon?: string;
  parentId?: string; // Para subcategorías
  order: number; // Orden de visualización
  isActive: boolean;
  productCount: number;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface Collection {
  id: string;
  slug: string; // "primavera-verano-2024"
  name: string;
  description: string;
  bannerImage: string;
  thumbnailImage: string;
  isActive: boolean;
  isFeatured: boolean;
  productIds: string[];

  // Fechas de la colección
  startDate?: string;
  endDate?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  createdAt: string;
  updatedAt: string;
}

export interface Subcategory extends Omit<Category, "parentId"> {
  parentId: string;
  parentSlug: string;
}
