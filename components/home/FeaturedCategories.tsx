// components/home/FeaturedCategories.tsx
import Link from "next/link";

const categories = [
  {
    name: "Mujer",
    slug: "vestidos",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop",
    description: "Elegancia femenina",
  },
  {
    name: "Hombre",
    slug: "zapatos-hombre",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=1000&fit=crop",
    description: "Estilo masculino",
  },
  {
    name: "Accesorios",
    slug: "accesorios",
    image:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&h=1000&fit=crop",
    description: "Complementos perfectos",
  },
  {
    name: "Zapatos",
    slug: "zapatos-mujer",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1000&fit=crop",
    description: "Pisa con estilo",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container-elegant">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-4">
            Compra por Categoría
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestras colecciones cuidadosamente seleccionadas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="group relative overflow-hidden aspect-3/4 bg-gray-100"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-elegant group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl lg:text-2xl font-serif font-semibold mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-200 mb-3">
                  {category.description}
                </p>
                <span className="text-sm font-medium border-b border-white pb-1 inline-block group-hover:border-b-2 transition-elegant">
                  Explorar
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
