"use client";

import { useState, useEffect } from "react";
import { Task } from "@/db/schema";

export function useTasks(projectId: number) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tasks?projectId=${projectId}`);
      if (!res.ok) throw new Error("Error al cargar tareas");
      const data = await res.json();
      setTasks(data);
    } catch {
      setError("Error al cargar tareas");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string, description: string) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, projectId }),
    });
    if (!res.ok) throw new Error("Error al crear tarea");
    await fetchTasks();
  };

  const updateTask = async (id: number, title: string, description: string, status: string) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });
    if (!res.ok) throw new Error("Error al actualizar tarea");
    await fetchTasks();
  };

  const deleteTask = async (id: number) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar tarea");
    await fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, [projectId]);

  return { tasks, loading, error, createTask, updateTask, deleteTask };
}