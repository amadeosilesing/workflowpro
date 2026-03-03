import StatusBadge from "@/components/ui/StatusBadge";
import { Task } from "@/db/schema";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
          task.status === "done" ? "bg-green-500 border-green-500" : "border-gray-600"
        }`} />
        <div>
          <p className={`text-sm font-medium ${task.status === "done" ? "line-through text-gray-500" : "text-white"}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-gray-500 text-xs mt-0.5">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={task.status as "todo" | "in_progress" | "done"} />
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.idTasks)}
            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}