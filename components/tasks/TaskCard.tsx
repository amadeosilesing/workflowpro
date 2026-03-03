import StatusBadge from "@/components/ui/StatusBadge";
import { Task } from "@/db/schema";

type Status = "todo" | "in_progress" | "done";

const nextStatus: Record<Status, Status> = {
  todo:        "in_progress",
  in_progress: "done",
  done:        "todo",
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const currentStatus = task.status as Status;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        {/* Checkbox clickeable */}
        <button
          onClick={() => onStatusChange(task.idTasks, nextStatus[currentStatus])}
          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition hover:scale-110 ${
            currentStatus === "done"
              ? "bg-green-500 border-green-500"
              : currentStatus === "in_progress"
              ? "border-yellow-400"
              : "border-gray-600 hover:border-indigo-400"
          }`}
        />
        <div>
          <p className={`text-sm font-medium ${currentStatus === "done" ? "line-through text-gray-500" : "text-white"}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-gray-500 text-xs mt-0.5">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Badge clickeable */}
        <button
          onClick={() => onStatusChange(task.idTasks, nextStatus[currentStatus])}
          className="hover:opacity-70 transition"
          title="Click para cambiar estado"
        >
          <StatusBadge status={currentStatus} />
        </button>

        {/* Acciones */}
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