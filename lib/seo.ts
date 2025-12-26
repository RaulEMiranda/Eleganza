// lib/seo.ts

import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/constants";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
}

/**
 * Genera metadata optimizada para SEO
 */
export function generateMetadata({
  title,
  description = SITE_DESCRIPTION,
  keywords = [],
  image = `${SITE_URL}/og-image.jpg`,
  url = SITE_URL,
  type = "website",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SITE_NAME }],
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: "es_PE",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@eleganza",
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Genera metadata para producto
 */
export function generateProductMetadata({
  name,
  description,
  price,
  image,
  slug,
  category,
  inStock,
}: {
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  inStock: boolean;
}): Metadata {
  const url = `${SITE_URL}/producto/${slug}`;

  return {
    ...generateMetadata({
      title: name,
      description,
      image,
      url,
      type: "product",
      keywords: [name, category, "comprar", "elegante", "moda"],
    }),
    openGraph: {
      type: "product",
      title: name,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 1200,
          alt: name,
        },
      ],
      locale: "es_PE",
    },
    other: {
      "product:price:amount": price.toString(),
      "product:price:currency": "PEN",
      "product:availability": inStock ? "in stock" : "out of stock",
      "product:category": category,
    },
  };
}

/**
 * Genera metadata para categoría
 */
export function generateCategoryMetadata({
  name,
  description,
  slug,
  image,
}: {
  name: string;
  description: string;
  slug: string;
  image: string;
}): Metadata {
  const url = `${SITE_URL}/categoria/${slug}`;

  return generateMetadata({
    title: name,
    description,
    image,
    url,
    keywords: [name, "comprar", "elegante", "moda", "colección"],
  });
}

/**
 * Genera breadcrumbs estructurados para SEO
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Genera schema de producto para SEO
 */
export function generateProductSchema({
  name,
  description,
  price,
  image,
  url,
  sku,
  brand = SITE_NAME,
  rating,
  reviewCount,
  inStock,
}: {
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
  sku: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "PEN",
      price: price.toString(),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };

  if (rating && reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

/**
 * Genera schema de organización para SEO
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/eleganza",
      "https://www.instagram.com/eleganza",
      "https://www.tiktok.com/@eleganza",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-999-999-999",
      contactType: "Customer Service",
      areaServed: "PE",
      availableLanguage: "Spanish",
    },
  };
}

/**
 * Genera robots.txt dinámico
 */
export function generateRobotsTxt(): string {
  return `
User-agent: *
Allow: /
Disallow: /cuenta/
Disallow: /checkout/
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
  `.trim();
}
