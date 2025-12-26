// app/(auth)/registro/page.tsx
import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Crear Cuenta",
  description:
    "Crea tu cuenta en Eleganza y disfruta de una experiencia de compra única",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <RegisterForm />
    </div>
  );
}
