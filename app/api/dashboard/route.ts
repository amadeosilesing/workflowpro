import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    // Proyectos del usuario
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, payload.idUsers));

    const projectIds = userProjects.map((p) => p.idProjects);

    // Si no hay proyectos retornar stats vacías
    if (projectIds.length === 0) {
      return NextResponse.json({
        totalProjects: 0,
        totalTasks: 0,
        inProgressTasks: 0,
        doneTasks: 0,
        recentTasks: [],
      });
    }

    // Todas las tareas de todos los proyectos del usuario
    const allTasks = await db
      .select({
        idTasks:     tasks.idTasks,
        title:       tasks.title,
        status:      tasks.status,
        projectId:   tasks.projectId,
        projectName: projects.name,
        createdAt:   tasks.createdAt,
      })
      .from(tasks)
      .innerJoin(projects, eq(tasks.projectId, projects.idProjects))
      .where(eq(projects.userId, payload.idUsers))
      .orderBy(tasks.createdAt);

    const totalTasks     = allTasks.length;
    const inProgressTasks = allTasks.filter((t) => t.status === "in_progress").length;
    const doneTasks      = allTasks.filter((t) => t.status === "done").length;

    // Últimas 5 tareas
    const recentTasks = allTasks.slice(-5).reverse();

    return NextResponse.json({
      totalProjects: userProjects.length,
      totalTasks,
      inProgressTasks,
      doneTasks,
      recentTasks,
    });

  } catch (error) {
    console.error("GET /api/dashboard error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}