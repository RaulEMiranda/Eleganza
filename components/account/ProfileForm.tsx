// components/account/ProfileForm.tsx
"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { User as UserIcon, Mail, Phone, Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const { user } = useAuthStore();
  const { updateProfile, isUpdating } = useUserStore();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Usuario no autenticado");
      return;
    }

    // Validaciones
    if (!formData.firstName.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    if (!formData.lastName.trim()) {
      toast.error("El apellido es requerido");
      return;
    }

    try {
      await updateProfile(user.id, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || undefined,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <Input
          label="Nombre"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="Juan"
        />

        {/* Apellido */}
        <Input
          label="Apellido"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Pérez"
        />
      </div>

      {/* Email (Solo lectura) */}
      <Input
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        disabled
        helperText="El correo electrónico no se puede modificar"
      />

      {/* Teléfono */}
      <Input
        label="Teléfono"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+51 999 999 999"
      />

      {/* Botones */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isUpdating}
          className="flex-1 bg-black text-white py-3 px-6 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-elegant flex items-center justify-center gap-2"
        >
          {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
          {isUpdating ? "Guardando..." : "Guardar Cambios"}
        </button>
        <button
          type="button"
          onClick={() => {
            setFormData({
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              email: user?.email || "",
              phone: user?.phone || "",
            });
          }}
          className="px-6 py-3 border border-gray-300 hover:bg-gray-50 transition-elegant"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
