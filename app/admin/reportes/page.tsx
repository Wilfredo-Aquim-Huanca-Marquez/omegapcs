"use client";
import { useRouter } from "next/navigation";

export default function ReportesPage() {
  const router = useRouter();

  const handleLogout = () => router.push("/");
  const goTo = (path: string) => router.push(`/admin/${path}`);

  return (
    <div className="min-h-screen bg-[#f9fafc]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3h2a3 3 0 013 3v6a3 3 0 01-3 3h-2a3 3 0 01-3-3v-6zM6 9h.01M6 13h.01M6 17h.01M4 6h16M4 20h16" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">OmegaPC’s - Administrador</h1>
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
              tab.path === "reportes"
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Reportes de Ventas</h2>
          <p className="text-gray-500 text-sm mb-6">Resumen de facturación y ganancias</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Ventas", value: "Q30,000", desc: "Facturación total" },
              { label: "Ganancias", value: "Q5,800", desc: "Utilidad neta" },
              { label: "Facturas", value: "4", desc: "Facturas generadas" },
              { label: "Productos Vendidos", value: "8", desc: "Unidades totales" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <h3 className="text-2xl font-semibold mt-2 text-gray-800">{item.value}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Últimas Facturas</h2>
          <p className="text-gray-500 text-sm mb-4">Historial de transacciones recientes</p>

          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            {[
              { id: "INV-004", fecha: "12 de noviembre de 2025, 10:00 p.m.", total: "Q3,500", ganancia: "+Q700 ganancia" },
              { id: "INV-003", fecha: "12 de noviembre de 2025, 9:30 a.m.", total: "Q11,000", ganancia: "+Q2,000 ganancia" },
              { id: "INV-002", fecha: "11 de noviembre de 2025, 5:15 p.m.", total: "Q3,000", ganancia: "+Q700 ganancia" },
            ].map((factura) => (
              <div key={factura.id} className="flex justify-between items-center px-6 py-4">
                <div>
                  <p className="font-medium text-gray-800">{factura.id}</p>
                  <p className="text-sm text-gray-500">{factura.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{factura.total}</p>
                  <p className="text-sm text-green-600">{factura.ganancia}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
