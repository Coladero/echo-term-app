// app/page.tsx
'use client'

import TerminalLayout from '@/components/TerminalLayout'

export default function Home() {
  return (
    <TerminalLayout navItems={[{ name: 'Home', href: '/' }]}>
      <div className="text-white">Welcome back Tori!</div>
    </TerminalLayout>
  )
}
