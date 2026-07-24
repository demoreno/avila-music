import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Calendar, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPublishedPostBySlug, getPublishedPosts } from '@/lib/blog'
import { extractYouTubeId } from '@/lib/youtube'
import YouTubeEmbed from '@/components/shared/YouTubeEmbed'
import ProductCarousel from '@/components/store/ProductCarousel'
import { catalog } from '@/lib/catalog'
import { canShowPrices, withPriceVisibility } from '@/lib/geo'

// A markdown link to a YouTube video renders as an embedded player instead of plain text —
// no special syntax needed in the editor, just paste the link.
function MarkdownLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  const videoId = href ? extractYouTubeId(href) : null
  if (videoId) return <YouTubeEmbed videoId={videoId} />

  const isExternal = href?.startsWith('http')
  return (
    <a href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

// A YouTubeEmbed renders a <div>, which react-markdown would otherwise nest inside the
// <p> it generates for that paragraph — invalid HTML (block element inside <p>), same
// category of bug as nesting an <a> inside a next/link <Link>. Unwrap the <p> in that case.
// react-markdown passes hast nodes here (type: 'element', tagName: 'a'), not mdast.
interface HastElementNode {
  children?: { type: string; tagName?: string; properties?: { href?: string } }[]
}
function MarkdownParagraph({ node, children }: { node?: HastElementNode; children?: React.ReactNode }) {
  const onlyChild = node?.children?.length === 1 ? node.children[0] : null
  const isVideoLink = onlyChild?.type === 'element' && onlyChild.tagName === 'a' && extractYouTubeId(onlyChild.properties?.href ?? '')
  if (isVideoLink) return <>{children}</>
  return <p>{children}</p>
}

// Images embedded in the article body (e.g. the logo on a solidarity post) are centered
// instead of stretching left-aligned to the full prose width.
function MarkdownImage({ src, alt }: { src?: string | Blob; alt?: string }) {
  if (!src || typeof src !== 'string') return null
  return (
    <span className="not-prose my-6 flex justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary markdown-authored image, not a known remotePattern */}
      <img src={src} alt={alt ?? ''} className="max-h-40 w-auto rounded-lg" />
    </span>
  )
}

const BASE_URL = 'https://avilamusic.shop'

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return { title: 'Artículo no encontrado' }

  const description = post.meta_description || post.excerpt

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const [rawRelatedProducts, showPrices] = await Promise.all([
    catalog.getProductsByIds(post.related_product_ids),
    canShowPrices(),
  ])
  const relatedProducts = rawRelatedProducts.map((p) => withPriceVisibility(p, showPrices))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: 'Ávila Music' },
    publisher: { '@type': 'Organization', name: 'Ávila Music' },
    mainEntityOfPage: `${BASE_URL}/blog/${slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#1e4d6b] hover:text-[#0f7a5f] transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al blog
        </Link>

        <h1 className="heading-serif text-3xl sm:text-4xl font-bold text-[#1e4d6b] leading-tight">
          {post.title}
        </h1>

        {post.published_at && (
          <p className="mt-4 flex items-center gap-1.5 text-sm text-text-muted">
            <Calendar className="h-4 w-4" />
            {new Date(post.published_at).toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element -- cover_image_url is an arbitrary admin-pasted URL, not whitelisted in next.config remotePatterns
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 aspect-video w-full rounded-2xl object-cover shadow-card"
          />
        )}

        <div className="prose prose-slate mt-8 max-w-none prose-headings:heading-serif prose-headings:text-[#1e4d6b] prose-a:text-[#1e4d6b] prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink, img: MarkdownImage, p: MarkdownParagraph }}>{post.content}</ReactMarkdown>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-10">
            <h2 className="heading-serif mb-6 text-2xl font-bold text-[#1e4d6b]">Productos relacionados</h2>
            <ProductCarousel products={relatedProducts} />
          </section>
        )}
      </article>
    </>
  )
}
