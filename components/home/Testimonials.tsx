// components/home/Testimonials.tsx
"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    role: "Cliente Frecuente",
    rating: 5,
    comment:
      "Eleganza es mi tienda favorita. La calidad de sus productos es excepcional y el servicio al cliente es inmejorable. Cada compra es una experiencia única.",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Empresario",
    rating: 5,
    comment:
      "Excelente selección de ropa formal. He encontrado los mejores trajes para mis reuniones importantes. La atención personalizada es lo que más valoro.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Andrea Silva",
    role: "Diseñadora",
    rating: 5,
    comment:
      "Como diseñadora, aprecio mucho la calidad y el estilo de las prendas de Eleganza. Siempre encuentro piezas únicas que complementan mi guardarropa perfectamente.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "Roberto Vargas",
    role: "Ejecutivo",
    rating: 4,
    comment:
      "Gran variedad de productos y excelente relación calidad-precio. El proceso de compra es muy sencillo y los envíos siempre llegan a tiempo.",
    image: "https://i.pravatar.cc/150?img=14",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="container-elegant">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 lg:p-12 shadow-elegant relative">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-200" />

            {/* Content */}
            <div className="relative">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-lg lg:text-xl text-center text-gray-700 mb-8 leading-relaxed italic">
                "{currentTestimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 border-2 border-gray-300 hover:border-black flex items-center justify-center transition-elegant"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-elegant ${
                      index === currentIndex
                        ? "w-8 h-2 bg-black"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Ir a testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 border-2 border-gray-300 hover:border-black flex items-center justify-center transition-elegant"
                aria-label="Testimonio siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
