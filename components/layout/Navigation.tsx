// components/layout/Navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Nuevos", href: "/productos/nuevos" },
  { label: "Mujer", href: "/categoria/zapatos-mujer" },
  { label: "Hombre", href: "/categoria/zapatos-hombre" },
  { label: "Ofertas", href: "/ofertas" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium tracking-wide uppercase transition-elegant relative",
              "hover:text-gray-600",
              isActive ? "text-black" : "text-gray-700"
            )}
          >
            {item.label}
            {/* Underline activo */}
            {isActive && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
