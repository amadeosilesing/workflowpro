"use client";

import { useState } from "react";
import { Project } from "@/db/schema";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (name: string, description: string) => Promise<void>;
  onClose: () => void;
}

export default function ProjectForm({ project, onSubmit, onClose }: ProjectFormProps) {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onSubmit(name, description);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={project ? "Editar Proyecto" : "Nuevo Proyecto"} onClose={onClose}>
      <div className="space-y-4">
        <Input
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mi nuevo proyecto"
        />
        <Textarea
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del proyecto..."
        />
      </div>
      <div className="flex gap-3 mt-6">
        <Button variant="secondary" onClick={onClose} fullWidth>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={loading} fullWidth>
          {loading ? "Guardando..." : project ? "Guardar cambios" : "Crear proyecto"}
        </Button>
      </div>
    </Modal>
  );
}