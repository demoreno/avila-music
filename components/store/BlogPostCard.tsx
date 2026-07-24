import Link from 'next/link'
import { Music, Calendar } from 'lucide-react'
import type { BlogPost } from '@/types/index'

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- cover_image_url is an arbitrary admin-pasted/uploaded URL, not whitelisted in next.config remotePatterns
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Music className="h-12 w-12" strokeWidth={1} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.published_at && (
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.published_at).toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
        <h2 className="text-lg font-bold text-text leading-snug transition-colors group-hover:text-[#1e4d6b]">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-text-muted">{post.excerpt}</p>
      </div>
    </Link>
  )
}
