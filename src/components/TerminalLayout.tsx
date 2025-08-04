// src/components/TerminalLayout.tsx

'use client';

import { ReactNode } from 'react';

export default function TerminalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto my-8 border-2 border-green-500 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-green-800 text-white px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 font-bold text-sm">EchoTerm - Secure Notes</span>
      </div>
      <div className="bg-black text-green-400 p-4 font-mono min-h-[400px]">
        {children}
      </div>
    </div>
  );
}
