// hooks/useProducts.ts
import { useMemo } from "react";
import {
  PRODUCTS,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getNewProducts,
  getBestSellers,
  getProductsOnSale,
} from "@/data/products";
import { ProductFilter } from "@/types";

export function useProducts(filter?: ProductFilter) {
  const filteredProducts = useMemo(() => {
    let products = [...PRODUCTS];

    if (!filter) return products;

    // Filtrar por categorías
    if (filter.categories && filter.categories.length > 0) {
      products = products.filter((product) =>
        filter.categories!.includes(product.categorySlug)
      );
    }

    // Filtrar por rango de precio
    if (filter.priceRange) {
      products = products.filter(
        (product) =>
          product.price >= filter.priceRange!.min &&
          product.price <= filter.priceRange!.max
      );
    }

    // Filtrar por tallas
    if (filter.sizes && filter.sizes.length > 0) {
      products = products.filter((product) =>
        product.sizes.some((size) => filter.sizes!.includes(size))
      );
    }

    // Filtrar por colores
    if (filter.colors && filter.colors.length > 0) {
      products = products.filter((product) =>
        product.colors.some((color) => filter.colors!.includes(color.name))
      );
    }

    // Filtrar por marcas
    if (filter.brands && filter.brands.length > 0) {
      products = products.filter((product) =>
        filter.brands!.includes(product.brand || "")
      );
    }

    // Filtrar por stock
    if (filter.inStock !== undefined) {
      products = products.filter(
        (product) => product.inStock === filter.inStock
      );
    }

    // Filtrar por rating
    if (filter.rating) {
      products = products.filter((product) => product.rating >= filter.rating!);
    }

    // Ordenar
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case "price-asc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          products.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          products.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "popular":
          products.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case "rating":
          products.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    return products;
  }, [filter]);

  return {
    products: filteredProducts,
    total: filteredProducts.length,
  };
}

export function useProduct(slugOrId: string) {
  const product = useMemo(() => {
    return getProductBySlug(slugOrId) || getProductById(slugOrId);
  }, [slugOrId]);

  return { product };
}

export function useFeaturedProducts() {
  const products = useMemo(() => getFeaturedProducts(), []);
  return { products };
}

export function useNewProducts() {
  const products = useMemo(() => getNewProducts(), []);
  return { products };
}

export function useBestSellers() {
  const products = useMemo(() => getBestSellers(), []);
  return { products };
}

export function useProductsOnSale() {
  const products = useMemo(() => getProductsOnSale(), []);
  return { products };
}

export function useProductsByCategory(categorySlug: string) {
  const products = useMemo(
    () => getProductsByCategory(categorySlug),
    [categorySlug]
  );
  return { products };
}

// Hook para obtener valores únicos de filtros
export function useFilterOptions() {
  const options = useMemo(() => {
    const allSizes = new Set<string>();
    const allColors = new Set<string>();
    const allBrands = new Set<string>();
    const priceRange = { min: Infinity, max: 0 };

    PRODUCTS.forEach((product) => {
      product.sizes.forEach((size) => allSizes.add(size));
      product.colors.forEach((color) => allColors.add(color.name));
      if (product.brand) allBrands.add(product.brand);

      if (product.price < priceRange.min) priceRange.min = product.price;
      if (product.price > priceRange.max) priceRange.max = product.price;
    });

    return {
      sizes: Array.from(allSizes).sort(),
      colors: Array.from(allColors).sort(),
      brands: Array.from(allBrands).sort(),
      priceRange,
    };
  }, []);

  return options;
}
