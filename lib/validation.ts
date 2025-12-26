// lib/validationSchemas.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder 50 caracteres"),
    lastName: z
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede exceder 50 caracteres"),
    email: z
      .string()
      .min(1, "El email es requerido")
      .email("El email no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña es demasiado larga"),
    confirmPassword: z.string().min(1, "Debes confirmar tu contraseña"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  password: z.string().min(1, "La contraseña es requerida"),
  rememberMe: z.boolean().optional(),
});

export const addressSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  company: z.string().optional(),
  address1: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  address2: z.string().optional(),
  city: z.string().min(2, "La ciudad es requerida"),
  state: z.string().min(2, "El departamento/provincia es requerido"),
  zipCode: z.string().min(4, "El código postal es requerido"),
  country: z.string().min(2, "El país es requerido"),
  phone: z.string().regex(/^(\+?51)?9\d{8}$/, "El teléfono no es válido"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
});

export const productReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Debes seleccionar una calificación")
    .max(5, "La calificación máxima es 5"),
  comment: z
    .string()
    .min(10, "El comentario debe tener al menos 10 caracteres")
    .max(500, "El comentario no puede exceder 500 caracteres"),
});

export const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "El número de tarjeta no es válido"),
  cardName: z.string().min(3, "El nombre en la tarjeta es requerido"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "El formato debe ser MM/YY")
    .refine((val) => {
      const [month, year] = val.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry >= new Date();
    }, "La tarjeta está expirada"),
  cvv: z.string().regex(/^\d{3,4}$/, "El CVV debe tener 3 o 4 dígitos"),
});

// Tipos inferidos
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type ProductReviewFormData = z.infer<typeof productReviewSchema>;
export type CreditCardFormData = z.infer<typeof creditCardSchema>;
