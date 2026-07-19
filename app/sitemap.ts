import type { MetadataRoute } from 'next'
import { catalog } from '@/lib/catalog'

const BASE_URL = 'https://avilamusic.com'

const STATIC_PAGES = ['nosotros', 'faq', 'contacto', 'envios', 'garantias', 'terminos']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await catalog.getAllProducts()

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/productos/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
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
    ...productUrls,
    ...staticUrls,
  ]
}
