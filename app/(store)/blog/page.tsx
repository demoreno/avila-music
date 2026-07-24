import type { Metadata } from 'next'
import { Music } from 'lucide-react'
import { getPublishedPosts } from '@/lib/blog'
import BlogPostCard from '@/components/store/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guías, consejos y novedades sobre instrumentos y accesorios musicales — Ávila Music.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Ávila Music',
    description: 'Guías, consejos y novedades sobre instrumentos y accesorios musicales.',
  },
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="heading-serif text-4xl font-bold gradient-text">Blog</h1>
        <p className="mt-3 text-text-muted">Guías y consejos para músicos, de Ávila Music</p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Music className="h-12 w-12 text-slate-300" strokeWidth={1} />
          <p className="mt-4 text-text-muted">Muy pronto vamos a publicar artículos acá.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
