"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Proveedor {
  id: number;
  nombre: string;
  productos: string[];
}

export default function ProveedoresPage() {
  const router = useRouter();

  const [proveedores, setProveedores] = useState<Proveedor[]>([
    {
      id: 1,
      nombre: "Distribuidora Intel & NVIDIA",
      productos: ["Procesadores Intel", "Tarjetas Gráficas NVIDIA"],
    },
    {
      id: 2,
      nombre: "ASUS & Corsair Guatemala",
      productos: ["Motherboards ASUS", "Memoria RAM Corsair"],
    },
  ]);

  const [modal, setModal] = useState<"nuevo" | "editar" | null>(null);
  const [proveedorEdit, setProveedorEdit] = useState<Proveedor | null>(null);
  const [form, setForm] = useState({ nombre: "", productos: "" });

  const handleLogout = () => router.push("/");
  const goTo = (path: string) => router.push(`/admin/${path}`);

  const abrirNuevo = () => {
    setModal("nuevo");
    setForm({ nombre: "", productos: "" });
  };

  const abrirEditar = (p: Proveedor) => {
    setModal("editar");
    setProveedorEdit(p);
    setForm({ nombre: p.nombre, productos: p.productos.join("\n") });
  };

  // ✅ FUNCIÓN AÑADIDA
  const eliminarProveedor = (id: number) => {
    setProveedores((prev) => prev.filter((p) => p.id !== id));
  };

  const guardar = () => {
    const productosLista = form.productos
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    if (!form.nombre.trim()) {
      alert("El nombre del proveedor es obligatorio");
      return;
    }

    if (modal === "nuevo") {
      setProveedores([
        ...proveedores,
        { id: Date.now(), nombre: form.nombre, productos: productosLista },
      ]);
    } else if (modal === "editar" && proveedorEdit) {
      setProveedores((prev) =>
        prev.map((p) =>
          p.id === proveedorEdit.id
            ? { ...p, nombre: form.nombre, productos: productosLista }
            : p
        )
      );
    }

    setModal(null);
    setForm({ nombre: "", productos: "" });
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

      {/* Nav Tabs */}
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
              tab.path === "proveedores"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Contenido principal */}
      <main className="p-8 space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Gestión de Proveedores
              </h2>
              <p className="text-gray-500 text-sm">
                Total: {proveedores.length} proveedores
              </p>
            </div>
            <button
              onClick={abrirNuevo}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              + Nuevo Proveedor
            </button>
          </div>

          <div className="space-y-4">
            {proveedores.map((p) => (
              <div
                key={p.id}
                className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{p.nombre}</h3>
                  <p className="text-sm text-gray-500 mb-1">Productos:</p>
                  <div className="flex flex-wrap gap-2">
                    {p.productos.map((prod, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded-lg text-sm text-gray-700"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => abrirEditar(p)}
                    className="border px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Editar
                  </button>

                  {/* ✅ BOTÓN ELIMINAR AÑADIDO */}
                  <button
                    onClick={() => eliminarProveedor(p.id)}
                    className="border px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[420px] shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {modal === "nuevo"
                    ? "Agregar Nuevo Proveedor"
                    : "Editar Proveedor"}
                </h3>
                <p className="text-sm text-gray-500">
                  {modal === "nuevo"
                    ? "Completa los datos del proveedor."
                    : "Edita la información del proveedor."}
                </p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nombre del Proveedor
                </label>
                <input
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border rounded-md p-2 mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Productos que provee
                </label>
                <textarea
                  value={form.productos}
                  onChange={(e) =>
                    setForm({ ...form, productos: e.target.value })
                  }
                  className="w-full border rounded-md p-2 mt-1 h-28 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Un producto por línea"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setModal(null)}
                className="border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                {modal === "nuevo" ? "Agregar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
