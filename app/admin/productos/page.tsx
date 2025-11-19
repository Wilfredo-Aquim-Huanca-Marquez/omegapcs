"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  costo: number;
  stock: number;
  stockMinimo: number;
  proveedor: string;
}

export default function ProductosPage() {
  const router = useRouter();

  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Procesador Intel Core i7-13700K",
      categoria: "Procesadores",
      precio: 3500,
      costo: 2800,
      stock: 15,
      stockMinimo: 5,
      proveedor: "Distribuidora Intel & NVIDIA",
    },
    {
      id: 2,
      nombre: "Tarjeta Gráfica RTX 4070",
      categoria: "Tarjetas Gráficas",
      precio: 5500,
      costo: 4500,
      stock: 8,
      stockMinimo: 3,
      proveedor: "ASUS & Corsair Guatemala",
    },
  ]);

  const proveedores = [
    "Distribuidora Intel & NVIDIA",
    "ASUS & Corsair Guatemala",
    "Samsung & Corsair Tech",
  ];

  const [modal, setModal] = useState<"nuevo" | "editar" | null>(null);
  const [productoEdit, setProductoEdit] = useState<Producto | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    costo: "",
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
      precio: "",
      costo: "",
      stock: "",
      stockMinimo: "",
      proveedor: "",
    });
    setProductoEdit(null);
  };

  const abrirEditar = (p: Producto) => {
    setModal("editar");
    setProductoEdit(p);
    setForm({
      nombre: p.nombre,
      categoria: p.categoria,
      precio: p.precio.toString(),
      costo: p.costo.toString(),
      stock: p.stock.toString(),
      stockMinimo: p.stockMinimo.toString(),
      proveedor: p.proveedor,
    });
  };

  const guardar = () => {
    if (!form.nombre || !form.categoria) {
      alert("Completa los campos obligatorios");
      return;
    }

    const nuevo: Producto = {
      id: productoEdit ? productoEdit.id : Date.now(),
      nombre: form.nombre,
      categoria: form.categoria,
      precio: Number(form.precio),
      costo: Number(form.costo),
      stock: Number(form.stock),
      stockMinimo: Number(form.stockMinimo),
      proveedor: form.proveedor,
    };

    if (modal === "nuevo") {
      setProductos((prev) => [...prev, nuevo]);
    } else {
      setProductos((prev) =>
        prev.map((p) => (p.id === productoEdit?.id ? nuevo : p))
      );
    }

    setModal(null);
  };

  // ✅ FUNCIÓN PARA ELIMINAR PRODUCTO
  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f9fafc]">
      {/* Header */}
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
                d="M12 11c0-1.657 1.343-3 3-3h2a3 3 0 013 3v6a3 3 0 01-3 3h-2a3 3 0 01-3-3v-6zM6 9h.01M6 13h.01M6 17h.01M4 6h16M4 20h16"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              OmegaPC’s - Administrador
            </h1>
            <p className="text-sm text-gray-500">Panel de Control</p>
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

      {/* Navegación */}
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
              tab.path === "productos"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Contenido principal */}
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Gestión de Productos
            </h2>
            <p className="text-gray-500 text-sm">
              Total: {productos.length} productos
            </p>
          </div>

          <button
            onClick={abrirNuevo}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Producto
          </button>
        </div>

        {/* Lista de productos */}
        <div className="space-y-4">
          {productos.map((p) => (
            <div
              key={p.id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {p.nombre}
                </h3>
                <p className="text-sm text-gray-500">{p.categoria}</p>
                <p className="text-sm mt-1 text-gray-700">
                  Precio: <strong>Q{p.precio.toLocaleString()}</strong> · Costo:{" "}
                  <strong>Q{p.costo.toLocaleString()}</strong> · Stock:{" "}
                  <strong>{p.stock} unidades</strong>
                </p>
              </div>

              {/* 👉 BOTONES Editar + Eliminar */}
              <div className="flex gap-3">
                <button
                  onClick={() => abrirEditar(p)}
                  className="border px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarProducto(p.id)}
                  className="border px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[650px] shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {modal === "nuevo"
                    ? "Agregar Nuevo Producto"
                    : "Editar Producto"}
                </h3>
                <p className="text-sm text-gray-500">
                  {modal === "nuevo"
                    ? "Ingresa los detalles del producto para agregarlo al inventario"
                    : "Modifica los detalles del producto"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nombre del Producto
                </label>
                <input
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  placeholder="Ej: Procesador Intel Core i7"
                  value={form.nombre}
                  onChange={(e) =>
                    setForm({ ...form, nombre: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <input
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  placeholder="Ej: Procesadores"
                  value={form.categoria}
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Precio de Venta (Q)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.precio}
                  onChange={(e) =>
                    setForm({ ...form, precio: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Costo (Q)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.costo}
                  onChange={(e) =>
                    setForm({ ...form, costo: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Stock Inicial
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2 mt-1 text-gray-700"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
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
                <label className="text-sm font-medium text-gray-700">
                  Proveedor
                </label>
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

            {/* Botones */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={guardar}
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-900 transition"
              >
                {modal === "nuevo" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Agregar Producto
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
