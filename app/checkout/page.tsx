// app/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";

import { Address } from "@/types/user";
import { ShippingMethod, PaymentMethod } from "@/types/order";
import { SHIPPING_METHODS } from "@/constants";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderSummary from "@/components/checkout/OPrderSummary";

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { items, getTotal, clearCart } = useCartStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(
    SHIPPING_METHODS[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirigir si no está autenticado o carrito vacío
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para continuar");
      router.push("/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      toast.error("Tu carrito está vacío");
      router.push("/productos");
      return;
    }
  }, [isAuthenticated, items, router]);

  const handleShippingSubmit = (address: Address) => {
    setShippingAddress(address);
    if (useSameAddress) {
      setBillingAddress(address);
    }
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setCurrentStep("review");
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMethod) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setIsProcessing(true);

    try {
      // Simular proceso de orden (aquí irían las llamadas a Firebase/API)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generar número de orden
      const orderNumber = `ORD-${Date.now()}`;

      // Aquí guardarías la orden en Firebase
      // await createOrder({ ... })

      // Limpiar carrito
      clearCart();

      toast.success("¡Orden realizada exitosamente!");

      // Redirigir a confirmación
      router.push(`/checkout/confirmacion?order=${orderNumber}`);
    } catch (error) {
      console.error("Error al procesar orden:", error);
      toast.error("Error al procesar la orden. Intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  // No renderizar nada si no está autenticado o carrito vacío
  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="container-elegant">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600">
            Completa tu información para procesar el pedido
          </p>
        </div>

        {/* Progress Steps */}
        <CheckoutSteps currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Forms Section - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            {currentStep === "shipping" && (
              <div className="bg-white p-6 lg:p-8 shadow-elegant">
                <h2 className="text-xl font-serif font-semibold mb-6">
                  Dirección de Envío
                </h2>
                <ShippingForm
                  user={user}
                  onSubmit={handleShippingSubmit}
                  initialAddress={shippingAddress}
                  useSameAddress={useSameAddress}
                  onUseSameAddressChange={setUseSameAddress}
                />
              </div>
            )}

            {/* Payment Method */}
            {currentStep === "payment" && (
              <div className="space-y-6">
                {/* Shipping Method */}
                <div className="bg-white p-6 lg:p-8 shadow-elegant">
                  <h2 className="text-xl font-serif font-semibold mb-6">
                    Método de Envío
                  </h2>
                  <div className="space-y-3">
                    {SHIPPING_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-elegant ${
                          selectedShipping.id === method.id
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping.id === method.id}
                          onChange={() => setSelectedShipping(method)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{method.name}</p>
                            <p className="font-semibold">
                              {method.price === 0
                                ? "GRATIS"
                                : `S/ ${method.price.toFixed(2)}`}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white p-6 lg:p-8 shadow-elegant">
                  <h2 className="text-xl font-serif font-semibold mb-6">
                    Método de Pago
                  </h2>
                  <PaymentForm
                    onSubmit={handlePaymentSubmit}
                    onBack={() => setCurrentStep("shipping")}
                  />
                </div>
              </div>
            )}

            {/* Review Order */}
            {currentStep === "review" && (
              <div className="bg-white p-6 lg:p-8 shadow-elegant">
                <h2 className="text-xl font-serif font-semibold mb-6">
                  Revisar Pedido
                </h2>

                {/* Shipping Address Review */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Dirección de Envío</h3>
                    <button
                      onClick={() => setCurrentStep("shipping")}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Editar
                    </button>
                  </div>
                  {shippingAddress && (
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-black">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p>{shippingAddress.address1}</p>
                      {shippingAddress.address2 && (
                        <p>{shippingAddress.address2}</p>
                      )}
                      <p>
                        {shippingAddress.city}, {shippingAddress.state}{" "}
                        {shippingAddress.zipCode}
                      </p>
                      <p>{shippingAddress.country}</p>
                      <p>{shippingAddress.phone}</p>
                    </div>
                  )}
                </div>

                {/* Shipping Method Review */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Método de Envío</h3>
                    <button
                      onClick={() => setCurrentStep("payment")}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-black">
                      {selectedShipping.name}
                    </p>
                    <p className="text-gray-600">
                      {selectedShipping.description}
                    </p>
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Método de Pago</h3>
                    <button
                      onClick={() => setCurrentStep("payment")}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-black">
                      {paymentMethod === "credit-card" && "Tarjeta de Crédito"}
                      {paymentMethod === "debit-card" && "Tarjeta de Débito"}
                      {paymentMethod === "paypal" && "PayPal"}
                      {paymentMethod === "bank-transfer" &&
                        "Transferencia Bancaria"}
                    </p>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Realizar Pedido
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Al realizar el pedido, aceptas nuestros{" "}
                  <a href="/terminos" className="underline hover:text-black">
                    Términos y Condiciones
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Order Summary - 1/3 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary items={items} shippingMethod={selectedShipping} />
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="w-4 h-4" />
          <p>Compra 100% segura y protegida</p>
        </div>
      </div>
    </div>
  );
}
