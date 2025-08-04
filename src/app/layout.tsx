// src/app/layout.tsx

import './globals.css';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import TerminalLayout from '@/components/TerminalLayout';

export const metadata = {
  title: 'EchoTerm',
  description: 'Secure voice notes in a terminal-style interface',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Opcional: forzar login solo si layout es globalmente protegido
  // Si sólo algunas páginas necesitan protección, haz esto dentro de esa página específica
  // if (!session) redirect('/auth/login');

  return (
    <html lang="en">
      <body className="bg-black text-green-400 font-mono min-h-screen">
        <TerminalLayout>
          {children}
        </TerminalLayout>
      </body>
    </html>
  );
}
