// types/index.ts

// Export all types from individual files
export * from "./product";
export * from "./user";
export * from "./cart";
export * from "./order";
export * from "./category";
export * from "./wishlist";
export * from "./ui";

// Common utility types
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface SearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: MenuItem[];
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "tiktok" | "pinterest";
  url: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  whatsapp?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  buttonText?: string;
  isActive: boolean;
  order: number;
}
