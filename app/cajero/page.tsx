"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function CajeroPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  // ──────────────── Datos de Ejemplo ────────────────
  const productosEjemplo = [
    { nombre: "AMD Ryzen 5 5600G", precio: 850 },
    { nombre: "Intel i5 12400F", precio: 1080 },
    { nombre: "NVIDIA RTX 4060 8GB", precio: 2600 },
    { nombre: "SSD NVMe 1TB Samsung", precio: 450 },
    { nombre: "Teclado Mecánico Redragon Kumara", precio: 150 },
    { nombre: "Memoria RAM 16GB DDR4 Kingston Fury", precio: 300 },
    { nombre: "Gabinete Gamer Corsair 4000D", precio: 520 },
  ];

  const clientesEjemplo = [
    "Juan Pérez - CF",
    "María López - CF",
    "Carlos Fernández - CF",
    "Empresa Tech Solutions - NIT 12003344",
    "Computech SRL - NIT 90012321",
    "Importadora MegaPC - NIT 80055672",
  ];

  // ──────────────── Estados ────────────────
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [mostrarFactura, setMostrarFactura] = useState(false);

  // ──────────────── Agregar al Carrito ────────────────
  const agregarProducto = () => {
    if (!productoSeleccionado) return alert("Seleccione un producto");

    const productoInfo = productosEjemplo.find(
      (p) => p.nombre === productoSeleccionado
    );

    const existe = carrito.find((item) => item.nombre === productoSeleccionado);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.nombre === productoSeleccionado
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...productoInfo, cantidad: 1 }]);
    }
  };

  // ──────────────── Modificar Cantidad ────────────────
  const cambiarCantidad = (nombre, suma) => {
    const nuevoCarrito = carrito
      .map((item) =>
        item.nombre === nombre
          ? { ...item, cantidad: item.cantidad + suma }
          : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevoCarrito);
  };

  // ──────────────── Eliminar Producto ────────────────
  const eliminarProducto = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  // ──────────────── Calcular Totales ────────────────
  const totalProductos = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );
  const totalPago = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NO IMPRIMIR BOTONES */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <div>
          <h1 className="text-lg font-semibold text-black">OmegaPC's - Cajero</h1>
          <p className="text-sm text-gray-500">Sistema de Ventas</p>
        </div>

        <button
          onClick={handleLogout}
          className="no-print flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-black"
        >
          🔒 Cerrar Sesión
        </button>
      </header>

      {/* TABS */}
      <div className="no-print flex gap-4 px-8 py-4">
        <Link
          href="/cajero"
          className="px-6 py-2 rounded-full font-medium bg-gray-200 text-black"
        >
          Ventas
        </Link>
        <Link
          href="/cajero/inventario"
          className="px-6 py-2 rounded-full font-medium text-gray-500 hover:bg-gray-200"
        >
          Inventario
        </Link>
        <Link
          href="/cajero/clientes"
          className="px-6 py-2 rounded-full font-medium text-gray-500 hover:bg-gray-200"
        >
          Clientes
        </Link>
      </div>

      {/* CONTENIDO */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 pb-10">

        {/* PRODUCTOS */}
        <section className="no-print bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-black">Seleccionar Productos</h2>

          <label className="text-sm font-medium text-black mt-3">Producto</label>

          <div className="flex gap-2 mt-1">
            <select
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-black"
              onChange={(e) => setProductoSeleccionado(e.target.value)}
            >
              <option value="">Selecciona un producto</option>
              {productosEjemplo.map((prod, i) => (
                <option key={i}>{prod.nombre}</option>
              ))}
            </select>

            <button
              onClick={agregarProducto}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Agregar
            </button>
          </div>
        </section>

        {/* CARRITO */}
        <section className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-black">
          <h2 className="text-lg font-semibold text-black">🛒 Carrito de Compra</h2>
          <p className="text-gray-500">{totalProductos} producto(s)</p>

          {carrito.length === 0 ? (
            <div className="text-gray-500 mt-4">El carrito está vacío</div>
          ) : (
            <>
              <div className="mt-4 space-y-4">
                {carrito.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.nombre}</p>
                      <p className="text-sm text-gray-500">Bs. {item.precio}</p>
                    </div>

                    <div className="flex items-center gap-3 no-print">
                      <button
                        onClick={() => cambiarCantidad(item.nombre, -1)}
                        className="px-2"
                      >
                        ➖
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(item.nombre, 1)}
                        className="px-2"
                      >
                        ➕
                      </button>
                      <button
                        onClick={() => eliminarProducto(item.nombre)}
                        className="text-red-500"
                      >
                        🗑
                      </button>
                    </div>

                    <span className="font-semibold">
                      Bs. {item.precio * item.cantidad}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 text-lg font-semibold">
                <span>Total:</span>
                <span>Bs. {totalPago}</span>
              </div>

              <button
                onClick={() => setMostrarFactura(true)}
                className="no-print w-full mt-5 bg-black text-white py-2 rounded-lg hover:bg-gray-800 flex justify-center gap-2"
              >
                🧾 Generar Factura y Enviar
              </button>
            </>
          )}
        </section>

        {/* CLIENTE */}
        <section className="no-print bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-black">Cliente</h2>

          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black mt-2"
            onChange={(e) => setClienteSeleccionado(e.target.value)}
          >
            <option>Selecciona un cliente</option>
            {clientesEjemplo.map((cli, i) => (
              <option key={i}>{cli}</option>
            ))}
          </select>
        </section>
      </main>

      {/* ──────────────────────── MODAL FACTURA ──────────────────────── */}
      {mostrarFactura && (
  <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] text-black">

      <h2 className="text-center text-sm">Factura Generada</h2>

      <p className="text-center text-sm">
        La factura ha sido generada exitosamente.
      </p>

      <hr className="my-4" />

      <div className="text-center">
        <h3 className="font-bold text-xl">OmegaPC's</h3>
        <p className="text-sm">Computadoras y Componentes</p>
        <p className="text-sm">ventas@omegapcs.com</p>
      </div>

      <table className="mt-4 w-full text-sm">
        <tbody>
          {carrito.map((item, i) => (
            <tr key={i}>
              <td>
                {item.cantidad}x {item.nombre}
              </td>
              <td className="text-right">
                Bs. {item.precio * item.cantidad}
              </td>
            </tr>
          ))}

          <tr className="font-bold border-t">
            <td className="pt-2">Total:</td>
            <td className="text-right pt-2">Bs. {totalPago}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between mt-6 no-print">
        <button
          onClick={() => setMostrarFactura(false)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cerrar
        </button>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          🖨 Imprimir
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
