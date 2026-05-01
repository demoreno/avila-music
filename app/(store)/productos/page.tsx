import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProductsClient from './ProductsClient'
import type { Product, ProductImage, CategoryTree } from '@/types/index'

export const revalidate = 60

interface RawProduct {
  id: string
  name: string
  slug: string
  subcategory_id: string
  cost_usd: number
  price_usd: number
  stock_total: number
  stock_minimum: number
  notes: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const params = await searchParams
  const supabase = await createSupabaseServerClient()

  const [productsRes, categoryTreeRes] = await Promise.all([
    supabase.from('products').select('*').eq('is_active', true).order('name'),
    supabase
      .from('v_category_tree')
      .select('*')
      .order('category_sort_order')
      .order('subcategory_sort_order'),
  ])

  const products = (productsRes.data as RawProduct[]) ?? []
  const categoryTree = (categoryTreeRes.data as CategoryTree[]) ?? []

  const catMap = categoryTree.reduce<Record<string, CategoryTree>>((acc, row) => {
    acc[row.subcategory_id] = row
    return acc
  }, {})

  const subcategoryIds = [...new Set(products.map((p) => p.subcategory_id))]
  let imagesByProduct: Record<string, ProductImage[]> = {}

  if (subcategoryIds.length > 0) {
    const productIds = products.map((p) => p.id)
    const { data: images } = await supabase
      .from('product_images')
      .select('*')
      .in('product_id', productIds)

    imagesByProduct = ((images as ProductImage[]) ?? []).reduce<Record<string, ProductImage[]>>(
      (acc, img) => {
        if (!acc[img.product_id]) acc[img.product_id] = []
        acc[img.product_id].push(img)
        return acc
      },
      {}
    )
  }

  const productsWithMeta = products.map((p) => {
    const cat = catMap[p.subcategory_id]
    return {
      ...(p as Product),
      images: imagesByProduct[p.id] ?? [],
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
