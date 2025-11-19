"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InventarioPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const productos = [
    { nombre: "Procesador Intel Core i7-13700K", categoria: "Procesadores", precio: "Q3.500", stock: 15 },
    { nombre: "Tarjeta Gráfica RTX 4070", categoria: "Tarjetas Gráficas", precio: "Q5.500", stock: 8 },
    { nombre: "Motherboard ASUS ROG Strix", categoria: "Motherboards", precio: "Q2.200", stock: 2 },
    { nombre: "RAM DDR5 32GB Corsair", categoria: "Memoria RAM", precio: "Q1.800", stock: 20 },
    { nombre: "SSD NVMe 1TB Samsung", categoria: "Almacenamiento", precio: "Q800", stock: 0 },
    { nombre: "Fuente Corsair 850W", categoria: "Fuentes de Poder", precio: "Q1.200", stock: 12 },
  ];

  const getEstado = (stock: number) => {
    if (stock === 0)
      return (
        <span className="w-full border border-black rounded-lg px-3 py-2 mt-1 text-black">
          Sin Stock
        </span>
      );

    if (stock <= 3)
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
          Stock Bajo
        </span>
      );

    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-600 text-white">
        Disponible
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold text-black">OmegaPC's - Cajero</h1>
              <p className="text-sm text-black">Sistema de Ventas</p>
            </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4-4-4m4 4H7" />
          </svg>
          Cerrar Sesión
        </button>
      </header>

      {/* TABS */}
      <div className="flex gap-4 px-8 py-4">
        <Link href="/cajero"
          className="px-6 py-2 rounded-full font-medium text-black hover:bg-gray-200"
        >
          Ventas
        </Link>

        <Link href="/cajero/inventario"
          className="px-6 py-2 rounded-full font-medium bg-gray-200 text-black"
        >
          Inventario
        </Link>

        <Link href="/cajero/clientes"
          className="px-6 py-2 rounded-full font-medium text-black hover:bg-gray-200"
        >
          Clientes
        </Link>
      </div>

      {/* CONTENIDO */}
      <main className="px-8 pb-10">
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-black">Inventario de Productos</h2>
          <p className="text-black -mt-1 mb-4">
            Consulta el stock disponible de todos los productos
          </p>

          {/* BUSCADOR */}
          <div className="w-full mb-5">
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
              <span className="text-black">🔍</span>
              <input
                type="text"
                placeholder="Buscar por nombre o categoría..."
                className="bg-transparent outline-none w-full text-black placeholder-black"
              />
            </div>
          </div>

          {/* LISTA */}
          <div className="space-y-4">
            {productos.map((p, index) => (
              <div key={index} className="flex justify-between items-center p-4 rounded-xl border bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-2xl">📦</div>

                  <div>
                    <h3 className="font-semibold text-black">{p.nombre}</h3>
                    <p className="text-sm text-black">{p.categoria}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-black">Precio</p>
                  <p className="text-black">{p.precio}</p>

                  <p className="font-semibold mt-2 text-black">Stock</p>
                  <p className={`${p.stock === 0 ? "text-red-600" : "text-black"} font-medium`}>
                    {p.stock} unidades
                  </p>

                  <div className="mt-2">{getEstado(p.stock)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
