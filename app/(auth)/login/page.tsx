// app/(auth)/login/page.tsx
import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Iniciar Sesión",
  description: "Inicia sesión en tu cuenta de Eleganza",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <LoginForm />
    </div>
  );
}
