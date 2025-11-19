"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CajeroLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-lg font-semibold text-black">OmegaPC's - Cajero</h1>
            <p className="text-sm text-gray-500">Sistema de Ventas</p>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="px-8 pb-10">{children}</main>
    </div>
    
  );
}
