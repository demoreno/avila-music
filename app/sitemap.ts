import type { MetadataRoute } from 'next'
import { catalog } from '@/lib/catalog'
import { getPublishedPosts } from '@/lib/blog'

const BASE_URL = 'https://avilamusic.shop'

const STATIC_PAGES = ['nosotros', 'faq', 'contacto', 'envios', 'garantias', 'terminos', 'politica-privacidad']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categoryTree, posts] = await Promise.all([
    catalog.getAllProducts(),
    catalog.getCategoryTree(),
    getPublishedPosts(),
  ])

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/productos/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categorySlugs = [...new Set(categoryTree.map((row) => row.category_slug))]
  const categoryUrls: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/productos/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = STATIC_PAGES.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/productos/categoria`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...productUrls,
    ...categoryUrls,
    ...postUrls,
    ...staticUrls,
  ]
}
