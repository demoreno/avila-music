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
  searchParams: Promise<{ categoria?: string }>
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

  return (
    <ProductsClient
      products={productsWithMeta}
      categoryTree={categoryTree}
      initialCategory={params.categoria}
      showPrices={showPrices}
    />
  )
}
