// app/sobre-nosotros/page.tsx
import { Award, Heart, Leaf, Users } from "lucide-react";
import Image from "next/image";

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-100 lg:h-125 bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop"
          alt="Sobre Eleganza"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4">
              Sobre Eleganza
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto px-4">
              Redefiniendo la elegancia desde 2010
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container-elegant">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Eleganza nació en 2010 con una visión clara: ofrecer moda
                  sofisticada y atemporal que combine calidad excepcional con
                  diseño elegante. Lo que comenzó como una pequeña boutique en
                  Lima, se ha convertido en una de las marcas de moda más
                  reconocidas de Perú.
                </p>
                <p className="leading-relaxed">
                  Desde nuestros inicios, hemos mantenido nuestro compromiso con
                  la excelencia, seleccionando cuidadosamente cada pieza que
                  ofrecemos. Creemos que la verdadera elegancia es atemporal y
                  que la moda debe ser accesible para todos sin comprometer la
                  calidad.
                </p>
                <p className="leading-relaxed">
                  Hoy, servimos a miles de clientes satisfechos en todo el país,
                  ofreciendo una experiencia de compra única tanto en línea como
                  en nuestras tiendas físicas. Nuestro equipo de expertos en
                  moda trabaja incansablemente para traerte las últimas
                  tendencias sin perder de vista los clásicos que nunca pasan de
                  moda.
                </p>
              </div>
            </div>
            <div className="relative h-125">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
                alt="Nuestra Historia"
                className="w-full h-full object-cover shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="container-elegant">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Valor 1 */}
            <div className="bg-white p-8 text-center shadow-elegant">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">
                Calidad Premium
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Seleccionamos solo los mejores materiales y trabajamos con
                artesanos expertos para garantizar productos excepcionales.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-white p-8 text-center shadow-elegant">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">
                Pasión por la Moda
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Amamos lo que hacemos y eso se refleja en cada pieza que
                ofrecemos. La moda es nuestra pasión y nuestro arte.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-white p-8 text-center shadow-elegant">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">
                Cliente Primero
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tu satisfacción es nuestra prioridad. Ofrecemos atención
                personalizada y un servicio excepcional en cada interacción.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="bg-white p-8 text-center shadow-elegant">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">
                Sostenibilidad
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Estamos comprometidos con prácticas responsables y sostenibles
                que respetan el medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container-elegant">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Misión */}
            <div className="bg-gray-50 p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-serif font-semibold mb-6">
                Nuestra Misión
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ofrecer moda elegante, sofisticada y de alta calidad que
                empodere a nuestros clientes a expresar su estilo único. Nos
                esforzamos por brindar una experiencia de compra excepcional,
                combinando tradición y modernidad, mientras mantenemos un
                compromiso inquebrantable con la calidad, el servicio al cliente
                y la sostenibilidad.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-gray-50 p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-serif font-semibold mb-6">
                Nuestra Visión
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ser la marca de moda elegante más reconocida y confiable de
                Latinoamérica, estableciendo nuevos estándares en calidad,
                diseño y servicio al cliente. Aspiramos a inspirar confianza y
                elegancia en cada persona que elija Eleganza, expandiendo
                nuestra presencia mientras mantenemos nuestros valores
                fundamentales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo (Opcional - puedes agregar fotos del equipo) */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="container-elegant">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-4">
              Nuestro Compromiso
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trabajamos cada día para ofrecerte la mejor experiencia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-black mb-2">
                15+
              </div>
              <p className="text-gray-600">Años de Experiencia</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-black mb-2">
                10K+
              </div>
              <p className="text-gray-600">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-black mb-2">
                500+
              </div>
              <p className="text-gray-600">Productos Premium</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-black text-white">
        <div className="container-elegant text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-6">
            ¿Listo para Descubrir Eleganza?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Explora nuestra colección y descubre por qué miles de clientes
            confían en nosotros
          </p>
          <a
            href="/productos"
            className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-elegant"
          >
            Ver Productos
          </a>
        </div>
      </section>
    </div>
  );
}
