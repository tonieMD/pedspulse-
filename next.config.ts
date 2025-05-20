import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: this lets _all_ lint errors slip through on Vercel
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig


export default nextConfig;
