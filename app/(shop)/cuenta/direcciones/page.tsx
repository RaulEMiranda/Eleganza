// app/(shop)/cuenta/direcciones/page.tsx
"use client";

import { useState } from "react";
import { Metadata } from "next";
import AccountLayout from "@/components/account/AccountLayout";
import AddressCard from "@/components/account/AddressCard";
import AddressForm from "@/components/account/AddressForm";
import { useAuthStore } from "@/store/useAuthStore";
import { Plus, MapPin } from "lucide-react";
import { Address } from "@/types/user";

export default function AddressesPage() {
  const { user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingAddress(undefined);
  };

  return (
    <AccountLayout>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-light mb-2">Mis Direcciones</h2>
            <p className="text-gray-600">
              Gestiona tus direcciones de envío y facturación
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-elegant"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Nueva Dirección</span>
          </button>
        </div>

        {user?.addresses && user.addresses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {user.addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-300">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              No tienes direcciones guardadas
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-elegant"
            >
              <Plus className="w-5 h-5" />
              Agregar Primera Dirección
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <AddressForm address={editingAddress} onClose={handleClose} />
      )}
    </AccountLayout>
  );
}
