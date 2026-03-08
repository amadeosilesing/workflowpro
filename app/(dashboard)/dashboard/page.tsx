"use client";

import { useDashboard } from "@/hooks/useDashboard";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Link from "next/link";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  const statsCards = [
    { label: "Total Proyectos",  value: stats.totalProjects,   color: "bg-indigo-500" },
    { label: "Total Tareas",     value: stats.totalTasks,      color: "bg-blue-500"   },
    { label: "En Progreso",      value: stats.inProgressTasks, color: "bg-yellow-500" },
    { label: "Completadas",      value: stats.doneTasks,       color: "bg-green-500"  },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Resumen de tu actividad</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-gray-700 mb-3" />
              <div className="h-8 w-12 bg-gray-700 rounded mb-2" />
              <div className="h-3 w-24 bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      {/* Recent Tasks */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-white font-semibold">Tareas Recientes</h2>
          <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 text-sm transition">
            Ver proyectos →
          </Link>
        </div>

        {loading ? (
          <div className="divide-y divide-gray-800">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between animate-pulse">
                <div className="space-y-2">
                  <div className="h-3 w-40 bg-gray-700 rounded" />
                  <div className="h-2 w-24 bg-gray-700 rounded" />
                </div>
                <div className="h-6 w-20 bg-gray-700 rounded-full" />
              </div>
            ))}
          </div>
        ) : stats.recentTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 font-medium">No hay tareas aún</p>
            <p className="text-gray-600 text-sm mt-1">
              Crea un{" "}
              <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 transition">
                proyecto
              </Link>{" "}
              para comenzar
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {stats.recentTasks.map((task) => (
              <div key={task.idTasks} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{task.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{task.projectName}</p>
                </div>
                <StatusBadge status={task.status as "todo" | "in_progress" | "done"} />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}