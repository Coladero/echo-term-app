// src/components/AuthForm.tsx
'use client';

import { useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-center text-blue-500 underline"
      >
        {isLogin ? 'Need to register?' : 'Already have an account?'}
      </button>
    </form>
  );
}
