import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function auth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;

  if (!accessToken || !refreshToken) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

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

