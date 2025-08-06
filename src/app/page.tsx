'use client';

import { useState } from 'react';
import TerminalLayout from '@/components/TerminalLayout';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithOAuth,
} from '@/lib/auth';
import Image from 'next/image';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = sign up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Manejar login o signup con email + password
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // Login
        await signInWithEmail(email, password);
        setMessage('✅ Logged in successfully!');
      } else {
        // Sign Up
        await signUpWithEmail(email, password);
        setMessage('✅ Account created successfully! Please check your email.');
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message || 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  }

  // Login con OAuth (Google, GitHub)
  async function handleOAuth(provider: 'google' | 'github') {
    setLoading(true);
    setMessage('');

    try {
      await signInWithOAuth(provider);
      setMessage(`✅ Redirecting to ${provider} login...`);
      // La redirección la maneja Supabase automáticamente
    } catch (error: any) {
      setMessage(`❌ ${error.message || 'OAuth login failed'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TerminalLayout navItems={[{ name: 'Home', href: '/' }]}>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="bg-black border border-green-500 rounded-md p-8 max-w-md w-full text-green-400 font-mono shadow-lg">
      {/* LOGO */}
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Image
            src="/images/logo8.png"
            alt="echoTerm Logo"
            width={72}
            height={72}
            className="rounded-sm"
            priority
          />
        </div>
      </div>
          <h1 className="text-3xl font-bold mb-6 select-none">{isLogin ? 'Log In' : 'Sign Up'}</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full p-2 bg-black border border-green-500 rounded text-green-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="********"
                className="w-full p-2 bg-black border border-green-500 rounded text-green-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-600 py-2 rounded text-white font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage('');
                }}
                className="text-green-500 hover:text-green-300 underline font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>

          <hr className="my-6 border-green-600" />

          <div className="text-center space-y-3">
            <p className="text-sm">Or continue with</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleOAuth('google')}
                disabled={loading}
                aria-label="Login with Google"
                className="px-4 py-2 border border-green-500 rounded hover:bg-green-600 transition-colors"
              >
                Google
              </button>
              <button
                onClick={() => handleOAuth('github')}
                disabled={loading}
                aria-label="Login with GitHub"
                className="px-4 py-2 border border-green-500 rounded hover:bg-green-600 transition-colors"
              >
                GitHub
              </button>
            </div>
          </div>

          {message && (
            <div className="mt-6 text-yellow-300 whitespace-pre-wrap">{message}</div>
          )}
        </div>
      </div>
    </TerminalLayout>
  );
}
