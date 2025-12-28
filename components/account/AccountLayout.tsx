// components/account/AccountLayout.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  User,
  MapPin,
  Package,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

interface AccountLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: "Mi Perfil",
    href: "/cuenta/perfil",
    icon: User,
    description: "Información personal",
  },
  {
    name: "Direcciones",
    href: "/cuenta/direcciones",
    icon: MapPin,
    description: "Gestionar direcciones",
  },
  {
    name: "Mis Pedidos",
    href: "/cuenta/pedidos",
    icon: Package,
    description: "Historial de compras",
  },
  {
    name: "Lista de Deseos",
    href: "/lista-deseos",
    icon: Heart,
    description: "Productos guardados",
  },
];

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-elegant py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Mi Cuenta</h1>
          <p className="text-gray-600">
            Bienvenido, {user?.firstName || "Usuario"}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 sticky top-24">
              {/* User Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user?.displayName}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/");
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 mb-1 transition-elegant group",
                        isActive ? "bg-black text-white" : "hover:bg-gray-100"
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            isActive ? "text-white" : "text-black"
                          )}
                        >
                          {item.name}
                        </p>
                        <p
                          className={cn(
                            "text-xs",
                            isActive ? "text-gray-300" : "text-gray-500"
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform group-hover:translate-x-1",
                          isActive ? "text-white" : "text-gray-400"
                        )}
                      />
                    </Link>
                  );
                })}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-4 border-t border-gray-200 text-red-600 hover:bg-red-50 transition-elegant"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Cerrar Sesión</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white border border-gray-200 min-h-150">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
