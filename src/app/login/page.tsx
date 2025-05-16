// app/login/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ CHANGED: Added redirect to custom callback page after login
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback' // 👈 redirect to this after login
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for a login link!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050A12] text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 bg-gray-900 p-8 rounded-lg border border-gray-700"
      >
        <h1 className="text-2xl font-bold text-white">🔐 Admin Login</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded"
        >
          Send Magic Link
        </button>

        {message && <p className="text-sm text-teal-400 mt-2">{message}</p>}
      </form>
    </div>
  )
}

