// components/account/AddressCard.tsx
"use client";

import { Address } from "@/types/user";
import { Edit2, Trash2, Check } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
}

export default function AddressCard({ address, onEdit }: AddressCardProps) {
  const { user } = useAuthStore();
  const { deleteAddress, setDefaultAddress, isUpdating } = useUserStore();

  const handleDelete = async () => {
    if (!user) return;

    if (confirm("¿Estás seguro de eliminar esta dirección?")) {
      await deleteAddress(user.id, address.id);
    }
  };

  const handleSetDefault = async () => {
    if (!user || address.isDefault) return;
    await setDefaultAddress(user.id, address.id);
  };

  return (
    <div
      className={`
      relative p-6 border-2 transition-elegant
      ${
        address.isDefault
          ? "border-black bg-gray-50"
          : "border-gray-200 hover:border-gray-300"
      }
    `}
    >
      {/* Badge de dirección predeterminada */}
      {address.isDefault && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 text-xs font-medium">
            <Check className="w-3 h-3" />
            Predeterminada
          </span>
        </div>
      )}

      {/* Tipo de dirección */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-white border border-gray-300 text-xs font-medium uppercase tracking-wide">
          {address.type === "shipping" ? "Envío" : "Facturación"}
        </span>
      </div>

      {/* Información */}
      <div className="space-y-2 mb-4">
        <p className="font-medium">
          {address.firstName} {address.lastName}
        </p>
        {address.company && (
          <p className="text-sm text-gray-600">{address.company}</p>
        )}
        <p className="text-sm text-gray-600">{address.address1}</p>
        {address.address2 && (
          <p className="text-sm text-gray-600">{address.address2}</p>
        )}
        <p className="text-sm text-gray-600">
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p className="text-sm text-gray-600">{address.country}</p>
        <p className="text-sm text-gray-600">{address.phone}</p>
      </div>

      {/* Acciones */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        {!address.isDefault && (
          <button
            onClick={handleSetDefault}
            disabled={isUpdating}
            className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition-elegant text-sm"
          >
            Hacer predeterminada
          </button>
        )}
        <button
          onClick={() => onEdit(address)}
          disabled={isUpdating}
          className="p-2 border border-gray-300 hover:bg-gray-100 transition-elegant"
          aria-label="Editar"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isUpdating || address.isDefault}
          className="p-2 border border-gray-300 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 transition-elegant"
          aria-label="Eliminar"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
}
