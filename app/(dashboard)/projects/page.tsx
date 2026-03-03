"use client";

import { useState } from "react";
import { Project } from "@/db/schema";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectForm from "@/components/projects/ProjectForm";
import Button from "@/components/ui/Button";

export default function ProjectsPage() {
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleCreate = async (name: string, description: string) => {
    await createProject(name, description);
  };

  const handleEdit = async (name: string, description: string) => {
    if (!editingProject) return;
    await updateProject(editingProject.idProjects, name, description);
    setEditingProject(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    await deleteProject(id);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Proyectos</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} proyectos en total</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          + Nuevo proyecto
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500">Cargando proyectos...</div>
      )}

      {/* Empty state */}
      {!loading && projects.length === 0 && (
        <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-gray-400 font-medium">No tienes proyectos aún</p>
          <p className="text-gray-600 text-sm mt-1">Crea tu primer proyecto para comenzar</p>
        </div>
      )}

      {/* Grid */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.idProjects}
              project={{ ...project, tasks: { total: 0, done: 0 } }}
              onEdit={() => setEditingProject(project)}
              onDelete={() => handleDelete(project.idProjects)}
            />
          ))}
        </div>
      )}

      {/* Modal crear */}
      {showForm && (
        <ProjectForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Modal editar */}
      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleEdit}
          onClose={() => setEditingProject(null)}
        />
      )}

    </div>
  );
}