import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/academie';

  console.log('🔍 CALLBACK - URL complète:', requestUrl.href);
  console.log('🔍 CALLBACK - Code reçu:', code);

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    console.log('🔄 CALLBACK - Tentative exchangeCodeForSession...');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      console.log('✅ CALLBACK - Session créée avec succès!', data.session.user.email);
      return NextResponse.redirect(new URL(next, request.url));
    }

    console.error('❌ CALLBACK - Erreur exchangeCodeForSession:', error?.message, error?.status);
    console.error('❌ CALLBACK - Détails complets:', JSON.stringify(error, null, 2));
  } else {
    console.error('❌ CALLBACK - Aucun code dans l\'URL!');
  }

  // En cas d'erreur, rediriger vers login
  return NextResponse.redirect(new URL('/auth/login?error=confirmation_failed', request.url));
}
