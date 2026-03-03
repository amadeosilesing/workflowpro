"use client";

import { useState, useEffect } from "react";
import { Project } from "@/db/schema";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Error al cargar proyectos");
      const data = await res.json();
      setProjects(data);
    } catch {
      setError("Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name: string, description: string) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (!res.ok) throw new Error("Error al crear proyecto");
    await fetchProjects();
  };

  const updateProject = async (id: number, name: string, description: string) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (!res.ok) throw new Error("Error al actualizar proyecto");
    await fetchProjects();
  };

  const deleteProject = async (id: number) => {
  const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
  const data = await res.json();
  console.log("DELETE response:", res.status, data); // ← agrega esto
  if (!res.ok) throw new Error("Error al eliminar proyecto");
  await fetchProjects();
};

  useEffect(() => { fetchProjects(); }, []);

  return { projects, loading, error, createProject, updateProject, deleteProject };
}