"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Cliente {
  id: number;
  nombre: string;
  nit: string;
  correo: string;
}

export default function ClientesPage() {
  const router = useRouter();

  const handleLogout = () => router.push("/");

  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      nombre: "Tech Solutions S.A.",
      nit: "1234567-8",
      correo: "ventas@techsolutions.com",
    },
    {
      id: 2,
      nombre: "Juan Pérez",
      nit: "CF",
      correo: "juan.perez@email.com",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    nit: "",
    correo: "",
  });

  const agregarCliente = () => {
    if (!form.nombre.trim()) return alert("El nombre es obligatorio");

    const nuevo: Cliente = {
      id: Date.now(),
      nombre: form.nombre,
      nit: form.nit || "CF",
      correo: form.correo || "—",
    };

    setClientes((prev) => [...prev, nuevo]);
    setModal(false);
    setForm({ nombre: "", nit: "", correo: "" });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
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
        <Link href="/cajero" className="px-6 py-2 rounded-full font-medium text-black hover:bg-gray-200">
          Ventas
        </Link>

        <Link href="/cajero/inventario" className="px-6 py-2 rounded-full font-medium text-black hover:bg-gray-200">
          Inventario
        </Link>

        <Link href="/cajero/clientes" className="px-6 py-2 rounded-full font-medium bg-gray-200 text-black">
          Clientes
        </Link>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="px-8 pb-10">
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">

          {/* Título + botón */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-black">Clientes Registrados</h2>
              <p className="text-black text-sm">Total: {clientes.length} clientes</p>
            </div>

            <button
              onClick={() => setModal(true)}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            >
               Nuevo Cliente
            </button>
          </div>

          {/* Lista */}
          <div className="space-y-4 mt-4">
            {clientes.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-white border rounded-xl shadow-sm flex flex-col gap-1"
              >
                <p className="font-semibold text-black text-lg">👤 {c.nombre}</p>
                <p className="text-black text-sm">📄 NIT: {c.nit}</p>
                <p className="text-black text-sm">✉️ {c.correo}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-black">Agregar Cliente</h3>

            <div className="space-y-3">
              <input
                className="w-full border rounded-lg p-2 text-black"
                placeholder="Nombre del cliente"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />

              <input
                className="w-full border rounded-lg p-2 text-black"
                placeholder="NIT"
                value={form.nit}
                onChange={(e) => setForm({ ...form, nit: e.target.value })}
              />

              <input
                className="w-full border rounded-lg p-2 text-black"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModal(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition"
              >
                Cancelar
              </button>

              <button
                onClick={agregarCliente}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
