import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as any;
  const next = requestUrl.searchParams.get('next') ?? '/academie';

  if (token_hash && type) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Rediriger vers l'académie après confirmation
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // En cas d'erreur, rediriger vers login avec message
  return NextResponse.redirect(new URL('/auth/login?error=confirmation_failed', request.url));
}

