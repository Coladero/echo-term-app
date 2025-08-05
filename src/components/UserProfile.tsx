// src/components/UserProfile.tsx
import React from 'react';
import { User } from '@supabase/supabase-js';

interface UserProfileProps {
  user: {
    id: string;
    email: string;
    created_at: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  // user.metadata puede contener info adicional, pero email y created_at vienen en user directamente
  // created_at puede no estar en user directamente, debemos obtenerlo de Supabase
  // Por ahora mostraremos email y user id

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Email:</h2>
        <p className="text-zinc-300">{user.email}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">User ID:</h2>
        <p className="text-zinc-300">{user.id}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Account Created:</h2>
        <p className="text-zinc-300">{new Date(user.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}
