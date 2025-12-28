// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Search, Menu, Heart, LogOut } from "lucide-react";
import { SITE_NAME } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();

  // Evitar hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const cartItemCount = isMounted ? getItemCount() : 0;

  return (
    <>
      {/* Top Bar - Anuncio */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p>Envío gratis en compras mayores a S/. 200</p>
      </div>

      {/* Header Principal */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-elegant">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-8">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 transition-elegant"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="text-2xl font-serif font-bold tracking-tight"
              >
                {SITE_NAME}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Navigation />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 transition-elegant"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/lista-deseos"
                className="hidden sm:block p-2 hover:bg-gray-100 transition-elegant rounded-md"
                aria-label="Lista de deseos"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Account */}
              <div className="relative">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="p-2 hover:bg-gray-100 transition-elegant rounded-md flex items-center gap-2"
                      aria-label="Mi cuenta"
                    >
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-6 h-6 object-cover rounded-full"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                      <span className="hidden md:block text-sm font-medium">
                        {user?.firstName || "Mi Cuenta"}
                      </span>
                    </button>

                    {/* User Dropdown */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-elegant-lg animate-fadeIn">
                        <div className="p-4 border-b border-gray-200">
                          <p className="text-sm font-medium text-black">
                            {user?.displayName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/cuenta"
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-elegant"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Mi Cuenta
                          </Link>
                          <Link
                            href="/cuenta/pedidos"
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-elegant"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Mis Pedidos
                          </Link>
                          <Link
                            href="/lista-deseos"
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-elegant"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Lista de Deseos
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-elegant flex items-center gap-2 text-red-600"
                          >
                            <LogOut className="w-4 h-4" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex p-2 hover:bg-gray-100 transition-elegant rounded-md"
                    aria-label="Iniciar sesión"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 transition-elegant rounded-md"
                aria-label="Carrito de compras"
              >
                <ShoppingBag className="w-5 h-5" />
                {/* Badge de cantidad */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
