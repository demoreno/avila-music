import Link from 'next/link'
import type { Metadata } from 'next'
import { catalog } from '@/lib/catalog'
import { canShowPrices, withPriceVisibility } from '@/lib/geo'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Catálogo de accesorios musicales',
  description:
    'Cuerdas, clavijas, correas, cables y accesorios para guitarra, bajo, violín y batería. Envíos a todo el país.',
  alternates: { canonical: '/productos' },
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; search?: string }>
}) {
  const params = await searchParams
  const [products, categoryTree, showPrices] = await Promise.all([
    catalog.getAllProducts(),
    catalog.getCategoryTree(),
    canShowPrices(),
  ])

  const catMap = categoryTree.reduce<Record<string, (typeof categoryTree)[number]>>((acc, row) => {
    acc[row.subcategory_id] = row
    return acc
  }, {})

  const productsWithMeta = products.map((p) => {
    const cat = catMap[p.subcategory_id]
    return withPriceVisibility(
      {
        ...p,
        subcategory_name: cat?.subcategory_name ?? '',
        subcategory_slug: cat?.subcategory_slug ?? '',
        category_name: cat?.category_name ?? '',
        category_slug: cat?.category_slug ?? '',
        category_id: cat?.category_id ?? '',
        subcategory_id: p.subcategory_id,
      },
      showPrices
    )
  })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://avilamusic.shop' },
      { '@type': 'ListItem', position: 2, name: 'Productos', item: 'https://avilamusic.shop/productos' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <nav className="mb-2 flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-[#1e4d6b] transition-colors">Inicio</Link>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-text">Productos</span>
        </nav>
      </div>
      <ProductsClient
        products={productsWithMeta}
        categoryTree={categoryTree}
        initialCategory={params.categoria}
        initialSearch={params.search}
        showPrices={showPrices}
      />
    </>
  )
}
