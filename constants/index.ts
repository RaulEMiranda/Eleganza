// constants/index.ts

export const SITE_NAME = "Eleganza";
export const SITE_DESCRIPTION =
  "Moda elegante y sofisticada para el hombre y la mujer moderna";
export const SITE_URL = "https://eleganza.com";

// Tallas disponibles
export const SIZES = {
  SHOES_WOMEN: ["35", "36", "37", "38", "39", "40", "41"],
  SHOES_MEN: ["39", "40", "41", "42", "43", "44", "45"],
  CLOTHING: ["XS", "S", "M", "L", "XL", "XXL"],
  SHIRTS: ["S", "M", "L", "XL", "XXL"],
  SUITS: ["38", "40", "42", "44", "46", "48", "50"],
};

// Colores comunes
export const COLORS = [
  { name: "Negro", hex: "#000000" },
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Gris", hex: "#808080" },
  { name: "Azul Marino", hex: "#1E3A8A" },
  { name: "Beige", hex: "#D4C5B9" },
  { name: "Café", hex: "#92400E" },
  { name: "Rojo", hex: "#DC2626" },
  { name: "Verde", hex: "#065F46" },
  { name: "Rosa", hex: "#EC4899" },
  { name: "Plateado", hex: "#C0C0C0" },
];

// Métodos de envío
export const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Envío Estándar",
    description: "Entrega en 5-7 días hábiles",
    price: 0,
    estimatedDays: "5-7 días",
    isAvailable: true,
  },
  {
    id: "express",
    name: "Envío Express",
    description: "Entrega en 2-3 días hábiles",
    price: 15,
    estimatedDays: "2-3 días",
    isAvailable: true,
  },
  {
    id: "next-day",
    name: "Envío Next Day",
    description: "Entrega al día siguiente",
    price: 30,
    estimatedDays: "1 día",
    isAvailable: true,
  },
];

// Impuesto (IGV en Perú)
export const TAX_RATE = 0.18;

// Monto mínimo para envío gratis
export const FREE_SHIPPING_THRESHOLD = 200;

// Redes sociales
export const SOCIAL_LINKS = [
  { platform: "instagram" as const, url: "https://instagram.com/eleganza" },
  { platform: "facebook" as const, url: "https://facebook.com/eleganza" },
  { platform: "tiktok" as const, url: "https://tiktok.com/@eleganza" },
  { platform: "pinterest" as const, url: "https://pinterest.com/eleganza" },
];

// Información de contacto
export const CONTACT_INFO = {
  email: "contacto@eleganza.com",
  phone: "+51 999 999 999",
  whatsapp: "+51999999999",
  address: "Av. Javier Prado Este 1234, San Isidro, Lima, Perú",
};

// Navegación principal
export const NAVIGATION_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Nuevos", href: "/productos/nuevos" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Categorías", href: "/categoria" },
];

// Navegación del footer
export const FOOTER_LINKS = {
  company: [
    { label: "Sobre Nosotros", href: "/sobre-nosotros" },
    { label: "Contacto", href: "/contacto" },
    { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
  ],
  policies: [
    { label: "Políticas de Envío", href: "/politicas/envios" },
    { label: "Cambios y Devoluciones", href: "/politicas/devoluciones" },
    { label: "Términos y Condiciones", href: "/politicas/terminos" },
    { label: "Política de Privacidad", href: "/politicas/privacidad" },
  ],
  help: [
    { label: "Guía de Tallas", href: "/guia-tallas" },
    { label: "Mi Cuenta", href: "/cuenta" },
    { label: "Mis Pedidos", href: "/cuenta/pedidos" },
    { label: "Lista de Deseos", href: "/lista-deseos" },
  ],
};

// Filtros de ordenamiento
export const SORT_OPTIONS = [
  { label: "Precio: Menor a Mayor", value: "price-asc" },
  { label: "Precio: Mayor a Menor", value: "price-desc" },
  { label: "Más Vendidos", value: "popular" },
  { label: "Más Nuevos", value: "newest" },
  { label: "Mejor Valorados", value: "rating" },
];
