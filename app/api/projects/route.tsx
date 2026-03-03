import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";

// GET → listar proyectos del usuario
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, payload.idUsers))
      .orderBy(projects.createdAt);

    return NextResponse.json(userProjects);

  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST → crear proyecto
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    const body = await req.json();
    const { name, description } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 });
    }

    const [newProject] = await db
      .insert(projects)
      .values({
        name: name.trim(),
        description: description?.trim() || null,
        userId: payload.idUsers,
      })
      .returning();

    return NextResponse.json(newProject, { status: 201 });

  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}