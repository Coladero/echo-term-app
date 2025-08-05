// /lib/supabase/server.ts
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../../types/supabase'
import { createServerClient } from '@supabase/ssr';

export function createClient() {
  return createServerComponentClient<Database>({ cookies })
}

export const serverClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (key: string) => {
          const cookie = (await cookieStore).get(key);
          return cookie?.value;
        },
      },
    }
  );
};

export async function getUserMetadata() {
  const supabase = serverClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email,
  };
}
