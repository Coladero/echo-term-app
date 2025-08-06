"use client"

import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import OAuthButtons from "./OAuthButtons"

export default function AuthWindow() {
  const [tab, setTab] = useState<"login" | "signup">("login")

  return (
    <div className="w-full max-w-md bg-[#1a1a1a] border border-green-500 rounded-xl p-6 shadow-lg text-white">

      {/* TABS */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-2 border-b-2 ${
            tab === "login"
              ? "border-green-400 text-green-400"
              : "border-transparent text-gray-500 hover:text-green-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setTab("signup")}
          className={`flex-1 py-2 border-b-2 ${
            tab === "signup"
              ? "border-green-400 text-green-400"
              : "border-transparent text-gray-500 hover:text-green-300"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* FORMULARIO */}
      {tab === "login" ? <LoginForm /> : <SignupForm />}

      {/* SEPARADOR */}
      <div className="my-4 border-t border-green-500"></div>

      {/* BOTONES OAUTH */}
      <OAuthButtons />
    </div>
  )
}
