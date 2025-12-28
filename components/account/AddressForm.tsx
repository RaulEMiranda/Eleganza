// components/account/AddressForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Address } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface AddressFormProps {
  address?: Address;
  onClose: () => void;
  onSuccess?: () => void;
}

const PERU_DEPARTMENTS = [
  "Lima",
  "Arequipa",
  "Cusco",
  "La Libertad",
  "Piura",
  "Lambayeque",
  "Junín",
  "Puno",
  "Ica",
  "Ancash",
  "Cajamarca",
  "Loreto",
  "Huánuco",
  "Ucayali",
  "San Martín",
  "Ayacucho",
  "Tacna",
  "Madre de Dios",
  "Amazonas",
  "Apurímac",
  "Huancavelica",
  "Moquegua",
  "Pasco",
  "Tumbes",
  "Callao",
];

export default function AddressForm({
  address,
  onClose,
  onSuccess,
}: AddressFormProps) {
  const { user } = useAuthStore();
  const { addAddress, updateAddress, isUpdating } = useUserStore();

  const [formData, setFormData] = useState({
    type: (address?.type || "shipping") as "shipping" | "billing",
    isDefault: address?.isDefault || false,
    firstName: address?.firstName || "",
    lastName: address?.lastName || "",
    company: address?.company || "",
    address1: address?.address1 || "",
    address2: address?.address2 || "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    country: address?.country || "Perú",
    phone: address?.phone || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Usuario no autenticado");
      return;
    }

    // Validaciones
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("Nombre y apellido son requeridos");
      return;
    }

    if (!formData.address1.trim()) {
      toast.error("La dirección es requerida");
      return;
    }

    if (
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zipCode.trim()
    ) {
      toast.error("Ciudad, departamento y código postal son requeridos");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("El teléfono es requerido");
      return;
    }

    try {
      if (address) {
        // Actualizar dirección existente
        await updateAddress(user.id, address.id, formData);
      } else {
        // Crear nueva dirección
        await addAddress(user.id, formData);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-light">
            {address ? "Editar Dirección" : "Nueva Dirección"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-elegant"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de dirección */}
          <div className="flex gap-4">
            <label className="flex-1">
              <input
                type="radio"
                name="type"
                value="shipping"
                checked={formData.type === "shipping"}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium">Dirección de Envío</span>
            </label>
            <label className="flex-1">
              <input
                type="radio"
                name="type"
                value="billing"
                checked={formData.type === "billing"}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium">
                Dirección de Facturación
              </span>
            </label>
          </div>

          {/* Nombre y Apellido */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2"
              >
                Nombre <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2"
              >
                Apellido <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
              />
            </div>
          </div>

          {/* Empresa (opcional) */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Empresa (opcional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
            />
          </div>

          {/* Dirección */}
          <div>
            <label
              htmlFor="address1"
              className="block text-sm font-medium mb-2"
            >
              Dirección <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              required
              placeholder="Calle, número, piso, depto."
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
            />
          </div>

          {/* Dirección 2 */}
          <div>
            <label
              htmlFor="address2"
              className="block text-sm font-medium mb-2"
            >
              Dirección 2 (opcional)
            </label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Referencia, edificio, etc."
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
            />
          </div>

          {/* Ciudad, Departamento, Código Postal */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                Ciudad <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-2">
                Departamento <span className="text-red-600">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
              >
                <option value="">Seleccionar</option>
                {PERU_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium mb-2"
              >
                Código Postal <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
              />
            </div>
          </div>

          {/* País y Teléfono */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-2"
              >
                País <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                disabled
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Teléfono <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+51 999 999 999"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-elegant"
              />
            </div>
          </div>

          {/* Establecer como predeterminada */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm">
              Establecer como dirección predeterminada
            </span>
          </label>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 bg-black text-white py-3 px-6 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-elegant flex items-center justify-center gap-2"
            >
              {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
              {isUpdating ? "Guardando..." : address ? "Actualizar" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 hover:bg-gray-50 transition-elegant"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
