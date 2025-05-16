// app/page.tsx – Public landing page
'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050A12] text-white flex flex-col justify-between">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-2xl">
          <span className="inline-block w-6 h-6">
            {/* headphone icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M12 3a9 9 0 00-9 9v5a3 3 0 003 3h1a2 2 0 002-2v-4a2 2 0 00-2-2H5v-2a7 7 0 0114 0v2h-2a2 2 0 00-2 2v4a2 2 0 002 2h1a3 3 0 003-3v-5a9 9 0 00-9-9z" />
            </svg>
          </span>
          PedsPulse
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/episodes" className="hover:text-teal-300">Episodes</Link>
          <Link href="/about" className="hover:text-teal-300">About</Link>
          <Link href="/login" className="px-4 py-1.5 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold">Admin</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl">
          Evidence‑based <span className="text-teal-400">pediatrics</span> told as inspiring stories
        </h1>
        <p className="mt-6 text-gray-300 max-w-xl">
          Join Dr. Rashid, MD — pediatric resident fueled by love & caffeine — for bite‑size clinical pearls, clerkship guides, and real‑life cases.
        </p>
        <div className="mt-10 flex gap-4 flex-col sm:flex-row">
          <Link
            href="/episodes"
            className="px-8 py-3 rounded bg-teal-600 hover:bg-teal-500 text-white font-semibold shadow"
          >
            🎧 Listen to Episodes
          </Link>
          <a
            href="#newsletter"
            className="px-8 py-3 rounded border border-teal-600 text-teal-300 hover:bg-teal-600/20 font-semibold"
          >
            📬 Get Updates
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PedsPulse • Built with ❤️ & caffeine
      </footer>
    </main>
  )
}
