import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProductsTable from './ProductsTable'
import type { Product, CategoryTree } from '@/types/index'

interface ProductWithCategory extends Product {
  subcategory_name: string
  category_name: string
}

export default async function AdminProductsPage() {
  const supabase = await createSupabaseServerClient()

  const [productsRes, categoryTreeRes] = await Promise.all([
    supabase.from('products').select('*').order('name'),
    supabase.from('v_category_tree').select('*').order('category_sort_order').order('subcategory_sort_order'),
  ])

  const products = (productsRes.data as Product[]) ?? []
  const categoryTree = (categoryTreeRes.data as CategoryTree[]) ?? []

  const catMap = categoryTree.reduce<Record<string, CategoryTree>>((acc, row) => {
    acc[row.subcategory_id] = row
    return acc
  }, {})

  const productsWithCategory: ProductWithCategory[] = products.map((p) => ({
    ...p,
    subcategory_name: catMap[p.subcategory_id]?.subcategory_name ?? '',
    category_name: catMap[p.subcategory_id]?.category_name ?? '',
  }))

  const uniqueSubcategories = categoryTree.filter(
    (row, idx, arr) => arr.findIndex((r) => r.subcategory_id === row.subcategory_id) === idx
  )

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Productos</h1>
      <ProductsTable products={productsWithCategory} subcategories={uniqueSubcategories} />
    </div>
  )
}
