// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import TerminalLayout from '@/components/TerminalLayout'

export const metadata: Metadata = {
  title: 'EchoTerm',
  description: 'Ai created audio notes',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TerminalLayout>
          {children}
        </TerminalLayout>
      </body>
    </html>
  )
}
