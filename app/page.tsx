// app/page.tsx

export default function HomePage() {
  return (
    <div className="container-elegant py-20">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-serif">Eleganza</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Moda elegante y sofisticada para el hombre y la mujer moderna
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <a
            href="/productos"
            className="px-8 py-4 bg-black text-white hover:bg-gray-900 transition-elegant font-medium"
          >
            Ver Productos
          </a>
          <a
            href="/categoria"
            className="px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-elegant font-medium"
          >
            Explorar Categorías
          </a>
        </div>
      </div>
    </div>
  );
}
