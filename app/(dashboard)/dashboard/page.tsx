
export default function DashboardPage() {
  // Datos mock por ahora
  const stats = [
    { label: "Total Proyectos", value: 4, color: "bg-indigo-500" },
    { label: "Total Tareas", value: 12, color: "bg-blue-500" },
    { label: "En Progreso", value: 5, color: "bg-yellow-500" },
    { label: "Completadas", value: 3, color: "bg-green-500" },
  ];

  const recentTasks = [
    { id: 1, title: "Diseñar landing page", project: "Portfolio", status: "in_progress" },
    { id: 2, title: "Configurar base de datos", project: "WorkFlowPro", status: "done" },
    { id: 3, title: "Implementar auth", project: "WorkFlowPro", status: "todo" },
    { id: 4, title: "Crear componentes UI", project: "E-commerce", status: "in_progress" },
  ];

  const statusStyles: Record<string, string> = {
    todo:        "bg-gray-700 text-gray-300",
    in_progress: "bg-yellow-500/20 text-yellow-400",
    done:        "bg-green-500/20 text-green-400",
  };

  const statusLabels: Record<string, string> = {
    todo:        "Pendiente",
    in_progress: "En progreso",
    done:        "Completada",
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Resumen de tu actividad</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className={`w-2 h-2 rounded-full ${stat.color} mb-3`} />
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-white font-semibold">Tareas Recientes</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {recentTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{task.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{task.project}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[task.status]}`}>
                {statusLabels[task.status]}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}