// components/checkout/CheckoutSteps.tsx
"use client";

import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: "shipping" | "payment" | "review";
}

const steps = [
  { id: "shipping", label: "Envío", number: 1 },
  { id: "payment", label: "Pago", number: 2 },
  { id: "review", label: "Revisar", number: 3 },
];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-elegant ${
                    isCompleted
                      ? "bg-black text-white"
                      : isCurrent
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <p
                  className={`text-xs mt-2 font-medium ${
                    isCurrent ? "text-black" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-elegant ${
                    isCompleted ? "bg-black" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
