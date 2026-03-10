import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">WorkFlowPro</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition">
              Iniciar sesión
            </a>
            <a href="/register" className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition">
              Registrarse
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            Gestión de proyectos moderna
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Organiza tu trabajo,{" "}
            <span className="text-indigo-400">multiplica</span>{" "}
            tu productividad
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            WorkFlowPro te permite gestionar proyectos y tareas de manera simple y efectiva.
            Sin distracciones, solo resultados.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/register" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition text-sm">
              Empezar gratis
            </a>
            <a href="/login" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl transition text-sm">
              Ya tengo cuenta
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              ),
              title: "Proyectos organizados",
              description: "Crea proyectos y agrupa tus tareas de manera clara y estructurada.",
            },
            {
              icon: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
              title: "Seguimiento de tareas",
              description: "Cambia el estado de tus tareas entre Pendiente, En progreso y Completada.",
            },
            {
              icon: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Dashboard con métricas",
              description: "Visualiza tu progreso con estadísticas claras en tiempo real.",
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="w-9 h-9 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6">
        <p className="text-center text-gray-600 text-sm">
          © 2024 WorkFlowPro. Construido con Next.js y Drizzle ORM.
        </p>
      </footer>

    </div>
  );
}