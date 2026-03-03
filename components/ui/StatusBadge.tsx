type Status = "todo" | "in_progress" | "done";

const statusStyles: Record<Status, string> = {
  todo:        "bg-gray-700 text-gray-300",
  in_progress: "bg-yellow-500/20 text-yellow-400",
  done:        "bg-green-500/20 text-green-400",
};

const statusLabels: Record<Status, string> = {
  todo:        "Pendiente",
  in_progress: "En progreso",
  done:        "Completada",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}