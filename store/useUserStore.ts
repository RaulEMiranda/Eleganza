// store/useUserStore.ts
"use client";

import { create } from "zustand";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User, Address } from "@/types/user";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

interface UserStore {
  isUpdating: boolean;

  // Acciones
  updateProfile: (userId: string, data: Partial<User>) => Promise<void>;
  addAddress: (
    userId: string,
    address: Omit<Address, "id" | "userId">
  ) => Promise<void>;
  updateAddress: (
    userId: string,
    addressId: string,
    data: Partial<Address>
  ) => Promise<void>;
  deleteAddress: (userId: string, addressId: string) => Promise<void>;
  setDefaultAddress: (userId: string, addressId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  isUpdating: false,

  // Actualizar perfil de usuario
  updateProfile: async (userId: string, data: Partial<User>) => {
    try {
      set({ isUpdating: true });

      const userRef = doc(db, "users", userId);

      const updateData: Partial<User> & { updatedAt: string } = {
        updatedAt: new Date().toISOString(),
      };

      if (data.firstName) updateData.firstName = data.firstName;
      if (data.lastName) updateData.lastName = data.lastName;
      if (data.phone !== undefined) updateData.phone = data.phone;

      await updateDoc(userRef, updateData);

      // Actualizar el estado de auth
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        useAuthStore.setState({
          user: {
            ...currentUser,
            ...data,
            displayName:
              data.firstName && data.lastName
                ? `${data.firstName} ${data.lastName}`
                : currentUser.displayName,
            updatedAt: new Date().toISOString(),
          },
        });
      }

      toast.success("Perfil actualizado exitosamente");
      set({ isUpdating: false });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error al actualizar el perfil");
      set({ isUpdating: false });
      throw error;
    }
  },

  // Agregar nueva dirección
  addAddress: async (
    userId: string,
    addressData: Omit<Address, "id" | "userId">
  ) => {
    try {
      set({ isUpdating: true });

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado");
      }

      const userData = userDoc.data();
      const currentAddresses = (userData.addresses || []) as Address[];

      // Generar ID único para la dirección
      const newAddressId = `addr-${Date.now()}`;

      const newAddress: Address = {
        ...addressData,
        id: newAddressId,
        userId,
      };

      // Si es la primera dirección o se marca como default, hacerla default
      const isFirstAddress = currentAddresses.length === 0;
      if (isFirstAddress || addressData.isDefault) {
        // Quitar el default de las demás
        currentAddresses.forEach((addr: Address) => {
          addr.isDefault = false;
        });
        newAddress.isDefault = true;
      }

      const updatedAddresses = [...currentAddresses, newAddress];

      await updateDoc(userRef, {
        addresses: updatedAddresses,
        defaultAddressId: newAddress.isDefault
          ? newAddressId
          : userData.defaultAddressId,
        updatedAt: new Date().toISOString(),
      });

      // Actualizar estado de auth
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        useAuthStore.setState({
          user: {
            ...currentUser,
            addresses: updatedAddresses,
            defaultAddressId: newAddress.isDefault
              ? newAddressId
              : currentUser.defaultAddressId,
            updatedAt: new Date().toISOString(),
          },
        });
      }

      toast.success("Dirección agregada exitosamente");
      set({ isUpdating: false });
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Error al agregar la dirección");
      set({ isUpdating: false });
      throw error;
    }
  },

  // Actualizar dirección existente
  updateAddress: async (
    userId: string,
    addressId: string,
    data: Partial<Address>
  ) => {
    try {
      set({ isUpdating: true });

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado");
      }

      const userData = userDoc.data();
      const currentAddresses = (userData.addresses || []) as Address[];

      const updatedAddresses = currentAddresses.map((addr: Address) => {
        if (addr.id === addressId) {
          return { ...addr, ...data };
        }
        // Si se está marcando otra como default, quitar default de las demás
        if (data.isDefault && addr.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });

      await updateDoc(userRef, {
        addresses: updatedAddresses,
        defaultAddressId: data.isDefault
          ? addressId
          : userData.defaultAddressId,
        updatedAt: new Date().toISOString(),
      });

      // Actualizar estado de auth
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        useAuthStore.setState({
          user: {
            ...currentUser,
            addresses: updatedAddresses,
            defaultAddressId: data.isDefault
              ? addressId
              : currentUser.defaultAddressId,
            updatedAt: new Date().toISOString(),
          },
        });
      }

      toast.success("Dirección actualizada exitosamente");
      set({ isUpdating: false });
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Error al actualizar la dirección");
      set({ isUpdating: false });
      throw error;
    }
  },

  // Eliminar dirección
  deleteAddress: async (userId: string, addressId: string) => {
    try {
      set({ isUpdating: true });

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado");
      }

      const userData = userDoc.data();
      const currentAddresses = (userData.addresses || []) as Address[];

      const addressToDelete = currentAddresses.find(
        (addr: Address) => addr.id === addressId
      );
      const updatedAddresses = currentAddresses.filter(
        (addr: Address) => addr.id !== addressId
      );

      // Si se eliminó la dirección por defecto, hacer default la primera que quede
      let newDefaultAddressId: string | undefined = userData.defaultAddressId;
      if (addressToDelete?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
        newDefaultAddressId = updatedAddresses[0].id;
      } else if (updatedAddresses.length === 0) {
        newDefaultAddressId = undefined;
      }

      await updateDoc(userRef, {
        addresses: updatedAddresses,
        defaultAddressId: newDefaultAddressId,
        updatedAt: new Date().toISOString(),
      });

      // Actualizar estado de auth
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        useAuthStore.setState({
          user: {
            ...currentUser,
            addresses: updatedAddresses,
            defaultAddressId: newDefaultAddressId,
            updatedAt: new Date().toISOString(),
          },
        });
      }

      toast.success("Dirección eliminada exitosamente");
      set({ isUpdating: false });
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Error al eliminar la dirección");
      set({ isUpdating: false });
      throw error;
    }
  },

  // Establecer dirección por defecto
  setDefaultAddress: async (userId: string, addressId: string) => {
    try {
      set({ isUpdating: true });

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado");
      }

      const userData = userDoc.data();
      const currentAddresses = (userData.addresses || []) as Address[];

      const updatedAddresses = currentAddresses.map((addr: Address) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }));

      await updateDoc(userRef, {
        addresses: updatedAddresses,
        defaultAddressId: addressId,
        updatedAt: new Date().toISOString(),
      });

      // Actualizar estado de auth
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        useAuthStore.setState({
          user: {
            ...currentUser,
            addresses: updatedAddresses,
            defaultAddressId: addressId,
            updatedAt: new Date().toISOString(),
          },
        });
      }

      toast.success("Dirección predeterminada actualizada");
      set({ isUpdating: false });
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Error al actualizar dirección predeterminada");
      set({ isUpdating: false });
      throw error;
    }
  },
}));
