import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { CategoryTree, ProductImage } from '@/types/index'
import type { CatalogProvider, PublicProduct } from './types'
import { matchesSearch } from '@/lib/search'
import { getPublicImageUrl } from './image-url'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/** Never selects cost_usd — that's internal margin data and must not reach the storefront. */
const PRODUCT_COLUMNS =
  'id, name, slug, subcategory_id, price_usd, stock_total, stock_minimum, notes, description, is_active, featured, new_arrival, created_at, updated_at'

interface ProductRow {
  id: string
  name: string
  slug: string
  subcategory_id: string
  price_usd: number
  stock_total: number
  stock_minimum: number
  notes: string | null
  description: string | null
  is_active: boolean
  featured: boolean
  new_arrival: boolean
  created_at: string
  updated_at: string
}

// "Más vendido" is honest social proof: the top N products in the whole active catalog
// by real units sold (v_public_bestsellers — narrow, no financial data). Not a manual flag.
const BESTSELLER_LIMIT = 3

async function getBestsellerIds(): Promise<Set<string>> {
  const { data } = await supabase
    .from('v_public_bestsellers')
    .select('product_id, units_sold')
    .order('units_sold', { ascending: false })
    .limit(BESTSELLER_LIMIT)

  return new Set((data ?? []).filter((row) => row.units_sold > 0).map((row) => row.product_id))
}

async function attachImages(rows: ProductRow[]): Promise<PublicProduct[]> {
  if (rows.length === 0) return []

  const [{ data: images }, bestsellerIds] = await Promise.all([
    supabase
      .from('product_images')
      .select('*')
      .in('product_id', rows.map((r) => r.id))
      .order('sort_order'),
    getBestsellerIds(),
  ])

  const imagesByProduct = ((images ?? []) as ProductImage[]).reduce<Record<string, ProductImage[]>>(
    (acc, img) => {
      ;(acc[img.product_id] ??= []).push(img)
      return acc
    },
    {}
  )

  return rows.map((row) => ({
    ...row,
    description: row.description ?? '',
    images: imagesByProduct[row.id] ?? [],
    isBestseller: bestsellerIds.has(row.id),
  }))
}

export class SupabaseCatalogProvider implements CatalogProvider {
  async getFeaturedProducts(limit: number): Promise<PublicProduct[]> {
    const { data: featured } = await supabase
      .from('products')
      .select(PRODUCT_COLUMNS)
      .eq('is_active', true)
      .eq('featured', true)
      .order('name')
      .limit(limit)

    if (featured && featured.length > 0) return attachImages(featured)

    const { data: fallback } = await supabase
      .from('products')
      .select(PRODUCT_COLUMNS)
      .eq('is_active', true)
      .order('name')
      .limit(limit)

    return attachImages(fallback ?? [])
  }

  async getNewArrivals(limit: number): Promise<PublicProduct[]> {
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_COLUMNS)
      .eq('is_active', true)
      .eq('new_arrival', true)
      .order('name')
      .limit(limit)

    return attachImages(data ?? [])
  }

  async getAllProducts(): Promise<PublicProduct[]> {
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_COLUMNS)
      .eq('is_active', true)
      .order('name')

    return attachImages(data ?? [])
  }

  async searchProducts(query: string, limit = 8): Promise<PublicProduct[]> {
    if (!query.trim()) return []

    const [{ data: products }, categoryTree] = await Promise.all([
      supabase.from('products').select(PRODUCT_COLUMNS).eq('is_active', true),
      this.getCategoryTree(),
    ])

    const categoryLabelBySubcategory = new Map(
      categoryTree.map((row) => [row.subcategory_id, `${row.category_name} ${row.subcategory_name}`])
    )

    const matches = (products ?? []).filter((p) => {
      const haystack = [p.name, p.description ?? '', categoryLabelBySubcategory.get(p.subcategory_id) ?? ''].join(' ')
      return matchesSearch(haystack, query)
    })

    return attachImages(matches.slice(0, limit))
  }

  async getProductBySlug(slug: string): Promise<PublicProduct | null> {
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_COLUMNS)
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle()

    if (!data) return null
    const [withImages] = await attachImages([data])
    return withImages
  }

  async getRelatedProducts(subcategoryId: string, excludeId: string): Promise<PublicProduct[]> {
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_COLUMNS)
      .eq('subcategory_id', subcategoryId)
      .eq('is_active', true)
      .neq('id', excludeId)
      .limit(4)

    return attachImages(data ?? [])
  }

  async getCategoryTree(): Promise<CategoryTree[]> {
    const { data } = await supabase
      .from('v_category_tree')
      .select('*')
      .order('category_sort_order')
      .order('subcategory_sort_order')

    return (data as CategoryTree[]) ?? []
  }

  async getCategoryBySubcategoryId(subcategoryId: string): Promise<CategoryTree | null> {
    const categoryTree = await this.getCategoryTree()
    return categoryTree.find((row) => row.subcategory_id === subcategoryId) ?? null
  }

  getProductImageUrl(path: string): string {
    return getPublicImageUrl(path)
  }
}
