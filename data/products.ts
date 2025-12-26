// data/products.ts

import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  // ZAPATOS MUJER - TACONES
  {
    id: "1",
    slug: "stiletto-negro-clasico",
    name: "Stiletto Negro Clásico",
    description:
      "Elegante stiletto negro de tacón alto, perfecto para ocasiones formales",
    longDescription:
      "Stiletto de tacón alto en cuero genuino, diseño clásico y atemporal. Ideal para eventos formales, reuniones de negocios o una noche especial. Su acabado premium y tacón de 10cm proporcionan elegancia y sofisticación.",
    category: "Zapatos Mujer",
    categorySlug: "zapatos-mujer",
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      "https://images.unsplash.com/photo-1596702962167-e0f84a5d63ce?w=800",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: [
      { name: "Negro", hex: "#000000", available: true },
      { name: "Rojo", hex: "#DC2626", available: true },
      { name: "Beige", hex: "#D4C5B9", available: false },
    ],
    inStock: true,
    stock: 45,
    sku: "ZM-STL-001",
    brand: "Eleganza",
    material: "Cuero genuino",
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 124,
    metaTitle: "Stiletto Negro Clásico - Tacón Alto Elegante",
    metaDescription:
      "Stiletto de tacón alto en cuero genuino. Elegancia y sofisticación para toda ocasión.",
    keywords: ["stiletto", "tacón alto", "zapatos elegantes", "cuero"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
  {
    id: "2",
    slug: "pump-beige-elegante",
    name: "Pump Beige Elegante",
    description:
      "Pump de tacón medio en tono beige nude, versátil y sofisticado",
    longDescription:
      "Pump clásico en tono beige nude que combina con todo tu guardarropa. Tacón de 7cm para comodidad sin sacrificar estilo. Perfecto para el día a día profesional o eventos casuales elegantes.",
    category: "Zapatos Mujer",
    categorySlug: "zapatos-mujer",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
      "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    colors: [
      { name: "Beige", hex: "#D4C5B9", available: true },
      { name: "Negro", hex: "#000000", available: true },
      { name: "Rosa", hex: "#EC4899", available: true },
    ],
    inStock: true,
    stock: 38,
    sku: "ZM-PMP-002",
    brand: "Eleganza",
    material: "Cuero sintético premium",
    featured: true,
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 89,
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },

  // ZAPATOS HOMBRE
  {
    id: "3",
    slug: "oxford-negro-formal",
    name: "Oxford Negro Formal",
    description:
      "Zapato Oxford clásico para caballero, ideal para eventos formales",
    longDescription:
      "Oxford de cuero genuino con acabado brillante. Diseño tradicional con cordones y punta refinada. Perfecto para bodas, graduaciones y eventos corporativos. Plantilla acolchada para mayor comodidad.",
    category: "Zapatos Hombre",
    categorySlug: "zapatos-hombre",
    price: 219.99,
    originalPrice: 279.99,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
      "https://images.unsplash.com/photo-1582897189206-a8639090ma64?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Negro", hex: "#000000", available: true },
      { name: "Café", hex: "#92400E", available: true },
    ],
    inStock: true,
    stock: 32,
    sku: "ZH-OXF-003",
    brand: "Eleganza",
    material: "Cuero genuino",
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 156,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
  {
    id: "4",
    slug: "mocasin-cafe-elegante",
    name: "Mocasín Café Elegante",
    description: "Mocasín de cuero en tono café, cómodo y versátil",
    longDescription:
      "Mocasín sin cordones en cuero café premium. Diseño slip-on para facilidad de uso. Ideal para look business casual o eventos semi-formales. Suela antideslizante y forro interior de cuero.",
    category: "Zapatos Hombre",
    categorySlug: "zapatos-hombre",
    price: 179.99,
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Café", hex: "#92400E", available: true },
      { name: "Negro", hex: "#000000", available: true },
      { name: "Azul Marino", hex: "#1E3A8A", available: false },
    ],
    inStock: true,
    stock: 28,
    sku: "ZH-MOC-004",
    brand: "Eleganza",
    material: "Cuero genuino",
    featured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 73,
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },

  // VESTIDOS
  {
    id: "5",
    slug: "vestido-negro-coctel",
    name: "Vestido Negro de Cóctel",
    description:
      "Elegante vestido negro de corte A, perfecto para eventos nocturnos",
    longDescription:
      "Vestido de cóctel en color negro con corte A que estiliza la figura. Confeccionado en tela premium con ligero brillo. Largo hasta la rodilla, ideal para cenas, fiestas y eventos especiales. Cierre invisible en la espalda.",
    category: "Vestidos",
    categorySlug: "vestidos",
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Negro", hex: "#000000", available: true },
      { name: "Azul Marino", hex: "#1E3A8A", available: true },
      { name: "Rojo", hex: "#DC2626", available: true },
    ],
    inStock: true,
    stock: 22,
    sku: "VE-COC-005",
    brand: "Eleganza",
    material: "Poliéster premium",
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 198,
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
  {
    id: "6",
    slug: "vestido-largo-gala",
    name: "Vestido Largo de Gala",
    description: "Vestido largo elegante para eventos de gala y bodas",
    longDescription:
      "Impresionante vestido largo con caída fluida y detalles de encaje en el corpiño. Perfecto para galas, bodas elegantes y eventos especiales. Disponible en colores sofisticados. Forro interior completo.",
    category: "Vestidos",
    categorySlug: "vestidos",
    price: 399.99,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Azul Marino", hex: "#1E3A8A", available: true },
      { name: "Verde", hex: "#065F46", available: true },
      { name: "Plateado", hex: "#C0C0C0", available: false },
    ],
    inStock: true,
    stock: 15,
    sku: "VE-GAL-006",
    brand: "Eleganza",
    material: "Seda sintética",
    featured: true,
    isNew: true,
    isBestSeller: false,
    rating: 5.0,
    reviewCount: 67,
    createdAt: "2024-12-05T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },

  // CAMISAS
  {
    id: "7",
    slug: "camisa-blanca-formal-hombre",
    name: "Camisa Blanca Formal Hombre",
    description: "Camisa de vestir blanca, corte slim fit",
    longDescription:
      "Camisa formal en color blanco impecable, confeccionada en algodón premium. Corte slim fit que estiliza la silueta. Perfecta para usar con traje o de manera más casual. Cuello italiano y puños con doble botón.",
    category: "Camisas",
    categorySlug: "camisas",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Blanco", hex: "#FFFFFF", available: true },
      { name: "Azul Claro", hex: "#BFDBFE", available: true },
      { name: "Negro", hex: "#000000", available: true },
    ],
    inStock: true,
    stock: 56,
    sku: "CM-FOR-007",
    brand: "Eleganza",
    material: "Algodón 100%",
    featured: false,
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 142,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
  {
    id: "8",
    slug: "camisa-seda-mujer",
    name: "Camisa de Seda Mujer",
    description: "Elegante blusa de seda con caída fluida",
    longDescription:
      "Blusa de seda sintética premium con caída elegante y acabado satinado. Perfecta para looks de oficina o eventos semi-formales. Botones delicados y corte favorecedor. Disponible en colores sofisticados.",
    category: "Camisas",
    categorySlug: "camisas",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800",
      "https://images.unsplash.com/photo-1594223515828-29fce7e4d9f0?w=800",
      "https://images.unsplash.com/photo-1578932750355-5eb30ece487a?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blanco", hex: "#FFFFFF", available: true },
      { name: "Negro", hex: "#000000", available: true },
      { name: "Rosa", hex: "#EC4899", available: true },
      { name: "Beige", hex: "#D4C5B9", available: false },
    ],
    inStock: true,
    stock: 34,
    sku: "CM-SED-008",
    brand: "Eleganza",
    material: "Seda sintética",
    featured: true,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 91,
    createdAt: "2024-11-20T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },

  // SACOS Y BLAZERS
  {
    id: "9",
    slug: "blazer-negro-mujer",
    name: "Blazer Negro Mujer",
    description: "Blazer entallado de corte moderno para mujer",
    longDescription:
      "Blazer negro con corte entallado que realza la figura. Solapa con muesca y botones dorados elegantes. Perfecto para completar un look profesional o darle un toque sofisticado a jeans. Bolsillos funcionales.",
    category: "Sacos y Blazers",
    categorySlug: "sacos-blazers",
    price: 199.99,
    originalPrice: 259.99,
    discount: 23,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      "https://images.unsplash.com/photo-1594223515878-d6e56d6db3e9?w=800",
      "https://images.unsplash.com/photo-1592878896051-93fd8b5a69bc?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Negro", hex: "#000000", available: true },
      { name: "Azul Marino", hex: "#1E3A8A", available: true },
      { name: "Gris", hex: "#808080", available: true },
    ],
    inStock: true,
    stock: 29,
    sku: "BL-MUJ-009",
    brand: "Eleganza",
    material: "Poliéster premium",
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 167,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
  {
    id: "10",
    slug: "saco-formal-hombre",
    name: "Saco Formal Hombre",
    description: "Saco de vestir para caballero, corte clásico",
    longDescription:
      "Saco formal de corte clásico confeccionado en lana premium. Ideal para completar tu traje de negocios o eventos formales. Forro interior de calidad y acabados impecables. Disponible en tallas regulares y grandes.",
    category: "Sacos y Blazers",
    categorySlug: "sacos-blazers",
    price: 289.99,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
      "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
    sizes: ["38", "40", "42", "44", "46", "48"],
    colors: [
      { name: "Azul Marino", hex: "#1E3A8A", available: true },
      { name: "Negro", hex: "#000000", available: true },
      { name: "Gris", hex: "#808080", available: true },
    ],
    inStock: true,
    stock: 21,
    sku: "SC-HOM-010",
    brand: "Eleganza",
    material: "Lana 70%, Poliéster 30%",
    featured: false,
    isNew: false,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 84,
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },

  // CARTERAS
  {
    id: "11",
    slug: "cartera-cuero-negra",
    name: "Cartera de Cuero Negra",
    description: "Elegante cartera de mano en cuero genuino",
    longDescription:
      "Sofisticada cartera de mano confeccionada en cuero genuino de alta calidad. Diseño minimalista con compartimentos interiores organizados. Cierre magnético y asa dorada elegante. Perfecta para eventos formales o uso diario.",
    category: "Carteras",
    categorySlug: "carteras",
    price: 179.99,
    originalPrice: 229.99,
    discount: 22,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    sizes: ["Única"],
    colors: [
      { name: "Negro", hex: "#000000", available: true },
      { name: "Café", hex: "#92400E", available: true },
      { name: "Beige", hex: "#D4C5B9", available: false },
    ],
    inStock: true,
    stock: 18,
    sku: "CR-CUE-011",
    brand: "Eleganza",
    material: "Cuero genuino",
    featured: true,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 112,
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
  {
    id: "12",
    slug: "bolso-bandolera-elegante",
    name: "Bolso Bandolera Elegante",
    description: "Bolso cruzado con cadena dorada y acabado premium",
    longDescription:
      "Bolso bandolera con correa de cadena dorada ajustable. Tamaño compacto perfecto para llevar lo esencial con estilo. Múltiples compartimentos internos. Ideal para salidas nocturnas o eventos especiales.",
    category: "Carteras",
    categorySlug: "carteras",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    sizes: ["Única"],
    colors: [
      { name: "Negro", hex: "#000000", available: true },
      { name: "Rojo", hex: "#DC2626", available: true },
      { name: "Plateado", hex: "#C0C0C0", available: true },
    ],
    inStock: true,
    stock: 25,
    sku: "BS-BAN-012",
    brand: "Eleganza",
    material: "Cuero sintético premium",
    featured: false,
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 136,
    createdAt: "2024-04-10T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
];

// Funciones helper para filtrar productos
export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find((product) => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find((product) => product.id === id);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return PRODUCTS.filter((product) => product.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return PRODUCTS.filter((product) => product.featured);
};

export const getNewProducts = (): Product[] => {
  return PRODUCTS.filter((product) => product.isNew);
};

export const getBestSellers = (): Product[] => {
  return PRODUCTS.filter((product) => product.isBestSeller);
};

export const getProductsOnSale = (): Product[] => {
  return PRODUCTS.filter((product) => product.discount && product.discount > 0);
};
