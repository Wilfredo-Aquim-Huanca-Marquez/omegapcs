export default function LoginPage() {
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

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              className="mt-1 w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="mt-1 w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]"
            />
          </div>

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-blue-600"
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
            <span>
              <b>Cajero:</b> <code>cajero / cajero123</code>
            </span>
          </div>

          <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v1h2v-1a4 4 0 00-8 0v1h2v-1zm-4 5h8v2H8v-2z"
              />
            </svg>
            <span>
              <b>Admin:</b> <code>admin / admin123</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
