// components/products/ProductReviews.tsx
"use client";

import { useState } from "react";
import { Star, ThumbsUp, Filter } from "lucide-react";
import { ProductReview } from "@/types/product";

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">(
    "recent"
  );
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Calcular distribución de ratings
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    stars: rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }));

  // Filtrar y ordenar reviews
  let filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  filteredReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-8">
      {/* Resumen de ratings */}
      <div className="grid md:grid-cols-2 gap-8 pb-8 border-b">
        {/* Rating promedio */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-light mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating)
                    ? "fill-black text-black"
                    : "text-neutral-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-neutral-600">
            Basado en {totalReviews} opiniones
          </p>
        </div>

        {/* Distribución de ratings */}
        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <button
              key={stars}
              onClick={() =>
                setFilterRating(filterRating === stars ? null : stars)
              }
              className={`
                w-full flex items-center gap-3 hover:bg-neutral-50 p-2 transition-colors
                ${filterRating === stars ? "bg-neutral-100" : ""}
              `}
            >
              <span className="text-sm font-medium w-12">{stars} ★</span>
              <div className="flex-1 h-2 bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-black transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-neutral-600 w-12 text-right">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Controles de filtrado y ordenamiento */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-600" />
          <span className="text-sm font-medium">
            {filterRating
              ? `Filtrando por ${filterRating} estrellas`
              : "Todas las opiniones"}
          </span>
          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="text-sm text-neutral-600 hover:text-black underline"
            >
              Limpiar filtro
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border border-neutral-300 text-sm focus:outline-none focus:border-black"
        >
          <option value="recent">Más recientes</option>
          <option value="helpful">Más útiles</option>
          <option value="rating">Mejor valoradas</option>
        </select>
      </div>

      {/* Lista de reviews */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <p className="text-center text-neutral-600 py-8">
            No hay opiniones para mostrar con los filtros seleccionados.
          </p>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              {/* Header del review */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.userName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-black text-black"
                              : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">
                      {new Date(review.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comentario */}
              <p className="text-neutral-700 leading-relaxed mb-3">
                {review.comment}
              </p>

              {/* Imágenes de review si existen */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review imagen ${idx + 1}`}
                      className="w-20 h-20 object-cover border"
                    />
                  ))}
                </div>
              )}

              {/* Acciones */}
              <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Útil ({review.helpful})</span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Botón para escribir opinión */}
      <div className="text-center pt-8 border-t">
        <button className="px-8 py-3 bg-black text-white hover:bg-neutral-800 transition-colors">
          Escribir una opinión
        </button>
      </div>
    </div>
  );
}
