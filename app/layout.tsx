import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";

// Fuente principal - Inter (moderna y legible)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fuente para títulos - Playfair Display (elegante y sofisticada)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eleganza - Moda Elegante y Sofisticada",
    template: "%s | Eleganza",
  },
  description:
    "Descubre las últimas tendencias en moda elegante. Ropa, accesorios y más con envío a todo Perú. Estilo y calidad en cada prenda.",
  keywords: [
    "moda",
    "ropa elegante",
    "tienda online",
    "fashion",
    "Perú",
    "vestidos",
    "accesorios",
    "estilo",
  ],
  authors: [{ name: "Eleganza" }],
  creator: "Eleganza",
  publisher: "Eleganza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://eleganza.com"), // Cambia por tu URL real
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://eleganza.com",
    siteName: "Eleganza",
    title: "Eleganza - Moda Elegante y Sofisticada",
    description:
      "Descubre las últimas tendencias en moda elegante. Ropa, accesorios y más con envío a todo Perú.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eleganza - Tienda de Moda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleganza - Moda Elegante y Sofisticada",
    description:
      "Descubre las últimas tendencias en moda elegante. Ropa, accesorios y más con envío a todo Perú.",
    images: ["/og-image.jpg"],
    creator: "@eleganza",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-black flex flex-col min-h-screen`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
