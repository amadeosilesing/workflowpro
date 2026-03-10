import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center">

        {/* Número 404 */}
        <h1 className="text-8xl font-extrabold text-indigo-600 mb-4">404</h1>

        {/* Mensaje */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
          La página que buscas no existe o fue movida a otra dirección.
        </p>

        {/* Acciones */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition"
          >
            Ir al Dashboard
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg transition"
          >
            Ir al Inicio
          </Link>
        </div>

      </div>
    </div>
  );
}