import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ARTICLES_PATH } from "./lib/constants/constants";

const AUTH_COOKIE_NAME = "auth-token";
const AUTH_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.has(AUTH_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(isAuthenticated ? ARTICLES_PATH : "/login", request.url));
  }

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (AUTH_ROUTES.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL(ARTICLES_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};
