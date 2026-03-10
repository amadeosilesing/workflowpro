import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Token inválido" }, { status: 401 });

    return NextResponse.json({
      name:  payload.name,
      email: payload.email,
    });

  } catch (error) {
    console.error("GET /api/auth/me error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}