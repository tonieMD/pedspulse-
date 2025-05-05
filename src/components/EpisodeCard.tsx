// components/EpisodeCard.tsx

import React from 'react'

type EpisodeCardProps = {
  title: string
  summary: string
  audioUrl: string
  coverImage?: string
}

export default function EpisodeCard({
  title,
  summary,
  audioUrl,
  coverImage,
}: EpisodeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover border-b border-gray-200"
        />
      )}

      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{summary}</p>

        <audio controls className="w-full">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}
