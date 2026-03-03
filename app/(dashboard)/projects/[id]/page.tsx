"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Task } from "@/db/schema";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import Button from "@/components/ui/Button";

type FilterType = "all" | "todo" | "in_progress" | "done";
type Status = "todo" | "in_progress" | "done";

const filterLabels: Record<string, string> = {
  all:         "Todas",
  todo:        "Pendiente",
  in_progress: "En progreso",
  done:        "Completada",
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const projectId = parseInt(id as string);

  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks(projectId);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = filter === "all"
    ? tasks
    : tasks.filter((t) => t.status === filter);

  const handleCreate = async (title: string, description: string, status: Status) => {
    await createTask(title, description);
  };

  const handleEdit = async (title: string, description: string, status: Status) => {
    if (!editingTask) return;
    await updateTask(editingTask.idTasks, title, description, status);
    setEditingTask(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta tarea?")) return;
    await deleteTask(id);
  };

  const handleStatusChange = async (id: number, status: Status) => {
    const task = tasks.find((t) => t.idTasks === id);
    if (!task) return;
    await updateTask(id, task.title, task.description || "", status);
  };

  return (
    <div className="space-y-6">

      {/* Back + Header */}
      <div>
        <Link href="/projects" className="text-gray-500 hover:text-white text-sm flex items-center gap-1 mb-4 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a proyectos
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Tareas del proyecto</h1>
            <p className="text-gray-400 text-sm mt-1">{tasks.length} tareas en total</p>
          </div>
          <Button onClick={() => setShowForm(true)}>+ Nueva tarea</Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {(["all", "todo", "in_progress", "done"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500">Cargando tareas...</div>
      )}

      {/* Empty state */}
      {!loading && tasks.length === 0 && (
        <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-gray-400 font-medium">No hay tareas en este proyecto</p>
          <p className="text-gray-600 text-sm mt-1">Crea tu primera tarea para comenzar</p>
        </div>
      )}

      {/* Lista de tareas */}
      {!loading && filteredTasks.length > 0 && (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.idTasks}
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={() => handleDelete(task.idTasks)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Modal crear */}
      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Modal editar */}
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleEdit}
          onClose={() => setEditingTask(null)}
        />
      )}

    </div>
  );
}