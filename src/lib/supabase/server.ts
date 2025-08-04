// src/lib/supabase/server.ts

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
}
