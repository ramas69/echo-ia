import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier que les variables d'environnement sont définies
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Si variables manquantes, laisser passer (pour éviter les crashes)
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Routes publiques
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/callback',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/le-programme',
    '/offres',
    '/candidature-vip',
    '/mentions-legales',
    '/cgv',
  ];

  // Routes API publiques
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return response;
  }

  // Si pas de session et route protégée
  if (!session && !publicRoutes.includes(pathname)) {
    const redirectUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

    // Si session existe, récupérer le rôle
    if (session) {
      try {
        const { data: userData } = await supabase
          .from('User')
          .select('role')
          .eq('id', session.user.id)
          .single();

        const userRole = userData?.role;

        // Redirection automatique si déjà connecté et sur page auth
        if (pathname === '/auth/login' || pathname === '/auth/register') {
          const redirectUrl = new URL(
            userRole === 'ADMIN' ? '/admin' : '/academie',
            request.url
          );
          return NextResponse.redirect(redirectUrl);
        }

        // Protection des routes admin
        if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
          const redirectUrl = new URL('/', request.url);
          return NextResponse.redirect(redirectUrl);
        }
      } catch (error) {
        // En cas d'erreur DB, continuer sans redirection
      }
    }

    return response;
  } catch (error) {
    // En cas d'erreur, laisser passer pour éviter les crashes
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
