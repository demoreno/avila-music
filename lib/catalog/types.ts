import type { Product, ProductImage, CategoryTree } from '@/types/index'

/** Storefront-facing product shape — never carries cost_usd (internal margin data). */
export type PublicProduct = Omit<Product, 'cost_usd' | 'supplier_code'> & { images: ProductImage[]; description: string }

export interface CatalogProvider {
  getFeaturedProducts(limit: number): Promise<PublicProduct[]>
  getNewArrivals(limit: number): Promise<PublicProduct[]>
  getAllProducts(): Promise<PublicProduct[]>
  searchProducts(query: string, limit?: number): Promise<PublicProduct[]>
  getProductBySlug(slug: string): Promise<PublicProduct | null>
  getRelatedProducts(subcategoryId: string, excludeId: string): Promise<PublicProduct[]>
  getCategoryTree(): Promise<CategoryTree[]>
  getCategoryBySubcategoryId(subcategoryId: string): Promise<CategoryTree | null>
  getProductImageUrl(path: string): string
}
