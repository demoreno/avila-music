import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import type { CategoryTree, ProductImage } from '@/types/index'
import type { CatalogProvider, PublicProduct } from './types'
import { matchesSearch } from '@/lib/search'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'

interface RawSubcategory {
  name: string
  slug: string
  sort_order: number
}

interface RawCategory {
  name: string
  slug: string
  sort_order: number
  subcategories: RawSubcategory[]
}

interface RawProduct {
  id: string
  name: string
  slug: string
  subcategory_id: string
  /** Stable folder name under public/images/products/ — never derived from slug, so it survives renames and maps 1:1 to a future S3 key prefix. */
  asset_id: string
  price_usd: number
  stock_total: number
  stock_minimum: number
  notes: string | null
  description: string
  is_active: boolean
  featured: boolean
  new_arrival: boolean
}

/** Static placeholder timestamp — this catalog has no real created/updated tracking. */
const CATALOG_DATE = '2026-01-01T00:00:00.000Z'

const ASSETS_ROOT = path.join(process.cwd(), 'public', 'images', 'products')
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])

const categories = categoriesData as RawCategory[]
const products = productsData as RawProduct[]

/**
 * Images aren't declared in products.json — whatever files exist in
 * public/images/products/<asset_id>/ are picked up automatically, sorted by
 * filename (so "1.jpg" leads), first file wins as the primary image.
 */
function scanProductImages(productId: string, assetId: string): ProductImage[] {
  let files: string[]
  try {
    files = fs.readdirSync(path.join(ASSETS_ROOT, assetId))
  } catch {
    return []
  }

  const filenames = files
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return filenames.map((filename, index) => ({
    id: `${productId}-${index}`,
    product_id: productId,
    storage_path: `/images/products/${assetId}/${filename}`,
    sort_order: index,
    is_primary: index === 0,
    created_at: CATALOG_DATE,
  }))
}

function toPublicProduct(raw: RawProduct): PublicProduct {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    subcategory_id: raw.subcategory_id,
    price_usd: raw.price_usd,
    stock_total: raw.stock_total,
    stock_minimum: raw.stock_minimum,
    notes: raw.notes,
    description: raw.description,
    is_active: raw.is_active,
    featured: raw.featured,
    new_arrival: raw.new_arrival,
    created_at: CATALOG_DATE,
    updated_at: CATALOG_DATE,
    images: scanProductImages(raw.id, raw.asset_id),
  }
}

function buildCategoryTree(): CategoryTree[] {
  const productCountBySubcategory = products.reduce<Record<string, number>>((acc, p) => {
    if (!p.is_active) return acc
    acc[p.subcategory_id] = (acc[p.subcategory_id] ?? 0) + 1
    return acc
  }, {})

  return categories.flatMap((category) =>
    category.subcategories.map((sub) => ({
      category_id: category.slug,
      category_name: category.name,
      category_slug: category.slug,
      category_sort_order: category.sort_order,
      subcategory_id: sub.slug,
      subcategory_name: sub.name,
      subcategory_slug: sub.slug,
      subcategory_sort_order: sub.sort_order,
      product_count: productCountBySubcategory[sub.slug] ?? 0,
    }))
  )
}

const categoryTree = buildCategoryTree()

export class JsonCatalogProvider implements CatalogProvider {
  async getFeaturedProducts(limit: number): Promise<PublicProduct[]> {
    const active = products.filter((p) => p.is_active)
    const featured = active.filter((p) => p.featured)
    const pool = featured.length > 0 ? featured : active
    return pool.slice(0, limit).map(toPublicProduct)
  }

  async getNewArrivals(limit: number): Promise<PublicProduct[]> {
    return products
      .filter((p) => p.is_active && p.new_arrival)
      .slice(0, limit)
      .map(toPublicProduct)
  }

  async getAllProducts(): Promise<PublicProduct[]> {
    return products
      .filter((p) => p.is_active)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(toPublicProduct)
  }

  async searchProducts(query: string, limit = 8): Promise<PublicProduct[]> {
    if (!query.trim()) return []

    const categoryLabelBySubcategory = new Map(
      categoryTree.map((row) => [row.subcategory_id, `${row.category_name} ${row.subcategory_name}`])
    )

    return products
      .filter((p) => p.is_active)
      .filter((p) => {
        const haystack = [p.name, p.description, categoryLabelBySubcategory.get(p.subcategory_id) ?? ''].join(' ')
        return matchesSearch(haystack, query)
      })
      .slice(0, limit)
      .map(toPublicProduct)
  }

  async getProductBySlug(slug: string): Promise<PublicProduct | null> {
    const found = products.find((p) => p.slug === slug && p.is_active)
    return found ? toPublicProduct(found) : null
  }

  async getRelatedProducts(subcategoryId: string, excludeId: string): Promise<PublicProduct[]> {
    return products
      .filter((p) => p.subcategory_id === subcategoryId && p.is_active && p.id !== excludeId)
      .slice(0, 4)
      .map(toPublicProduct)
  }

  async getCategoryTree(): Promise<CategoryTree[]> {
    return categoryTree
  }

  async getCategoryBySubcategoryId(subcategoryId: string): Promise<CategoryTree | null> {
    return categoryTree.find((row) => row.subcategory_id === subcategoryId) ?? null
  }

  getProductImageUrl(path: string): string {
    return path
  }
}
