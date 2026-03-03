import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";

// PUT → editar tarea
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    const { id: rawId } = await params;
    const id = parseInt(rawId);

    const body = await req.json();
    const { title, description, status } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "El título es requerido" }, { status: 400 });
    }

    const validStatuses = ["todo", "in_progress", "done"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const [updated] = await db
      .update(tasks)
      .set({
        title: title.trim(),
        description: description?.trim() || null,
        status: status || "todo",
        updatedAt: new Date(),
      })
      .where(eq(tasks.idTasks, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    return NextResponse.json(updated);

  } catch (error) {
    console.error("PUT /api/tasks/[id] error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// DELETE → eliminar tarea
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    const { id: rawId } = await params;
    const id = parseInt(rawId);

    const [deleted] = await db
      .delete(tasks)
      .where(eq(tasks.idTasks, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tarea eliminada" });

  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}