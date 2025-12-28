// components/home/TrustBadges.tsx
import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En compras mayores a S/. 200",
  },
  {
    icon: RefreshCw,
    title: "Devoluciones Gratis",
    description: "30 días para devoluciones",
  },
  {
    icon: Shield,
    title: "Pago Seguro",
    description: "100% protegido",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Atención al cliente",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-gray-200 bg-white py-8 lg:py-12">
      <div className="container-elegant">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-100 flex items-center justify-center rounded-md">
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                </div>
                <div>
                  <h3 className="font-medium text-sm lg:text-base mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
