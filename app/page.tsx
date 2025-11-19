"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Credenciales de prueba
    if (user === "cajero" && password === "cajero123") {
      router.push("/cajero");
    } else if (user === "admin" && password === "admin123") {
      router.push("/admin"); // futuro dashboard de admin
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4ff] to-[#e8edff]">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#5B3DF5] p-4 rounded-full mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">OmegaPC's</h1>
          <p className="text-gray-500 text-sm">Sistema de Punto de Venta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-black">Usuario</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Ingresa tu usuario"
              className="w-full border border-black rounded-lg px-3 py-2 mt-1 text-black"
            />
          </div>
          <div>
            <label className="block text-sm text-black">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full border border-black rounded-lg px-3 py-2 mt-1 text-black"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <hr className="my-6" />

        <div className="space-y-2 text-sm text-gray-700">
          <p className="font-medium">Usuarios de prueba:</p>

          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 p-2 rounded-md">
            <b>Cajero:</b> <code>cajero / cajero123</code>
          </div>

          <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 p-2 rounded-md">
            <b>Admin:</b> <code>admin / admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
