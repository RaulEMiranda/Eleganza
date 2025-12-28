// components/checkout/PaymentForm.tsx
"use client";

import { useState } from "react";
import { PaymentMethod } from "@/types/order";
import { CreditCard, Building2, Smartphone } from "lucide-react";

interface PaymentFormProps {
  onSubmit: (method: PaymentMethod) => void;
  onBack: () => void;
}

export default function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("credit-card");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods = [
    {
      id: "credit-card" as PaymentMethod,
      name: "Tarjeta de Crédito",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "debit-card" as PaymentMethod,
      name: "Tarjeta de Débito",
      icon: CreditCard,
      description: "Visa Débito, Mastercard Débito",
    },
    {
      id: "paypal" as PaymentMethod,
      name: "PayPal",
      icon: Smartphone,
      description: "Paga de forma segura con PayPal",
    },
    {
      id: "bank-transfer" as PaymentMethod,
      name: "Transferencia Bancaria",
      icon: Building2,
      description: "Recibirás instrucciones por correo",
    },
  ];

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    value = value.replace(/\D/g, "");
    value = value.substring(0, 16);
    value = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardData((prev) => ({ ...prev, number: value }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    value = value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setCardData((prev) => ({ ...prev, expiry: value }));
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 4);
    setCardData((prev) => ({ ...prev, cvv: value }));
  };

  const validateCardForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!cardData.number || cardData.number.replace(/\s/g, "").length < 13) {
      newErrors.number = "Número de tarjeta inválido";
    }
    if (!cardData.name.trim()) {
      newErrors.name = "Nombre del titular requerido";
    }
    if (!cardData.expiry || cardData.expiry.length < 5) {
      newErrors.expiry = "Fecha de vencimiento inválida";
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = "CVV inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Solo validar tarjeta si el método seleccionado requiere datos de tarjeta
    if (
      (selectedMethod === "credit-card" || selectedMethod === "debit-card") &&
      !validateCardForm()
    ) {
      return;
    }

    onSubmit(selectedMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <label
              key={method.id}
              className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-elegant ${
                selectedMethod === method.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="mt-1"
              />
              <Icon className="w-5 h-5 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Card Details Form */}
      {(selectedMethod === "credit-card" ||
        selectedMethod === "debit-card") && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="font-medium text-sm">Detalles de la Tarjeta</h3>

          <div>
            <label className="block text-sm font-medium mb-2">
              Número de Tarjeta <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cardData.number}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className={errors.number ? "border-red-500" : ""}
            />
            {errors.number && (
              <p className="text-sm text-red-600 mt-1">{errors.number}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre del Titular <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cardData.name}
              onChange={(e) =>
                setCardData((prev) => ({
                  ...prev,
                  name: e.target.value.toUpperCase(),
                }))
              }
              placeholder="JUAN PÉREZ"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Vencimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cardData.expiry}
                onChange={handleExpiryChange}
                placeholder="MM/AA"
                className={errors.expiry ? "border-red-500" : ""}
              />
              {errors.expiry && (
                <p className="text-sm text-red-600 mt-1">{errors.expiry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={handleCVVChange}
                placeholder="123"
                className={errors.cvv ? "border-red-500" : ""}
              />
              {errors.cvv && (
                <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            <p>
              💳 Tus datos están protegidos con encriptación SSL de 256 bits
            </p>
          </div>
        </div>
      )}

      {/* PayPal Info */}
      {selectedMethod === "paypal" && (
        <div className="bg-blue-50 border border-blue-200 p-4">
          <p className="text-sm text-blue-800">
            Serás redirigido a PayPal para completar tu pago de forma segura.
          </p>
        </div>
      )}

      {/* Bank Transfer Info */}
      {selectedMethod === "bank-transfer" && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <p className="text-sm text-gray-700 mb-3">
            Recibirás las instrucciones de transferencia por correo electrónico.
            Tu pedido será procesado una vez confirmemos el pago.
          </p>
          <div className="space-y-2 text-xs text-gray-600">
            <p>
              <strong>Banco:</strong> BCP
            </p>
            <p>
              <strong>Cuenta Corriente:</strong> 123-456789-0-12
            </p>
            <p>
              <strong>CCI:</strong> 002-123-456789012345-67
            </p>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 border border-gray-300 font-medium hover:bg-gray-50 transition-elegant"
        >
          Volver
        </button>
        <button
          type="submit"
          className="flex-1 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant"
        >
          Revisar Pedido
        </button>
      </div>
    </form>
  );
}
