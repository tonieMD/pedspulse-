'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string|null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg(null)

    // NOTE: insert takes an array of rows
    const { data, error } = await supabase
      .from('newsletter')
      .insert([{ email }])
      .select()

    if (error) {
      console.error('Newsletter insert error:', error)
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      console.log('Inserted newsletter row:', data)
      setStatus('ok')
      setEmail('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        required
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
      />

      <button
        type="submit"
        disabled={status==='sending'}
        className={`w-full py-2 rounded font-semibold transition ${
          status==='sending'
            ? 'bg-gray-600 text-gray-300'
            : 'bg-teal-600 hover:bg-teal-500 text-black'
        }`}
      >
        {status==='sending'
          ? 'Joining…'
          : status==='ok'
          ? '🎉 Subscribed!'
          : status==='error'
          ? '❌ Try again'
          : 'Join Newsletter'}
      </button>

      {errorMsg && (
        <p className="text-red-400 text-sm">
          {errorMsg}
        </p>
      )}
    </form>
  )
}
