import Link from "next/link";
import { ProjectWithTasks } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: ProjectWithTasks;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const progress = project.totalTasks > 0
    ? Math.round((project.doneTasks / project.totalTasks) * 100)
    : 0;

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 transition group">

      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 bg-indigo-600/20 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>

        {/* Acciones */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Clickeable solo el contenido */}
      <Link href={`/projects/${project.idProjects}`}>
        <h3 className="text-white font-semibold hover:text-indigo-400 transition">
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>{project.doneTasks}/{project.totalTasks} tareas</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </Link>

    </div>
  );
}