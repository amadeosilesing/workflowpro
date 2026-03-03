import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";

// GET → listar tareas de un proyecto
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ error: "projectId es requerido" }, { status: 400 });
    }

    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, parseInt(projectId)))
      .orderBy(tasks.createdAt);

    return NextResponse.json(projectTasks);

  } catch (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST → crear tarea
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    const body = await req.json();
    const { title, description, projectId } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "El título es requerido" }, { status: 400 });
    }

    if (!projectId) {
      return NextResponse.json({ error: "projectId es requerido" }, { status: 400 });
    }

    const [newTask] = await db
      .insert(tasks)
      .values({
        title: title.trim(),
        description: description?.trim() || null,
        status: "todo",
        projectId: parseInt(projectId),
      })
      .returning();

    return NextResponse.json(newTask, { status: 201 });

  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}