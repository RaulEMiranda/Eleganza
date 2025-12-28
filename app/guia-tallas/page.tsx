// app/guia-tallas/page.tsx
"use client";

import { useState } from "react";
import { Ruler, Info } from "lucide-react";

type Category =
  | "mujer-ropa"
  | "mujer-zapatos"
  | "hombre-ropa"
  | "hombre-zapatos";

export default function GuiaTallasPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("mujer-ropa");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 lg:py-20">
        <div className="container-elegant text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Ruler className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Guía de Tallas
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Encuentra tu talla perfecta con nuestras tablas de medidas
            detalladas
          </p>
        </div>
      </section>

      {/* Category Selector */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-elegant">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory("mujer-ropa")}
              className={`px-6 py-3 font-medium transition-elegant ${
                selectedCategory === "mujer-ropa"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              Ropa Mujer
            </button>
            <button
              onClick={() => setSelectedCategory("mujer-zapatos")}
              className={`px-6 py-3 font-medium transition-elegant ${
                selectedCategory === "mujer-zapatos"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              Zapatos Mujer
            </button>
            <button
              onClick={() => setSelectedCategory("hombre-ropa")}
              className={`px-6 py-3 font-medium transition-elegant ${
                selectedCategory === "hombre-ropa"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              Ropa Hombre
            </button>
            <button
              onClick={() => setSelectedCategory("hombre-zapatos")}
              className={`px-6 py-3 font-medium transition-elegant ${
                selectedCategory === "hombre-zapatos"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              Zapatos Hombre
            </button>
          </div>
        </div>
      </section>

      {/* Size Charts */}
      <section className="py-12 lg:py-20">
        <div className="container-elegant max-w-5xl">
          {/* Ropa Mujer */}
          {selectedCategory === "mujer-ropa" && (
            <div className="space-y-8">
              <div className="bg-white p-8 shadow-elegant">
                <h2 className="text-2xl font-serif font-semibold mb-6">
                  Tabla de Tallas - Ropa Mujer
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Talla
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Busto (cm)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Cintura (cm)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Cadera (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">XS</td>
                        <td className="px-4 py-3">78-82</td>
                        <td className="px-4 py-3">58-62</td>
                        <td className="px-4 py-3">84-88</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">S</td>
                        <td className="px-4 py-3">82-86</td>
                        <td className="px-4 py-3">62-66</td>
                        <td className="px-4 py-3">88-92</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">M</td>
                        <td className="px-4 py-3">86-90</td>
                        <td className="px-4 py-3">66-70</td>
                        <td className="px-4 py-3">92-96</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">L</td>
                        <td className="px-4 py-3">90-94</td>
                        <td className="px-4 py-3">70-74</td>
                        <td className="px-4 py-3">96-100</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">XL</td>
                        <td className="px-4 py-3">94-98</td>
                        <td className="px-4 py-3">74-78</td>
                        <td className="px-4 py-3">100-104</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">XXL</td>
                        <td className="px-4 py-3">98-104</td>
                        <td className="px-4 py-3">78-84</td>
                        <td className="px-4 py-3">104-110</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Zapatos Mujer */}
          {selectedCategory === "mujer-zapatos" && (
            <div className="space-y-8">
              <div className="bg-white p-8 shadow-elegant">
                <h2 className="text-2xl font-serif font-semibold mb-6">
                  Tabla de Tallas - Zapatos Mujer
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Perú/Latinoamérica
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          USA
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Europa
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          UK
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Longitud (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">35</td>
                        <td className="px-4 py-3">5</td>
                        <td className="px-4 py-3">35</td>
                        <td className="px-4 py-3">2.5</td>
                        <td className="px-4 py-3">22.0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">36</td>
                        <td className="px-4 py-3">6</td>
                        <td className="px-4 py-3">36</td>
                        <td className="px-4 py-3">3.5</td>
                        <td className="px-4 py-3">22.5</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">37</td>
                        <td className="px-4 py-3">6.5</td>
                        <td className="px-4 py-3">37</td>
                        <td className="px-4 py-3">4</td>
                        <td className="px-4 py-3">23.0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">38</td>
                        <td className="px-4 py-3">7</td>
                        <td className="px-4 py-3">38</td>
                        <td className="px-4 py-3">5</td>
                        <td className="px-4 py-3">23.5</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">39</td>
                        <td className="px-4 py-3">8</td>
                        <td className="px-4 py-3">39</td>
                        <td className="px-4 py-3">6</td>
                        <td className="px-4 py-3">24.5</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">40</td>
                        <td className="px-4 py-3">9</td>
                        <td className="px-4 py-3">40</td>
                        <td className="px-4 py-3">7</td>
                        <td className="px-4 py-3">25.0</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">41</td>
                        <td className="px-4 py-3">10</td>
                        <td className="px-4 py-3">41</td>
                        <td className="px-4 py-3">8</td>
                        <td className="px-4 py-3">25.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Ropa Hombre */}
          {selectedCategory === "hombre-ropa" && (
            <div className="space-y-8">
              <div className="bg-white p-8 shadow-elegant">
                <h2 className="text-2xl font-serif font-semibold mb-6">
                  Tabla de Tallas - Ropa Hombre
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Talla
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Pecho (cm)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Cintura (cm)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Cadera (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">XS</td>
                        <td className="px-4 py-3">86-91</td>
                        <td className="px-4 py-3">71-76</td>
                        <td className="px-4 py-3">86-91</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">S</td>
                        <td className="px-4 py-3">91-96</td>
                        <td className="px-4 py-3">76-81</td>
                        <td className="px-4 py-3">91-96</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">M</td>
                        <td className="px-4 py-3">96-101</td>
                        <td className="px-4 py-3">81-86</td>
                        <td className="px-4 py-3">96-101</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">L</td>
                        <td className="px-4 py-3">101-106</td>
                        <td className="px-4 py-3">86-91</td>
                        <td className="px-4 py-3">101-106</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">XL</td>
                        <td className="px-4 py-3">106-114</td>
                        <td className="px-4 py-3">91-99</td>
                        <td className="px-4 py-3">106-111</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">XXL</td>
                        <td className="px-4 py-3">114-122</td>
                        <td className="px-4 py-3">99-107</td>
                        <td className="px-4 py-3">111-116</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabla de Camisas */}
              <div className="bg-white p-8 shadow-elegant">
                <h2 className="text-2xl font-serif font-semibold mb-6">
                  Tabla de Tallas - Camisas Hombre
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Talla
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Cuello (cm)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Pecho (cm)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Manga (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">S (38)</td>
                        <td className="px-4 py-3">37-38</td>
                        <td className="px-4 py-3">91-96</td>
                        <td className="px-4 py-3">81-84</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">M (40)</td>
                        <td className="px-4 py-3">39-40</td>
                        <td className="px-4 py-3">96-101</td>
                        <td className="px-4 py-3">84-87</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">L (42)</td>
                        <td className="px-4 py-3">41-42</td>
                        <td className="px-4 py-3">101-106</td>
                        <td className="px-4 py-3">87-90</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">XL (44)</td>
                        <td className="px-4 py-3">43-44</td>
                        <td className="px-4 py-3">106-114</td>
                        <td className="px-4 py-3">90-93</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">XXL (46)</td>
                        <td className="px-4 py-3">45-46</td>
                        <td className="px-4 py-3">114-122</td>
                        <td className="px-4 py-3">93-96</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Zapatos Hombre */}
          {selectedCategory === "hombre-zapatos" && (
            <div className="space-y-8">
              <div className="bg-white p-8 shadow-elegant">
                <h2 className="text-2xl font-serif font-semibold mb-6">
                  Tabla de Tallas - Zapatos Hombre
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Perú/Latinoamérica
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          USA
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Europa
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          UK
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Longitud (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">39</td>
                        <td className="px-4 py-3">6.5</td>
                        <td className="px-4 py-3">39</td>
                        <td className="px-4 py-3">6</td>
                        <td className="px-4 py-3">24.5</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">40</td>
                        <td className="px-4 py-3">7</td>
                        <td className="px-4 py-3">40</td>
                        <td className="px-4 py-3">6.5</td>
                        <td className="px-4 py-3">25.0</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">41</td>
                        <td className="px-4 py-3">8</td>
                        <td className="px-4 py-3">41</td>
                        <td className="px-4 py-3">7</td>
                        <td className="px-4 py-3">25.5</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">42</td>
                        <td className="px-4 py-3">8.5</td>
                        <td className="px-4 py-3">42</td>
                        <td className="px-4 py-3">8</td>
                        <td className="px-4 py-3">26.5</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">43</td>
                        <td className="px-4 py-3">9.5</td>
                        <td className="px-4 py-3">43</td>
                        <td className="px-4 py-3">9</td>
                        <td className="px-4 py-3">27.0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">44</td>
                        <td className="px-4 py-3">10</td>
                        <td className="px-4 py-3">44</td>
                        <td className="px-4 py-3">9.5</td>
                        <td className="px-4 py-3">27.5</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">45</td>
                        <td className="px-4 py-3">11</td>
                        <td className="px-4 py-3">45</td>
                        <td className="px-4 py-3">10.5</td>
                        <td className="px-4 py-3">28.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Cómo Medir */}
          <div className="bg-blue-50 border border-blue-200 p-6 lg:p-8 mt-12">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-3">
                  Cómo Tomar Tus Medidas
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>
                    <strong>Busto/Pecho:</strong> Mide alrededor de la parte más
                    amplia del busto/pecho, manteniendo la cinta métrica
                    horizontal.
                  </li>
                  <li>
                    <strong>Cintura:</strong> Mide alrededor de la parte más
                    estrecha de tu cintura natural.
                  </li>
                  <li>
                    <strong>Cadera:</strong> Mide alrededor de la parte más
                    amplia de tus caderas.
                  </li>
                  <li>
                    <strong>Longitud del pie:</strong> Mide desde el talón hasta
                    el dedo más largo, estando de pie.
                  </li>
                  <li>
                    <strong>Consejo:</strong> Si tus medidas están entre dos
                    tallas, recomendamos elegir la talla mayor para mayor
                    comodidad.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container-elegant text-center">
          <h2 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
            ¿Necesitas Ayuda con tu Talla?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de atención al cliente está disponible para ayudarte
            a encontrar la talla perfecta.
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-elegant"
          >
            Contactar Soporte
          </a>
        </div>
      </section>
    </div>
  );
}
