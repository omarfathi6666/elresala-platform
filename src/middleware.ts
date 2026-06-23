import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("elresala_token")?.value;
  const { pathname } = request.nextUrl;

  // Public Routes
  if (
    pathname === "/admin/login" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password"
  ) {
    return NextResponse.next();
  }

  // Admin حماية صفحات الإدارة
  if (pathname.startsWith("/admin")) {
    try {
      if (!token) {
        return NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
      }

      const payload = await verifyToken(token);

      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
      }
    } catch {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  // Student حماية صفحات الطالب
  if (pathname.startsWith("/dashboard")) {
    try {
      if (!token) {
        return NextResponse.redirect(
          new URL("/login", request.url)
        );
      }

      const payload = await verifyToken(token);

      if (payload.role !== "STUDENT") {
        return NextResponse.redirect(
          new URL("/login", request.url)
        );
      }
    } catch {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
