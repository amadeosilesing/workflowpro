import Link from "next/link";
import { Project } from "@/db/schema";

interface ProjectCardProps {
  project: Project & { tasks: { total: number; done: number } };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const progress = project.tasks.total > 0
    ? Math.round((project.tasks.done / project.tasks.total) * 100)
    : 0;

  return (
    <Link href={`/projects/${project.idProjects}`}>
      <div className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 transition cursor-pointer group">

        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 bg-indigo-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-white font-semibold group-hover:text-indigo-400 transition">
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>{project.tasks.done}/{project.tasks.total} tareas</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

      </div>
    </Link>
  );
}