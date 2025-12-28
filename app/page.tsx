// app/page.tsx
"use client";

import BannerPromo from "@/components/home/BannerPromo";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/components/home/NewArrivals";
import Newsletter from "@/components/home/Newlestter";
import Testimonials from "@/components/home/Testimonials";
import TrustBadges from "@/components/home/TrustBadges";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Banner principal */}
      <HeroSection />

      {/* Trust Badges - Envío gratis, devoluciones, etc. */}
      <TrustBadges />

      {/* Featured Categories - Categorías destacadas */}
      <FeaturedCategories />

      {/* Featured Products - Productos destacados */}
      <FeaturedProducts />

      {/* Banner Promo - Banner de promoción entre secciones */}
      <BannerPromo />

      {/* New Arrivals - Nuevos productos */}
      <NewArrivals />

      {/* Testimonials - Reseñas de clientes */}
      <Testimonials />

      {/* Newsletter - Suscripción al newsletter */}
      <Newsletter />
    </main>
  );
}
