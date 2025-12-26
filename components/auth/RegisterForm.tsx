// components/auth/RegisterForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Chrome } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { RegisterFormData, registerSchema } from "@/lib/validation";

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, loginWithGoogle, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("hola");

      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log("hola 1");

      setTimeout(() => {
        router.push("/");
      }, 500);
      console.log("hola 2");
    } catch (error: any) {
      console.error("Error en registro:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "Este correo ya está registrado",
        });
      }
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle(false);

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      console.error("Error en Google register:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif mb-2">Crear Cuenta</h1>
        <p className="text-gray-600">Únete a nuestra comunidad</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            {...register("firstName")}
            error={errors.firstName?.message}
            placeholder="Juan"
            required
            fullWidth
          />

          <Input
            label="Apellido"
            type="text"
            {...register("lastName")}
            error={errors.lastName?.message}
            placeholder="Pérez"
            required
            fullWidth
          />
        </div>

        <Input
          label="Correo Electrónico"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="tu@email.com"
          required
          fullWidth
        />

        <Input
          label="Contraseña"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          placeholder="Mínimo 6 caracteres"
          required
          fullWidth
        />

        <Input
          label="Confirmar Contraseña"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          placeholder="Repite tu contraseña"
          required
          fullWidth
        />

        <div className="space-y-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="w-4 h-4 mt-0.5 border-gray-300 text-black focus:ring-black"
            />
            <span className="text-sm text-gray-700">
              Acepto los{" "}
              <Link
                href="/politicas/terminos"
                className="text-black hover:underline"
              >
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link
                href="/politicas/privacidad"
                className="text-black hover:underline"
              >
                política de privacidad
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading || isSubmitting}
          disabled={isLoading || isSubmitting}
        >
          Crear Cuenta
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              O regístrate con
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleGoogleRegister}
          disabled={isLoading}
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continuar con Google
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-black font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
