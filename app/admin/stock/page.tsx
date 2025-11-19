"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ItemStock {
  id: number;
  nombre: string;
  categoria: string;
  stock: number;
  stockMinimo: number;
  proveedor: string;
}

export default function StockPage() {
  const router = useRouter();

  const [items, setItems] = useState<ItemStock[]>([
    {
      id: 1,
      nombre: "Procesador Intel Core i7-13700K",
      categoria: "Procesadores",
      stock: 15,
      stockMinimo: 5,
      proveedor: "Distribuidora Intel & NVIDIA",
    },
    {
      id: 2,
      nombre: "Tarjeta Gráfica RTX 4070",
      categoria: "Tarjetas Gráficas",
      stock: 2,
      stockMinimo: 3,
      proveedor: "ASUS & Corsair Guatemala",
    },
    {
      id: 3,
      nombre: "Fuente 750W Gold",
      categoria: "Fuentes",
      stock: 0,
      stockMinimo: 2,
      proveedor: "Samsung & Corsair Tech",
    },
  ]);

  const proveedores = [
    "Distribuidora Intel & NVIDIA",
    "ASUS & Corsair Guatemala",
    "Samsung & Corsair Tech",
  ];

  const [modal, setModal] = useState<"nuevo" | "editar" | null>(null);
  const [editItem, setEditItem] = useState<ItemStock | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    stock: "",
    stockMinimo: "",
    proveedor: "",
  });

  const handleLogout = () => router.push("/");
  const goTo = (path: string) => router.push(`/admin/${path}`);

  const abrirNuevo = () => {
    setModal("nuevo");
    setForm({
      nombre: "",
      categoria: "",
      stock: "",
      stockMinimo: "",
      proveedor: "",
    });
    setEditItem(null);
  };

  const abrirEditar = (item: ItemStock) => {
    setModal("editar");
    setEditItem(item);
    setForm({
      nombre: item.nombre,
      categoria: item.categoria,
      stock: item.stock.toString(),
      stockMinimo: item.stockMinimo.toString(),
      proveedor: item.proveedor,
    });
  };

  const guardar = () => {
    if (!form.nombre || !form.categoria) {
      alert("Completa los campos obligatorios");
      return;
    }

    const nuevo: ItemStock = {
      id: editItem ? editItem.id : Date.now(),
      nombre: form.nombre,
      categoria: form.categoria,
      stock: Number(form.stock),
      stockMinimo: Number(form.stockMinimo),
      proveedor: form.proveedor,
    };

    if (modal === "nuevo") {
      setItems((prev) => [...prev, nuevo]);
    } else {
      setItems((prev) =>
        prev.map((p) => (p.id === editItem?.id ? nuevo : p))
      );
    }

    setModal(null);
  };

  // ✅ NUEVA FUNCIÓN PARA ELIMINAR
  const eliminarItem = (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este registro?")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const estadoStock = (stock: number, minimo: number) => {
    if (stock === 0) return <span className="text-red-600 font-semibold">Sin stock</span>;
    if (stock <= minimo) return <span className="text-yellow-600 font-semibold">Stock bajo</span>;
    return <span className="text-green-600 font-semibold">Stock normal</span>;
  };

  return (
    <div className="min-h-screen bg-[#f9fafc]">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-800">OmegaPC’s - Administrador</h1>
            <p className="text-sm text-gray-500">Control de Stock</p>
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

      {/* NAV */}
      <nav className="flex gap-4 px-8 py-3 bg-gray-50 border-b border-gray-200">
        {[
          { label: "Reportes", path: "reportes" },
          { label: "Stock", path: "stock" },
          { label: "Productos", path: "productos" },
          { label: "Clientes", path: "clientes" },
          { label: "Proveedores", path: "proveedores" },
        ].map((tab) => (
          <button
            key={tab.path}
            onClick={() => goTo(tab.path)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab.path === "stock"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN */}
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Control de Stock</h2>
            <p className="text-gray-500 text-sm">Total: {items.length} productos</p>
          </div>

          <button
            onClick={abrirNuevo}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Stock
          </button>
        </div>

        {/* LISTA */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{item.nombre}</h3>
                <p className="text-sm text-gray-500">{item.categoria}</p>
                <p className="text-sm mt-1 text-gray-700">
                  Stock: <strong>{item.stock}</strong> · Estado:{" "}
                  {estadoStock(item.stock, item.stockMinimo)}
                </p>
                <p className="text-sm text-gray-600">Proveedor: {item.proveedor}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => abrirEditar(item)}
                  className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition"
                >
                  Editar
                </button>

                {/* ✅ BOTÓN DE ELIMINAR */}
                <button
                  onClick={() => eliminarItem(item.id)}
                  className="flex items-center gap-2 border border-red-300 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[650px] shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {modal === "nuevo" ? "Agregar Registro de Stock" : "Editar Stock"}
                </h3>
                <p className="text-sm text-gray-500">
                  {modal === "nuevo"
                    ? "Ingresa la información del producto"
                    : "Modifica la información del producto"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModal(null)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nombre del Producto
                </label>
                <input
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Categoría</label>
                <input
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Stock Mínimo
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.stockMinimo}
                  onChange={(e) =>
                    setForm({ ...form, stockMinimo: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">Proveedor</label>
                <select
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.proveedor}
                  onChange={(e) =>
                    setForm({ ...form, proveedor: e.target.value })
                  }
                >
                  <option value="">Selecciona un proveedor</option>
                  {proveedores.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModal(null)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition"
              >
                Cancelar
              </button>

              <button
                onClick={guardar}
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition"
              >
                {modal === "nuevo" ? "Agregar" : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
