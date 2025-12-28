// data/reviews.ts
import { ProductReview } from "@/types/product";

export const reviews: ProductReview[] = [
  // Reviews para Stiletto Negro Clásico (id: "1")
  {
    id: "rev-001",
    productId: "1",
    userId: "user-001",
    userName: "María González",
    rating: 5,
    comment:
      "¡Absolutamente hermosos! El cuero es de excelente calidad y el tacón tiene la altura perfecta. Los he usado en varias bodas y siempre recibo cumplidos. Muy cómodos considerando la altura del tacón.",
    images: [],
    helpful: 48,
    createdAt: "2024-12-10T15:30:00Z",
  },
  {
    id: "rev-002",
    productId: "1",
    userId: "user-002",
    userName: "Ana Sofía Ramírez",
    rating: 5,
    comment:
      "Compré estos stilettos para una presentación importante y quedé encantada. El acabado es impecable y la talla es exacta. Recomiendo pedir su talla habitual.",
    helpful: 32,
    createdAt: "2024-12-05T10:20:00Z",
  },
  {
    id: "rev-003",
    productId: "1",
    userId: "user-003",
    userName: "Carolina Méndez",
    rating: 4,
    comment:
      "Muy bonitos y elegantes. El único detalle es que al inicio estaban un poco ajustados, pero después de usarlos un par de veces se amoldaron perfectamente. Excelente inversión.",
    helpful: 25,
    createdAt: "2024-11-28T14:45:00Z",
  },

  // Reviews para Pump Beige Elegante (id: "2")
  {
    id: "rev-004",
    productId: "2",
    userId: "user-004",
    userName: "Isabel Torres",
    rating: 5,
    comment:
      "Perfectos para la oficina! El color beige combina con todo mi guardarropa. El tacón de 7cm es ideal: elegante pero cómodo para todo el día. Los recomiendo totalmente.",
    helpful: 56,
    createdAt: "2024-12-18T09:15:00Z",
  },
  {
    id: "rev-005",
    productId: "2",
    userId: "user-005",
    userName: "Patricia Silva",
    rating: 4,
    comment:
      "Me encantan! Son súper versátiles y cómodos. La única razón por la que no les doy 5 estrellas es porque esperaba que el beige fuera un tono más claro, pero igual son hermosos.",
    helpful: 38,
    createdAt: "2024-12-12T16:30:00Z",
  },

  // Reviews para Oxford Negro Formal (id: "3")
  {
    id: "rev-006",
    productId: "3",
    userId: "user-006",
    userName: "Roberto Castillo",
    rating: 5,
    comment:
      "Excelente calidad de cuero y acabados impecables. Los uso para el trabajo todos los días y siguen luciendo como nuevos después de 2 meses. Muy recomendables.",
    helpful: 67,
    createdAt: "2024-12-15T11:00:00Z",
  },
  {
    id: "rev-007",
    productId: "3",
    userId: "user-007",
    userName: "Javier Morales",
    rating: 5,
    comment:
      "Compré estos zapatos para mi boda y fueron la elección perfecta. Elegantes, cómodos y de calidad premium. El brillo del cuero es espectacular.",
    images: ["/reviews/oxford-wedding.jpg"],
    helpful: 44,
    createdAt: "2024-11-30T13:20:00Z",
  },
  {
    id: "rev-008",
    productId: "3",
    userId: "user-008",
    userName: "Carlos Vega",
    rating: 4,
    comment:
      "Muy buenos zapatos formales. La talla es correcta y la calidad es notable. Los uso frecuentemente para eventos corporativos.",
    helpful: 29,
    createdAt: "2024-11-22T18:45:00Z",
  },

  // Reviews para Vestido Negro de Cóctel (id: "5")
  {
    id: "rev-009",
    productId: "5",
    userId: "user-009",
    userName: "Valentina Castro",
    rating: 5,
    comment:
      "¡Me encantó! El corte es favorecedor y la tela tiene una caída hermosa. Lo usé en una cena de gala y me sentí muy elegante. Definitivamente vale cada sol.",
    images: ["/reviews/vestido-coctel-event.jpg"],
    helpful: 89,
    createdAt: "2024-12-19T20:10:00Z",
  },
  {
    id: "rev-010",
    productId: "5",
    userId: "user-010",
    userName: "Sofía Paredes",
    rating: 5,
    comment:
      "Perfecto para eventos especiales. La calidad del material es excelente y el largo es ideal. Pedí talla M y me quedó perfecto (mido 1.65m).",
    helpful: 72,
    createdAt: "2024-12-14T15:35:00Z",
  },
  {
    id: "rev-011",
    productId: "5",
    userId: "user-011",
    userName: "Andrea López",
    rating: 4,
    comment:
      "Muy bonito vestido, elegante y de buena calidad. Le doy 4 estrellas porque el cierre de la espalda es un poco delicado, hay que tener cuidado al ponérselo.",
    helpful: 34,
    createdAt: "2024-12-08T12:00:00Z",
  },

  // Reviews para Vestido Largo de Gala (id: "6")
  {
    id: "rev-012",
    productId: "6",
    userId: "user-012",
    userName: "Gabriela Flores",
    rating: 5,
    comment:
      "¡Espectacular! Lo compré para una boda y fue un éxito total. El color azul marino es precioso y los detalles de encaje son muy delicados. Me sentí como una princesa.",
    helpful: 94,
    createdAt: "2024-12-17T19:30:00Z",
  },
  {
    id: "rev-013",
    productId: "6",
    userId: "user-013",
    userName: "Daniela Ruiz",
    rating: 5,
    comment:
      "Hermoso vestido de gala. La caída es fluida y favorece mucho la figura. Lo recomiendo 100% para eventos elegantes.",
    helpful: 61,
    createdAt: "2024-12-11T14:20:00Z",
  },

  // Reviews para Blazer Negro Mujer (id: "9")
  {
    id: "rev-014",
    productId: "9",
    userId: "user-014",
    userName: "Laura Martínez",
    rating: 5,
    comment:
      "El blazer perfecto para la oficina. El corte entallado favorece mucho y los botones dorados le dan un toque muy elegante. Lo uso constantemente.",
    helpful: 78,
    createdAt: "2024-12-16T10:45:00Z",
  },
  {
    id: "rev-015",
    productId: "9",
    userId: "user-015",
    userName: "Carmen Díaz",
    rating: 5,
    comment:
      "Excelente calidad y ajuste. Lo compré en negro y azul marino. Ambos son perfectos para looks profesionales. Muy recomendable.",
    helpful: 52,
    createdAt: "2024-12-09T16:15:00Z",
  },
  {
    id: "rev-016",
    productId: "9",
    userId: "user-016",
    userName: "Mónica Herrera",
    rating: 4,
    comment:
      "Muy bonito blazer, favorece bastante. Solo sugeriría que incluyeran más información sobre el tallaje en la descripción.",
    helpful: 23,
    createdAt: "2024-11-25T11:30:00Z",
  },

  // Reviews para Cartera de Cuero Negra (id: "11")
  {
    id: "rev-017",
    productId: "11",
    userId: "user-017",
    userName: "Lucía Navarro",
    rating: 5,
    comment:
      "¡Me fascina! El cuero es genuino y de muy buena calidad. Los compartimentos internos están perfectamente organizados. Elegante y práctica.",
    helpful: 85,
    createdAt: "2024-12-20T13:40:00Z",
  },
  {
    id: "rev-018",
    productId: "11",
    userId: "user-018",
    userName: "Fernanda Reyes",
    rating: 5,
    comment:
      "Perfecta para uso diario o eventos. El tamaño es ideal y el asa dorada le da un toque muy sofisticado. Súper recomendada.",
    helpful: 67,
    createdAt: "2024-12-13T09:25:00Z",
  },

  // Reviews para Bolso Bandolera Elegante (id: "12")
  {
    id: "rev-019",
    productId: "12",
    userId: "user-019",
    userName: "Paola Sánchez",
    rating: 5,
    comment:
      "Hermoso bolso! La cadena dorada es de muy buena calidad y el tamaño es perfecto para salidas nocturnas. Cabe todo lo esencial sin ser muy grande.",
    helpful: 71,
    createdAt: "2024-12-18T17:50:00Z",
  },
  {
    id: "rev-020",
    productId: "12",
    userId: "user-020",
    userName: "Renata Campos",
    rating: 4,
    comment:
      "Muy bonito y práctico. La correa es ajustable lo cual es un plus. Lo uso tanto de día como de noche.",
    helpful: 45,
    createdAt: "2024-12-07T14:10:00Z",
  },

  // Reviews para Zapatillas Blancas Casual (id: "16")
  {
    id: "rev-021",
    productId: "16",
    userId: "user-021",
    userName: "Camila Ortiz",
    rating: 5,
    comment:
      "Las mejores zapatillas que he comprado! Súper cómodas y el diseño minimalista es perfecto. Las uso todos los días y siguen impecables.",
    helpful: 102,
    createdAt: "2024-12-19T08:30:00Z",
  },
  {
    id: "rev-022",
    productId: "16",
    userId: "user-022",
    userName: "Natalia Vargas",
    rating: 5,
    comment:
      "Me encantan! Son versátiles, cómodas y combinan con todo. El interior acolchado hace que puedas caminar todo el día sin molestias.",
    helpful: 88,
    createdAt: "2024-12-15T12:15:00Z",
  },
  {
    id: "rev-023",
    productId: "16",
    userId: "user-023",
    userName: "Valeria Guzmán",
    rating: 4,
    comment:
      "Muy buenas zapatillas casuales. Recomiendo pedir media talla más si tienes el pie ancho.",
    helpful: 56,
    createdAt: "2024-12-10T16:40:00Z",
  },

  // Reviews para Sandalias de Tacón Doradas (id: "17")
  {
    id: "rev-024",
    productId: "17",
    userId: "user-024",
    userName: "Melissa Torres",
    rating: 5,
    comment:
      "¡Divinas! Las usé en una fiesta y fueron el centro de atención. El acabado dorado es espectacular y son más cómodas de lo que esperaba.",
    images: ["/reviews/sandalias-doradas-party.jpg"],
    helpful: 79,
    createdAt: "2024-12-16T21:00:00Z",
  },
  {
    id: "rev-025",
    productId: "17",
    userId: "user-025",
    userName: "Diana Medina",
    rating: 4,
    comment:
      "Hermosas sandalias para eventos especiales. El tacón alto requiere práctica pero valen totalmente la pena.",
    helpful: 43,
    createdAt: "2024-12-11T19:25:00Z",
  },

  // Reviews para Botas Chelsea Hombre (id: "19")
  {
    id: "rev-026",
    productId: "19",
    userId: "user-026",
    userName: "Andrés Rojas",
    rating: 5,
    comment:
      "Excelentes botas Chelsea. El cuero es de primera calidad y son muy cómodas desde el primer uso. Las uso tanto con jeans como con pantalones formales.",
    helpful: 91,
    createdAt: "2024-12-14T10:20:00Z",
  },
  {
    id: "rev-027",
    productId: "19",
    userId: "user-027",
    userName: "Miguel Ángel Pérez",
    rating: 5,
    comment:
      "Perfectas! El diseño clásico nunca pasa de moda y la calidad del cuero es evidente. Muy recomendables.",
    helpful: 64,
    createdAt: "2024-12-08T15:45:00Z",
  },

  // Reviews para Vestido Midi Floral (id: "21")
  {
    id: "rev-028",
    productId: "21",
    userId: "user-028",
    userName: "Rocío Jiménez",
    rating: 5,
    comment:
      "¡Precioso! El estampado floral es delicado y romántico. Lo usé en un baby shower y recibí muchos cumplidos. El corte favorece mucho.",
    helpful: 76,
    createdAt: "2024-12-20T11:30:00Z",
  },
  {
    id: "rev-029",
    productId: "21",
    userId: "user-029",
    userName: "Alejandra Cruz",
    rating: 5,
    comment:
      "Hermoso vestido para primavera-verano. La tela es fresca y la manga 3/4 es perfecta. Me encantó!",
    helpful: 58,
    createdAt: "2024-12-17T14:00:00Z",
  },

  // Reviews para Vestido Ajustado Rojo (id: "22")
  {
    id: "rev-030",
    productId: "22",
    userId: "user-030",
    userName: "Vanessa Moreno",
    rating: 5,
    comment:
      "¡Espectacular! El color rojo es vibrante y el corte bodycon realza la figura sin ser incómodo. Perfecto para una noche especial.",
    helpful: 95,
    createdAt: "2024-12-12T20:15:00Z",
  },
];

// Función helper para obtener reviews de un producto
export function getProductReviews(productId: string): ProductReview[] {
  return reviews.filter((review) => review.productId === productId);
}

// Función helper para calcular rating promedio
export function getAverageRating(productId: string): number {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;

  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / productReviews.length;
}

// Función helper para obtener el conteo de reviews por rating
export function getReviewCountByRating(productId: string): {
  [key: number]: number;
} {
  const productReviews = getProductReviews(productId);
  const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  productReviews.forEach((review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
  });

  return counts;
}
