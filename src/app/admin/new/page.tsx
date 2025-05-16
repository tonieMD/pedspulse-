// app/admin/new/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewEpisodeForm() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    summary_md: '',
    audio_url: '',
    tag: '',
    duration: '',
  })

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login')
      } else {
        setUser(data.session.user)
        setLoading(false)
      }
    }

    getSession()
  }, [router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('episodes').insert([{ ...form }])

    if (error) {
      alert('Error: ' + error.message)
    } else {
      router.push('/episodes')
    }

    setLoading(false)
  }

  if (loading) return <p className="text-center text-white mt-10">Checking access...</p>
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#050A12] text-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎙️ Add New Episode</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
            required
          />

          <textarea
            name="summary_md"
            value={form.summary_md}
            onChange={handleChange}
            placeholder="Show notes / summary"
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
            required
          />

          {/* Upload audio file (.mp3) */}
          <div>
            <label className="block text-sm mb-1">Upload audio file (.mp3)</label>
            <input
              type="file"
              accept="audio/mp3"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return

                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `${fileName}`

                const { error } = await supabase.storage
                  .from('episode-audio')
                  .upload(filePath, file)

                if (error) {
                  alert('Upload failed: ' + error.message)
                } else {
                  const { data: urlData } = supabase.storage
                    .from('episode-audio')
                    .getPublicUrl(filePath)

                  setForm((prev) => ({
                    ...prev,
                    audio_url: urlData?.publicUrl || '',
                  }))
                }
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
            />
            {form.audio_url && (
              <p className="text-xs mt-2 text-teal-400 break-all">
                Uploaded: {form.audio_url}
              </p>
            )}
          </div>

          <input
            type="text"
            name="tag"
            value={form.tag}
            onChange={handleChange}
            placeholder="Tag (e.g. Neonatology)"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          />

          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (e.g. 14:32)"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          />

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Episode'}
          </button>
        </form>
      </div>
    </div>
  )
}
