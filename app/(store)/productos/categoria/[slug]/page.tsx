import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { catalog } from '@/lib/catalog'
import ProductsClient from '../../ProductsClient'

async function getCategoryRows(slug: string) {
  const categoryTree = await catalog.getCategoryTree()
  const rows = categoryTree.filter((row) => row.category_slug === slug)
  return { categoryTree, rows }
}

export async function generateStaticParams() {
  const categoryTree = await catalog.getCategoryTree()
  const seen = new Set<string>()
  return categoryTree
    .filter((row) => {
      if (seen.has(row.category_slug)) return false
      seen.add(row.category_slug)
      return true
    })
    .map((row) => ({ slug: row.category_slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { rows } = await getCategoryRows(slug)
  if (rows.length === 0) return { title: 'Categoría no encontrada' }

  const categoryName = rows[0].category_name
  const subcategoryNames = rows.map((r) => r.subcategory_name).join(', ')

  return {
    title: categoryName,
    description: `Comprá ${categoryName.toLowerCase()} en Ávila Music: ${subcategoryNames}. Envíos a todo el país.`,
    alternates: { canonical: `/productos/categoria/${slug}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { categoryTree, rows } = await getCategoryRows(slug)
  if (rows.length === 0) notFound()

  const categoryName = rows[0].category_name
  const subcategoryNames = rows.map((r) => r.subcategory_name).join(', ')

  const products = await catalog.getAllProducts()
  const catMap = categoryTree.reduce<Record<string, (typeof categoryTree)[number]>>((acc, row) => {
    acc[row.subcategory_id] = row
    return acc
  }, {})

  const productsWithMeta = products.map((p) => {
    const cat = catMap[p.subcategory_id]
    return {
      ...p,
      subcategory_name: cat?.subcategory_name ?? '',
      subcategory_slug: cat?.subcategory_slug ?? '',
      category_name: cat?.category_name ?? '',
      category_slug: cat?.category_slug ?? '',
      category_id: cat?.category_id ?? '',
      subcategory_id: p.subcategory_id,
    }
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://avilamusic.shop' },
      { '@type': 'ListItem', position: 2, name: 'Productos', item: 'https://avilamusic.shop/productos' },
      { '@type': 'ListItem', position: 3, name: categoryName, item: `https://avilamusic.shop/productos/categoria/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <nav className="mb-2 flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-[#1e4d6b] transition-colors">Inicio</Link>
          <span className="text-slate-300">/</span>
          <Link href="/productos" className="hover:text-[#1e4d6b] transition-colors">Productos</Link>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-text">{categoryName}</span>
        </nav>
      </div>
      <ProductsClient
        products={productsWithMeta}
        categoryTree={categoryTree}
        initialCategory={slug}
        title={categoryName}
        description={`${subcategoryNames}.`}
      />
    </>
  )
}
