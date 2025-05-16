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
  duration?: string
  tag?: string
}

export default function EpisodeListPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisodes = async () => {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase fetch error:', error.message)
      } else {
        setEpisodes(data as Episode[])
      }

      setLoading(false)
    }

    fetchEpisodes()
  }, [])

  return (
    <div className="min-h-screen bg-[#050A12] px-4 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🎧 PedsPulse Episodes</h1>

        {loading && (
          <p className="text-gray-400">Loading episodes...</p>
        )}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep) => (
            <EpisodeCard
              key={ep.id}
              id={ep.id}
              title={ep.title}
              summary={ep.summary_md}
              audioUrl={ep.audio_url}
              duration={ep.duration || ''}
              tag={ep.tag || 'Education'}
              coverImage={ep.cover_image_url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
