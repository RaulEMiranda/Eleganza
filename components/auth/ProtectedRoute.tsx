// components/auth/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, _hasHydrated } = useAuthStore();

  useEffect(() => {
    // Solo redirigir si:
    // 1. Ya se hidrato el store desde localStorage
    // 2. No está cargando
    // 3. No está autenticado
    if (_hasHydrated && !isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [_hasHydrated, isAuthenticated, isLoading, router]);

  // Mostrar loader mientras:
  // 1. No se ha hidratado el store
  // 2. O está verificando la autenticación
  if (!_hasHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-black mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya se está redirigiendo)
  if (!isAuthenticated) {
    return null;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}
