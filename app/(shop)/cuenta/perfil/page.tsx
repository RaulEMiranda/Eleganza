// app/(shop)/cuenta/perfil/page.tsx

import { Metadata } from "next";
import AccountLayout from "@/components/account/AccountLayout";
import ProfileForm from "@/components/account/ProfileForm";

export const metadata: Metadata = {
  title: "Mi Perfil - Eleganza",
  description: "Gestiona tu información personal",
};

export default function ProfilePage() {
  return (
    <AccountLayout>
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-light mb-2">Información Personal</h2>
          <p className="text-gray-600">
            Actualiza tu información de contacto y datos personales
          </p>
        </div>

        <ProfileForm />
      </div>
    </AccountLayout>
  );
}
