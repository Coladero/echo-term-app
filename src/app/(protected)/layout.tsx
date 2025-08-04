// /app/(protected)/layout.tsx
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TerminalLayout from '@/components/TerminalLayout'

export default async function ProtectedLayout({ children }: { children: ReactNode; navItems?: { name: string; href: string }[] }) {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const navItems = [
    { name: 'Dashboard', href: '/notes' },
    { name: 'Logout', href: '/logout' },
  ]

  return (
    <TerminalLayout navItems={navItems}>
      {children}
    </TerminalLayout>
  )
}
