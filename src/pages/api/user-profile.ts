// src/pages/api/user-profile.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { getUserProfile } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.token as string | undefined;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verificar sesión con token
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    const profile = await getUserProfile(user.id);
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
}
