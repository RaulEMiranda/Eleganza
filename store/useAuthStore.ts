// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { User, RegisterData } from "@/types/user";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Acciones
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  loginWithGoogle: (rememberMe: boolean) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login con email y contraseña
      login: async (email: string, password: string, rememberMe: boolean) => {
        try {
          set({ isLoading: true, error: null });

          await setPersistence(
            auth,
            rememberMe ? browserLocalPersistence : browserSessionPersistence
          );

          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const userDocRef = doc(db, "users", userCredential.user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            set({
              user: {
                id: userCredential.user.uid,
                email: userCredential.user.email!,
                displayName: `${userData.firstName} ${userData.lastName}`,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                photoURL: userCredential.user.photoURL || undefined,
                addresses: userData.addresses || [],
                defaultAddressId: userData.defaultAddressId,
                createdAt: userData.createdAt,
                updatedAt: new Date().toISOString(),
              },
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            toast.success("¡Bienvenido de nuevo!");
          } else {
            set({ isLoading: false });
          }
        } catch (error: any) {
          set({ isLoading: false, error: error.message });

          const errorMessages: { [key: string]: string } = {
            "auth/user-not-found": "No existe una cuenta con este correo",
            "auth/wrong-password": "Contraseña incorrecta",
            "auth/invalid-email": "El correo electrónico no es válido",
            "auth/user-disabled": "Esta cuenta ha sido deshabilitada",
            "auth/too-many-requests": "Demasiados intentos. Intenta más tarde",
            "auth/invalid-credential": "Credenciales inválidas",
          };

          const message =
            errorMessages[error.code] || "Error al iniciar sesión";
          toast.error(message);
          throw error;
        }
      },

      // Login con Google
      loginWithGoogle: async (rememberMe: boolean) => {
        try {
          set({ isLoading: true, error: null });

          await setPersistence(
            auth,
            rememberMe ? browserLocalPersistence : browserSessionPersistence
          );

          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);

          const userDocRef = doc(db, "users", result.user.uid);
          const userDoc = await getDoc(userDocRef);

          const now = new Date().toISOString();

          if (!userDoc.exists()) {
            const [firstName = "", lastName = ""] = (
              result.user.displayName || ""
            ).split(" ");

            await setDoc(userDocRef, {
              firstName,
              lastName,
              email: result.user.email,
              addresses: [],
              createdAt: now,
              updatedAt: now,
              provider: "google",
            });

            set({
              user: {
                id: result.user.uid,
                email: result.user.email!,
                displayName: result.user.displayName || "",
                firstName,
                lastName,
                phone: undefined,
                photoURL: result.user.photoURL || undefined,
                addresses: [],
                createdAt: now,
                updatedAt: now,
              },
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            const userData = userDoc.data();

            set({
              user: {
                id: result.user.uid,
                email: result.user.email!,
                displayName: result.user.displayName || "",
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                photoURL: result.user.photoURL || undefined,
                addresses: userData.addresses || [],
                defaultAddressId: userData.defaultAddressId,
                createdAt: userData.createdAt,
                updatedAt: now,
              },
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }

          toast.success("¡Bienvenido!");
        } catch (error: any) {
          set({ isLoading: false, error: error.message });

          if (error.code !== "auth/popup-closed-by-user") {
            toast.error("Error al iniciar sesión con Google");
          }
          throw error;
        }
      },

      // Registro
      register: async (userData: RegisterData) => {
        try {
          set({ isLoading: true, error: null });

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          );

          const now = new Date().toISOString();

          // Guardar en Firestore SIN el campo phone
          await setDoc(doc(db, "users", userCredential.user.uid), {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            addresses: [],
            createdAt: now,
            updatedAt: now,
            provider: "email",
          });

          // Actualizar estado local SIN phone (será undefined)
          set({
            user: {
              id: userCredential.user.uid,
              email: userCredential.user.email!,
              displayName: `${userData.firstName} ${userData.lastName}`,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phone: undefined,
              photoURL: undefined,
              addresses: [],
              createdAt: now,
              updatedAt: now,
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success("¡Cuenta creada exitosamente!");
        } catch (error: any) {
          set({ isLoading: false, error: error.message });

          const errorMessages: { [key: string]: string } = {
            "auth/email-already-in-use": "Este correo ya está registrado",
            "auth/invalid-email": "El correo electrónico no es válido",
            "auth/weak-password":
              "La contraseña debe tener al menos 6 caracteres",
          };

          const message =
            errorMessages[error.code] || "Error al crear la cuenta";
          toast.error(message);
          throw error;
        }
      },

      // Cerrar sesión
      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, isAuthenticated: false, error: null });
          toast.success("Sesión cerrada");
        } catch (error: any) {
          set({ error: error.message });
          toast.error("Error al cerrar sesión");
          throw error;
        }
      },

      // Inicializar autenticación
      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          // Solo actualizar si no estamos en medio de un proceso de auth
          if (get().isLoading) {
            return;
          }

          if (firebaseUser) {
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              set({
                user: {
                  id: firebaseUser.uid,
                  email: firebaseUser.email!,
                  displayName: userData.firstName
                    ? `${userData.firstName} ${userData.lastName}`
                    : firebaseUser.displayName || "",
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  phone: userData.phone,
                  photoURL: firebaseUser.photoURL || undefined,
                  addresses: userData.addresses || [],
                  defaultAddressId: userData.defaultAddressId,
                  createdAt: userData.createdAt,
                  updatedAt: userData.updatedAt,
                },
                isAuthenticated: true,
              });
            }
          } else {
            set({ user: null, isAuthenticated: false });
          }
        });

        return unsubscribe;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
