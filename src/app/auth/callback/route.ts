import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  
  // Nouveau système Supabase : code dans l'URL
  const code = requestUrl.searchParams.get('code');
  
  // Ancien système : token_hash (pour Magic Link et Reset Password)
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as any;
  
  const next = requestUrl.searchParams.get('next') ?? '/academie';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Nouveau système (confirmation email avec code)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Email confirmé avec succès !
      return NextResponse.redirect(new URL(next, request.url));
    }
    
    console.error('Erreur confirmation email:', error);
  }

  // Ancien système (Magic Link, Reset Password)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
    
    console.error('Erreur verify OTP:', error);
  }

  // En cas d'erreur, rediriger vers login avec message
  return NextResponse.redirect(new URL('/auth/login?error=confirmation_failed', request.url));
}
