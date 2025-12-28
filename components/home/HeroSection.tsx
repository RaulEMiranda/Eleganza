// components/home/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
  textPosition: "left" | "center" | "right";
  theme: "light" | "dark";
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Elegancia Redefinida",
    subtitle: "Nueva Colección 2025",
    description: "Descubre las últimas tendencias en moda sofisticada",
    cta: "Explorar Colección",
    ctaLink: "/categoria/zapatos-mujer",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop",
    textPosition: "left",
    theme: "light",
  },
  {
    id: 2,
    title: "Estilo Atemporal",
    subtitle: "Esenciales de Temporada",
    description: "Piezas clásicas que nunca pasan de moda",
    cta: "Ver Productos",
    ctaLink: "/productos",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop",
    textPosition: "center",
    theme: "dark",
  },
  {
    id: 3,
    title: "Ofertas Exclusivas",
    subtitle: "Hasta 40% de Descuento",
    description: "Aprovecha nuestras promociones especiales",
    cta: "Ver Ofertas",
    ctaLink: "/categoria/zapatos-mujer",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop",
    textPosition: "right",
    theme: "light",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-125 md:h-150 lg:h-175 overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div
              className={`absolute inset-0 ${
                s.theme === "dark" ? "bg-black/40" : "bg-white/20"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full container-elegant">
        <div
          className={`h-full flex items-center ${
            slide.textPosition === "left"
              ? "justify-start"
              : slide.textPosition === "right"
              ? "justify-end"
              : "justify-center"
          }`}
        >
          <div
            className={`max-w-2xl ${
              slide.textPosition === "center" ? "text-center" : ""
            } ${
              slide.textPosition === "right" ? "text-right" : ""
            } animate-slideUp`}
          >
            <p
              className={`text-sm md:text-base font-medium tracking-wider mb-4 ${
                slide.theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {slide.subtitle}
            </p>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight ${
                slide.theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {slide.title}
            </h1>
            <p
              className={`text-base md:text-lg mb-8 max-w-lg ${
                slide.theme === "dark" ? "text-gray-200" : "text-gray-700"
              } ${slide.textPosition === "center" ? "mx-auto" : ""} ${
                slide.textPosition === "right" ? "ml-auto" : ""
              }`}
            >
              {slide.description}
            </p>
            <Link
              href={slide.ctaLink}
              className={`inline-block px-8 py-4 font-medium transition-elegant ${
                slide.theme === "dark"
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white flex items-center justify-center transition-elegant backdrop-blur-sm z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white flex items-center justify-center transition-elegant backdrop-blur-sm z-10"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-elegant ${
              index === currentSlide
                ? "w-12 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
