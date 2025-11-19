"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CajeroPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ────────────── HEADER ────────────── */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold text-black">OmegaPC's - Cajero</h1>
            <p className="text-sm text-gray-500">Sistema de Ventas</p>
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

      {/* ────────────── TABS (con redirecciones) ────────────── */}
      <div className="flex gap-4 px-8 py-4">
        <Link
          href="/cajero"
          className="px-6 py-2 rounded-full font-medium bg-gray-200 text-black"
        >
          Ventas
        </Link>

        <Link
          href="/cajero/inventario"
          className="px-6 py-2 rounded-full font-medium text-gray-500 hover:bg-gray-200"
        >
          Inventario
        </Link>

        <Link
          href="/cajero/clientes"
          className="px-6 py-2 rounded-full font-medium text-gray-500 hover:bg-gray-200"
        >
          Clientes
        </Link>
      </div>

      {/* ────────────── CONTENIDO DE VENTAS ────────────── */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 pb-10">
        
        {/* Seleccionar Productos */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Seleccionar Productos
          </h2>
          <p className="text-gray-500 mb-4">
            Busca y agrega productos al carrito de compra
          </p>

          <label className="text-sm font-medium text-black">Buscar Producto</label>
          <input
            type="text"
            placeholder="🔍  Buscar por nombre o categoría..."
            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 outline-none mb-4"
          />

          <label className="text-sm font-medium text-black">Producto</label>
          <div className="flex gap-2 mt-1">
            <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-black">
              <option>Selecciona un producto</option>
            </select>

            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Agregar
            </button>
          </div>
        </section>

        {/* Carrito */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-black flex items-center gap-2">
            🛒 Carrito de Compra
          </h2>
          <p className="text-gray-500">0 productos en el carrito</p>

          <div className="mt-10 text-center text-gray-400">
            El carrito está vacío
          </div>
        </section>

        {/* Cliente */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 lg:col-span-2">
          <h2 className="text-lg font-semibold text-black">Cliente</h2>
          <p className="text-gray-500 mb-3">
            Selecciona el cliente para la factura
          </p>

          <label className="text-sm font-medium text-black">Cliente</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black mt-1">
            <option>Selecciona un cliente</option>
          </select>
        </section>
      </main>
    </div>
  );
}
