// app/episodes/[id].tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import ReactMarkdown from 'react-markdown'

interface Episode {
  id: string
  title: string
  summary_md: string
  audio_url: string
  tag?: string
  duration?: string
}

export default function EpisodeDetailPage() {
  const { id } = useParams()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [related, setRelated] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisode = async () => {
      const { data, error } = await supabase.from('episodes').select('*').eq('id', id).single()
      if (!error && data) {
        setEpisode(data)
        fetchRelated(data.id)
      }
      setLoading(false)
    }

    const fetchRelated = async (currentId: string) => {
      const { data } = await supabase
        .from('episodes')
        .select('*')
        .neq('id', currentId)
        .limit(2)
      if (data) setRelated(data)
    }

    if (id) fetchEpisode()
  }, [id])

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>
  if (!episode) return <p className="p-4 text-red-500">Episode not found</p>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold text-white">{episode.title}</h1>

      {episode.tag && (
        <span className="inline-block bg-teal-900/30 text-teal-300 px-3 py-1 rounded-full text-sm">
          {episode.tag}
        </span>
      )}

      <audio controls src={episode.audio_url} className="w-full mt-4 rounded-md bg-gray-800" />

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-white">Show notes</h2>
        <div className="prose prose-invert">
          <ReactMarkdown>{episode.summary_md}</ReactMarkdown>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Related episodes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((ep) => (
              <div key={ep.id} className="bg-gray-900 p-4 rounded-md border border-gray-800">
                <h3 className="text-white font-bold">{ep.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{ep.summary_md}</p>
                <p className="text-gray-500 text-xs mt-1">{ep.duration || '20 min'}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
