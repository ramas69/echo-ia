import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // @ts-ignore
  const role = req.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isApiRegisterRoute = nextUrl.pathname === "/api/register";
  const isPublicRoute = ["/", "/auth/login", "/auth/register", "/auth/logout", "/le-programme", "/offres", "/candidature-vip", "/mentions-legales", "/cgv"].includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // Laisser passer les routes API publiques
  if (isApiAuthRoute || isApiRegisterRoute) {
    return;
  }

  // Redirection automatique si déjà connecté (sauf pour logout)
  if (isLoggedIn && (nextUrl.pathname === "/auth/login" || nextUrl.pathname === "/auth/register") && nextUrl.pathname !== "/auth/logout") {
    const redirectTo = role === "ADMIN" ? "/admin" : "/academie";
    return Response.redirect(new URL(redirectTo, nextUrl));
  }

  // Protection des routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Protection admin
  if (isLoggedIn && isAdminRoute && role !== "ADMIN") {
    return Response.redirect(new URL("/", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - api/register
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api/auth|api/register|_next/static|_next/image|favicon.ico|.*\\..*).*)' 
  ],
};
