// src/components/AuthForm.tsx
'use client'

import { useState } from 'react'
import { signIn, signUp } from '../lib/auth'

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const fn = mode === 'signin' ? signIn : signUp
    const { error } = await fn(email, password)
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border rounded bg-black text-green-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded bg-black text-green-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-green-500 text-black font-bold rounded"
      >
        {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
