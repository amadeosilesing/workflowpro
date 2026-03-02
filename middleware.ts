import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/projects");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Sin token intentando acceder a ruta protegida
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Con token válido intentando acceder a login/register
  if (isAuthPage && token) {
    const payload = verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/login", "/register"],
};