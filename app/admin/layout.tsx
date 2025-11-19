import Link from "next/link";

export const metadata = {
  title: "OmegaPC's - Administrador",
  description: "Panel de control de OmegaPC's",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div>
          <h1 className="text-xl font-semibold text-black">
            OmegaPC's - Administrador
          </h1>
          <p className="text-sm text-gray-500">Panel de Control</p>
        </div>
      </header>

      {/* Contenido dinámico */}
      <main className="p-8">{children}</main>
    </div>
  );
}
