"use client";

import { useState } from "react";
import { Task } from "@/db/schema";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

type Status = "todo" | "in_progress" | "done";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (title: string, description: string, status: Status) => Promise<void>;
  onClose: () => void;
}

export default function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Status>((task?.status as Status) || "todo");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onSubmit(title, description, status);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={task ? "Editar Tarea" : "Nueva Tarea"} onClose={onClose}>
      <div className="space-y-4">
        <Input
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre de la tarea"
        />
        <Textarea
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción opcional..."
        />
        {/* Solo mostrar status al editar */}
        {task && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option value="todo">Pendiente</option>
              <option value="in_progress">En progreso</option>
              <option value="done">Completada</option>
            </select>
          </div>
        )}
      </div>
      <div className="flex gap-3 mt-6">
        <Button variant="secondary" onClick={onClose} fullWidth>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={loading} fullWidth>
          {loading ? "Guardando..." : task ? "Guardar cambios" : "Crear tarea"}
        </Button>
      </div>
    </Modal>
  );
}