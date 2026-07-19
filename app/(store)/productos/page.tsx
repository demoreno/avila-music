import { catalog } from '@/lib/catalog'
import ProductsClient from './ProductsClient'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const params = await searchParams
  const [products, categoryTree] = await Promise.all([
    catalog.getAllProducts(),
    catalog.getCategoryTree(),
  ])

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

  return (
    <ProductsClient
      products={productsWithMeta}
      categoryTree={categoryTree}
      initialCategory={params.categoria}
    />
  )
}
