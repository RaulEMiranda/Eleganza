// components/checkout/ShippingForm.tsx
"use client";

import { useState } from "react";
import { User, Address } from "@/types/user";
import { MapPin } from "lucide-react";

interface ShippingFormProps {
  user: User | null;
  onSubmit: (address: Address) => void;
  initialAddress?: Address | null;
  useSameAddress: boolean;
  onUseSameAddressChange: (value: boolean) => void;
}

export default function ShippingForm({
  user,
  onSubmit,
  initialAddress,
  useSameAddress,
  onUseSameAddressChange,
}: ShippingFormProps) {
  const [formData, setFormData] = useState<Partial<Address>>(
    initialAddress || {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Perú",
      type: "shipping",
      isDefault: false,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }
    if (!formData.address1?.trim()) {
      newErrors.address1 = "La dirección es requerida";
    }
    if (!formData.city?.trim()) {
      newErrors.city = "La ciudad es requerida";
    }
    if (!formData.state?.trim()) {
      newErrors.state = "El departamento es requerido";
    }
    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = "El código postal es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const address: Address = {
      id: initialAddress?.id || `addr_${Date.now()}`,
      userId: user?.id || "",
      type: "shipping",
      isDefault: formData.isDefault || false,
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      company: formData.company,
      address1: formData.address1!,
      address2: formData.address2,
      city: formData.city!,
      state: formData.state!,
      zipCode: formData.zipCode!,
      country: formData.country || "Perú",
      phone: formData.phone!,
    };

    onSubmit(address);
  };

  // Departamentos de Perú
  const peruDepartments = [
    "Lima",
    "Arequipa",
    "La Libertad",
    "Piura",
    "Lambayeque",
    "Cusco",
    "Junín",
    "Puno",
    "Ica",
    "Cajamarca",
    "Áncash",
    "Huánuco",
    "Ayacucho",
    "Loreto",
    "San Martín",
    "Ucayali",
    "Tacna",
    "Moquegua",
    "Amazonas",
    "Apurímac",
    "Huancavelica",
    "Madre de Dios",
    "Pasco",
    "Tumbes",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Usar dirección guardada */}
      {user && user.addresses.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Direcciones guardadas
              </p>
              <div className="space-y-2">
                {user.addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className="flex items-start gap-3 p-3 bg-white border border-blue-200 cursor-pointer hover:border-blue-400 transition-elegant"
                  >
                    <input
                      type="radio"
                      name="savedAddress"
                      onChange={() => {
                        setFormData({
                          ...addr,
                          type: "shipping",
                        });
                      }}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-black">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="text-gray-600">{addr.address1}</p>
                      {addr.address2 && (
                        <p className="text-gray-600">{addr.address2}</p>
                      )}
                      <p className="text-gray-600">
                        {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                      <p className="text-gray-600">{addr.phone}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Información Personal */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Apellido <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Empresa (Opcional)
        </label>
        <input
          type="text"
          name="company"
          value={formData.company || ""}
          onChange={handleChange}
          placeholder="Nombre de empresa"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="+51 999 999 999"
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Dirección <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="address1"
          value={formData.address1 || ""}
          onChange={handleChange}
          placeholder="Calle, número, avenida"
          className={errors.address1 ? "border-red-500" : ""}
        />
        {errors.address1 && (
          <p className="text-sm text-red-600 mt-1">{errors.address1}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Apartamento, suite, etc. (Opcional)
        </label>
        <input
          type="text"
          name="address2"
          value={formData.address2 || ""}
          onChange={handleChange}
          placeholder="Piso, departamento, oficina"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Ciudad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <p className="text-sm text-red-600 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Departamento <span className="text-red-500">*</span>
          </label>
          <select
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            className={errors.state ? "border-red-500" : ""}
          >
            <option value="">Seleccionar</option>
            {peruDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-sm text-red-600 mt-1">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Código Postal <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode || ""}
            onChange={handleChange}
            placeholder="15001"
            className={errors.zipCode ? "border-red-500" : ""}
          />
          {errors.zipCode && (
            <p className="text-sm text-red-600 mt-1">{errors.zipCode}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">País</label>
        <input
          type="text"
          name="country"
          value={formData.country || "Perú"}
          disabled
          className="bg-gray-100"
        />
      </div>

      {/* Usar misma dirección para facturación */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={useSameAddress}
            onChange={(e) => onUseSameAddressChange(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">
            Usar la misma dirección para facturación
          </span>
        </label>
      </div>

      {/* Guardar dirección */}
      {user && (
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDefault || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isDefault: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <span className="text-sm">
              Guardar esta dirección para futuras compras
            </span>
          </label>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant"
      >
        Continuar a Método de Pago
      </button>
    </form>
  );
}
