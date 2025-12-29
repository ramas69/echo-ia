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

  console.log("🔍 MIDDLEWARE:", {
    path: nextUrl.pathname,
    isLoggedIn,
    role,
    isApiAuthRoute,
    isApiRegisterRoute,
    isPublicRoute,
    isAdminRoute
  });

  // Laisser passer les routes API publiques
  if (isApiAuthRoute || isApiRegisterRoute) {
    console.log("✅ Route API autorisée:", nextUrl.pathname);
    return;
  }

  // TEMPORAIREMENT DÉSACTIVÉ pour debug
  // Redirection automatique si déjà connecté (sauf pour logout)
  // if (isLoggedIn && (nextUrl.pathname === "/auth/login" || nextUrl.pathname === "/auth/register") && nextUrl.pathname !== "/auth/logout") {
  //   const redirectTo = role === "ADMIN" ? "/admin" : "/academie";
  //   console.log("🔄 Utilisateur connecté sur page auth, redirection vers:", redirectTo);
  //   return Response.redirect(new URL(redirectTo, nextUrl));
  // }

  // Protection des routes
  if (!isLoggedIn && !isPublicRoute) {
    console.log("🔒 Route protégée, redirection vers /auth/login");
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Protection admin
  if (isLoggedIn && isAdminRoute && role !== "ADMIN") {
    console.log("⛔ Non-admin tente d'accéder à admin, redirection vers /");
    return Response.redirect(new URL("/", nextUrl));
  }

  console.log("✅ Accès autorisé");
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
