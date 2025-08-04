// components/TerminalLayout.tsx
import { ReactNode } from 'react'

type TerminalLayoutProps = {
  children: ReactNode
  navItems?: { name: string; href: string }[]
}

export default function TerminalLayout({ children, navItems }: TerminalLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <header className="p-4 border-b border-green-600 flex gap-4">
        {navItems?.map((item) => (
          <a key={item.href} href={item.href} className="hover:underline">
            {item.name}
          </a>
        ))}
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}
