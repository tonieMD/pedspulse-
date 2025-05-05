'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import EpisodeCard from '@/components/EpisodeCard'

type Episode = {
  id: string
  title: string
  slug: string
  summary_md: string
  audio_url: string
  cover_image_url?: string
  published_at?: string
}

export default function Page() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisodes = async () => {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) console.error('❌ Supabase fetch error:', error.message)
      else setEpisodes(data || [])

      setLoading(false)
    }

    fetchEpisodes()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🎧 PedsPulse Episodes</h1>

      {loading && <p className="text-gray-500">Loading episodes...</p>}
      {!loading && episodes.length === 0 && (
        <p className="text-red-500 font-semibold">No episodes found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            title={ep.title}
            summary={ep.summary_md}
            audioUrl={ep.audio_url}
            coverImage={ep.cover_image_url}
          />
        ))}
      </div>
    </div>
  )
}
