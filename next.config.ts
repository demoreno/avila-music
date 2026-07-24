import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Default Server Action body limit is 1MB — too small for photo uploads (product
  // images, blog cover images) that go through a Server Action instead of a route handler.
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Product images live at UUID-named storage paths that are never overwritten
    // (replaced, not mutated), so it's safe to cache the optimized output for a
    // long time instead of Next's 60s default — Supabase's own origin sends
    // `cache-control: no-cache`, which would otherwise force a revalidation
    // round-trip on almost every request.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thorcnvqeidunltecynr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
