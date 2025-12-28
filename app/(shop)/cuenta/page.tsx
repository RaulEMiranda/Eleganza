// app/(shop)/cuenta/page.tsx
"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  useEffect(() => {
    // Redirigir a /cuenta/perfil por defecto
    redirect("/cuenta/perfil");
  }, []);

  return null;
}
