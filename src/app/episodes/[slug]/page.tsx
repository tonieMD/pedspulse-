'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import ReactMarkdown from 'react-markdown'

type Episode = {
  title: string
  summary_md: string
  tag?: string
  duration?: string
  audio_url: string
  cover_image_url?: string
  published_at?: string
}

export default function EpisodeDetail() {
  const { slug } = useParams() as { slug: string }   // ✅ new: grab slug safely
  const router = useRouter()
  const [episode, setEpisode] = useState<Episode | null>(null)

  // fetch on mount or slug change
  useEffect(() => {
    if (!slug) return

    const fetchEpisode = async () => {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        router.push('/episodes')          // fallback
      } else {
        setEpisode(data as Episode)
      }
    }

    fetchEpisode()
  }, [slug, router])

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050A12] text-white px-4 py-12">
      <article className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">{episode.title}</h1>

        <div className="flex items-center gap-3 text-sm text-teal-300">
          {episode.tag && <span>{episode.tag}</span>}
          {episode.duration && <span>· {episode.duration}</span>}
          {episode.published_at && (
            <time dateTime={episode.published_at}>
              · {new Date(episode.published_at).toLocaleDateString()}
            </time>
          )}
        </div>

        {episode.cover_image_url && (
          <img
            src={episode.cover_image_url}
            alt={episode.title}
            className="w-full rounded-lg"
          />
        )}

        <audio
          controls
          src={episode.audio_url}
          className="w-full mt-4 rounded-md bg-gray-800"
        />

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{episode.summary_md}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
