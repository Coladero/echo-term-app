"use client"

import { supabase } from "@/lib/supabase/client"

export default function OAuthButtons() {
  const handleOAuth = async (provider: "github" | "google") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => handleOAuth("google")}
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => handleOAuth("github")}
        className="w-full bg-black text-white py-2 rounded border border-white hover:bg-gray-900 transition"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}
