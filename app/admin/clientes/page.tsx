"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientesPage() {
  const router = useRouter();
  const goTo = (path: string) => router.push(`/admin/${path}`);
  const handleLogout = () => router.push("/");

  // Lista de clientes
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", nit: "CF", correo: "juan@email.com" },
    { id: 2, nombre: "Tech Solutions S.A.", nit: "1234567-8", correo: "ventas@tech.com" },
  ]);

  // Estado del formulario
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(false);
  const [clienteActual, setClienteActual] = useState({ id: 0, nombre: "", nit: "", correo: "" });

  // Estado para la notificación
  const [toast, setToast] = useState("");

  // Muestra el toast por unos segundos
  const mostrarToast = (mensaje: string) => {
    setToast(mensaje);
    setTimeout(() => setToast(""), 3000);
  };

  const handleNuevoCliente = () => {
    setClienteActual({ id: 0, nombre: "", nit: "", correo: "" });
    setEditando(false);
    setShowForm(true);
  };

  const handleEditarCliente = (cliente: any) => {
    setClienteActual(cliente);
    setEditando(true);
    setShowForm(true);
  };

  const handleGuardarCliente = () => {
    if (!clienteActual.nombre.trim()) return;

    if (editando) {
      setClientes((prev) =>
        prev.map((c) => (c.id === clienteActual.id ? clienteActual : c))
      );
      mostrarToast("✅ Cliente actualizado correctamente");
    } else {
      const nuevo = { ...clienteActual, id: Date.now() };
      setClientes((prev) => [...prev, nuevo]);
      mostrarToast("✅ Cliente guardado con éxito");
    }

    setShowForm(false);
  };

  // ⭐ AÑADIDO → eliminar cliente
  const handleEliminarCliente = (id: number) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
    mostrarToast("🗑️ Cliente eliminado");
  };

  return (
    <div className="min-h-screen bg-[#f9fafc] relative">
      {/* ✅ Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-5 py-3 rounded-lg shadow-md transition-opacity animate-fadeIn z-50">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">OmegaPC’s - Administrador</h1>
          <p className="text-sm text-gray-500">Panel de Control</p>
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
        {["reportes", "stock", "productos", "clientes", "proveedores"].map((tab) => (
          <button
            key={tab}
            onClick={() => goTo(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "clientes"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Contenido principal */}
      <main className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Gestión de Clientes</h2>
            <p className="text-gray-500 text-sm">Lista de clientes registrados</p>
          </div>
          <button
            onClick={handleNuevoCliente}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + Nuevo Cliente
          </button>
        </div>

        <div className="grid gap-4">
          {clientes.map((c) => (
            <div
              key={c.id}
              className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{c.nombre}</h3>
                <p className="text-sm text-gray-500">NIT: {c.nit}</p>
                <p className="text-sm text-gray-500">{c.correo}</p>
              </div>

              {/* ⭐ AÑADIMOS EL BOTÓN ELIMINAR */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditarCliente(c)}
                  className="border px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleEliminarCliente(c.id)}
                  className="border px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal del formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] animate-scaleIn">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editando ? "Editar Cliente" : "Nuevo Cliente"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-black">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-black rounded-lg px-3 py-2 mt-1 text-black"
                  value={clienteActual.nombre}
                  onChange={(e) =>
                    setClienteActual({ ...clienteActual, nombre: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-black">NIT</label>
                <input
                  type="text"
                  className="w-full border border-black rounded-lg px-3 py-2 mt-1 text-black"
                  value={clienteActual.nit}
                  onChange={(e) =>
                    setClienteActual({ ...clienteActual, nit: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-black">Correo</label>
                <input
                  type="email"
                  className="w-full border border-black rounded-lg px-3 py-2 mt-1 text-black"
                  value={clienteActual.correo}
                  onChange={(e) =>
                    setClienteActual({ ...clienteActual, correo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-black"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarCliente}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-black"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
