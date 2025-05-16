// components/EpisodeCard.tsx

'use client'

import Link from 'next/link'

type EpisodeCardProps = {
  id: string
  title: string
  summary: string
  audioUrl: string
  duration?: string
  tag?: string
  coverImage?: string
}

export default function EpisodeCard({
  id,
  title,
  summary,
  audioUrl,
  duration = 'N/A',
  tag = 'General',
}: EpisodeCardProps) {
  return (
    <Link href={`/episodes/${id}`} passHref>
      <article className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm hover:shadow-md transition flex flex-col gap-4 cursor-pointer">
        <header className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            className="text-gray-400 hover:text-teal-400"
            aria-label="Save episode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M5 3c-.552 0-1 .448-1 1v17l8-4 8 4V4c0-.552-.448-1-1-1H5z" />
            </svg>
          </button>
        </header>

        <p className="text-gray-400 text-sm line-clamp-2">{summary}</p>

        <div className="flex items-center gap-3 text-sm mt-1">
          <span className="inline-flex items-center gap-1 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 7a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414L11 13.414V8a1 1 0 011-1z" />
            </svg>
            {duration}
          </span>
          <span className="px-3 py-0.5 rounded-full text-teal-300 bg-teal-900/30 text-xs font-medium">
            {tag}
          </span>
        </div>

        <audio
          controls
          src={audioUrl}
          className="w-full mt-2 rounded-md bg-gray-800"
        />
      </article>
    </Link>
  )
}
