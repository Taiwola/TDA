/* eslint-disable @typescript-eslint/no-explicit-any */
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

interface SessionData {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  [key: string]: any;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Request path: ${pathname}`);

  // Skip middleware for public routes, static files, and API routes
  if (
    pathname === "/" || // Allow home page for all
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // Get session from cookies
  const sessionCookie = request.cookies.get("session")?.value;
  const session: SessionData = sessionCookie ? JSON.parse(sessionCookie) : {};
  console.log(`[Middleware] Session cookie: ${sessionCookie || "none"}`);

  const isAuthenticated = !!session.token; // Check if token exists
  const isAdmin = session.user?.role === "admin"; // Check if user is admin

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      // Unauthenticated users trying to access dashboard go to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isAdmin) {
      // Authenticated non-admins trying to access dashboard go to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow all other routes to proceed (including home page for admins)
  return NextResponse.next();
}

// Configure matcher to apply middleware to specific routes
export const config = {
  matcher: [
    "/dashboard/:path*", // Apply to dashboard and its subroutes
    "/((?!_next/static|_next/image|favicon.ico).*)", // Apply to all routes except static assets
  ],
};
