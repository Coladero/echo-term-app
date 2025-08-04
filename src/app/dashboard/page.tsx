// src/app/dashboard/page.tsx

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/auth/login');

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
    </div>
  );
}
