// app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await supabase.auth.getSession()
      if (!error) {
        router.push('/admin/new') // ✅ redirect after successful login
      } else {
        console.error(error)
        router.push('/login') // or show an error page
      }
    }

    handleLogin()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <p>Logging you in...</p>
    </div>
  )
}
