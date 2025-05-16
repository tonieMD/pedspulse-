// components/EpisodeCard.tsx
"use client";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { formatDuration } from "../lib/formatDuration"; // update path as needed


interface EpisodeCardProps {
  slug: string;
  title: string;
  summary: string;
  audioUrl: string;
  coverImage?: string;
  /** seconds or "hh:mm:ss" or "mm:ss" */
  duration?: string;
  tag?: string;
}

export default function EpisodeCard({
  slug,
  title,
  summary,
  audioUrl,
  coverImage,
  duration = "0",
  tag = "General",
}: EpisodeCardProps) {
  const niceTime = formatDuration(duration);

  return (
    <Link
      href={`/episodes/${slug}`}
      className="block group rounded-2xl overflow-hidden"
    >
      <article className="relative flex h-full flex-col border border-teal-500/30 bg-white/5 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-teal-500/30">
        {/* Cover image */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-gray-800 to-gray-900">
          {coverImage && (
            <>
              <img
                src={coverImage}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover object-center transition-opacity group-hover:opacity-90"
              />
              {/* Duration overlay */}
              <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                {niceTime}
              </span>
            </>
          )}

          {/* Play overlay icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Card content */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          <header className="flex items-start gap-3">
            <h2 className="flex-1 line-clamp-1 text-lg font-semibold text-gray-100">
              {title}
            </h2>
            <button
              aria-label="Save episode"
              onClick={(e) => e.preventDefault()}
              className="shrink-0 text-gray-400 hover:text-teal-400"
            >
              <Bookmark className="h-5 w-5" />
            </button>
          </header>

          <p className="flex-1 text-sm text-gray-400 line-clamp-2">{summary}</p>

          <div className="flex items-center justify-between text-xs text-gray-400">
            {/* ⬇ keep this copy if there is *no* image so users still see a duration */}
            {!coverImage && (
              <span className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 7a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414L11 13.414V8a1 1 0 011-1z" />
                </svg>
                {niceTime}
              </span>
            )}

            {tag && (
              <span className="rounded-full bg-teal-900/30 px-3 py-0.5 text-teal-300">
                {tag}
              </span>
            )}
          </div>

          {/* Inline audio player */}
          <audio
            controls
            src={audioUrl}
            preload="none"
            className="mt-2 w-full rounded-md bg-gray-900"
          />
        </div>
      </article>
    </Link>
  );
}
