// components/auth/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Chrome } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { LoginFormData, loginSchema } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, data.rememberMe || false);

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: any) {
      console.error("Error en login:", error);

      if (error.code === "auth/invalid-credential") {
        setError("root", {
          type: "manual",
          message: "Credenciales inválidas",
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(false);

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      console.error("Error en Google login:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif mb-2">Iniciar Sesión</h1>
        <p className="text-gray-600">Bienvenido de nuevo</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {errors.root && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {errors.root.message}
          </div>
        )}

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
          placeholder="Tu contraseña"
          required
          fullWidth
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 border-gray-300 text-black focus:ring-black"
            />
            <span className="text-sm text-gray-700">Recordarme</span>
          </label>

          <Link
            href="/recuperar-password"
            className="text-sm text-black hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading || isSubmitting}
          disabled={isLoading || isSubmitting}
        >
          Iniciar Sesión
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">O continúa con</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continuar con Google
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/registro"
          className="text-black font-medium hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </div>
  );
}
