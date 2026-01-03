import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  // Récupérer le token depuis les cookies
  const token = request.cookies.get('sb-access-token')?.value;
  
  let session = null;
  if (token) {
    const { data: { session: userSession } } = await supabase.auth.getSession();
    session = userSession;
  }

  const { pathname } = request.nextUrl;

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
  if (pathname.startsWith('/api/auth') || pathname === '/api/register') {
    return NextResponse.next();
  }

  // Si pas de session et route protégée
  if (!session && !publicRoutes.includes(pathname)) {
    const redirectUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Si session existe, récupérer le rôle
  if (session) {
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
