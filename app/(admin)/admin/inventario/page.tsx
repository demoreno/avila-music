import { createSupabaseServerClient } from '@/lib/supabase-server'
import InventoryTable from './InventoryTable'

interface ProductRow {
  id: string
  name: string
  stock_total: number
  stock_minimum: number
  subcategory_id: string
}

export default async function InventarioPage() {
  const supabase = await createSupabaseServerClient()

  const [productsRes, categoryTreeRes] = await Promise.all([
    supabase
      .from('products')
      .select('id, name, stock_total, stock_minimum, subcategory_id')
      .eq('is_active', true)
      .order('name'),
    supabase.from('v_category_tree').select('subcategory_id, subcategory_name'),
  ])

  const products = (productsRes.data as ProductRow[]) ?? []
  const categoryTree = categoryTreeRes.data ?? []

  const catMap = (categoryTree as { subcategory_id: string; subcategory_name: string }[]).reduce<
    Record<string, string>
  >((acc, row) => {
    acc[row.subcategory_id] = row.subcategory_name
    return acc
  }, {})

  const inventoryProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    stock_total: p.stock_total,
    stock_minimum: p.stock_minimum,
    subcategory_name: catMap[p.subcategory_id] ?? '',
  }))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Inventario</h1>
      <InventoryTable products={inventoryProducts} />
    </div>
  )
}
