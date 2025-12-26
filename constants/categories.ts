// constants/categories.ts

import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "1",
    slug: "zapatos-mujer",
    name: "Zapatos Mujer",
    description:
      "Elegantes zapatos de tacón, stilettos y pumps para toda ocasión",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop",
    order: 1,
    isActive: true,
    productCount: 0,
    metaTitle: "Zapatos Elegantes para Mujer | Tacones y Stilettos",
    metaDescription:
      "Descubre nuestra colección de zapatos de tacón elegantes. Stilettos, pumps y más estilos sofisticados.",
  },
  {
    id: "2",
    slug: "zapatos-hombre",
    name: "Zapatos Hombre",
    description: "Zapatos formales y elegantes para caballero",
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=400&fit=crop",
    order: 2,
    isActive: true,
    productCount: 0,
    metaTitle: "Zapatos Formales para Hombre | Calzado Elegante",
    metaDescription:
      "Zapatos de vestir, oxfords y mocasines de alta calidad para el hombre moderno.",
  },
  {
    id: "3",
    slug: "vestidos",
    name: "Vestidos",
    description: "Vestidos elegantes para toda ocasión especial",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop",
    order: 3,
    isActive: true,
    productCount: 0,
    metaTitle: "Vestidos Elegantes | Moda Femenina",
    metaDescription:
      "Vestidos sofisticados para eventos, fiestas y ocasiones especiales.",
  },
  {
    id: "4",
    slug: "camisas",
    name: "Camisas",
    description: "Camisas formales y elegantes para hombre y mujer",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=400&fit=crop",
    order: 4,
    isActive: true,
    productCount: 0,
    metaTitle: "Camisas Elegantes | Formales y Casuales",
    metaDescription: "Camisas de alta calidad en diversos estilos y colores.",
  },
  {
    id: "5",
    slug: "sacos-blazers",
    name: "Sacos y Blazers",
    description: "Sacos y blazers elegantes para hombre y mujer",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
    order: 5,
    isActive: true,
    productCount: 0,
    metaTitle: "Sacos y Blazers Elegantes | Moda Formal",
    metaDescription:
      "Blazers y sacos de corte impecable para un look profesional.",
  },
  {
    id: "6",
    slug: "carteras",
    name: "Carteras",
    description: "Carteras y bolsos de lujo para complementar tu estilo",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop",
    order: 6,
    isActive: true,
    productCount: 0,
    metaTitle: "Carteras y Bolsos de Lujo | Accesorios Elegantes",
    metaDescription: "Carteras de cuero genuino y diseños exclusivos.",
  },
  {
    id: "7",
    slug: "accesorios",
    name: "Accesorios",
    description: "Medias, corbatas, cinturones y más accesorios elegantes",
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=400&fit=crop",
    order: 7,
    isActive: true,
    productCount: 0,
    metaTitle: "Accesorios Elegantes | Complementos de Moda",
    metaDescription: "Completa tu look con nuestros accesorios premium.",
  },
];

// Categorías principales para el menú
export const MAIN_CATEGORIES = CATEGORIES.filter((cat) => cat.isActive);

// Categorías para el footer
export const FOOTER_CATEGORIES = [
  { name: "Zapatos Mujer", slug: "zapatos-mujer" },
  { name: "Zapatos Hombre", slug: "zapatos-hombre" },
  { name: "Vestidos", slug: "vestidos" },
  { name: "Camisas", slug: "camisas" },
];
