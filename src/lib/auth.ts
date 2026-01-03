import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function auth() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Ignore les erreurs (dans certains contextes, set n'est pas autorisé)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Ignore les erreurs
          }
        },
      },
    }
  );

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  // Récupérer le rôle de l'utilisateur
  const { data: userData } = await supabase
    .from('User')
    .select('role, name, email')
    .eq('id', session.user.id)
    .single();

  return {
    user: {
      id: session.user.id,
      email: session.user.email!,
      name: userData?.name || session.user.email!,
      role: userData?.role || 'STUDENT',
    },
  };
}

