import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getPublicImageUrl } from '@/lib/catalog/image-url'
import InventoryTable from './InventoryTable'

interface ProductRow {
  id: string
  name: string
  stock_total: number
  stock_minimum: number
  subcategory_id: string
  cost_usd: number
  supplier_code: string | null
}

export default async function InventarioPage() {
  const supabase = await createSupabaseServerClient()

  const [productsRes, categoryTreeRes, imagesRes] = await Promise.all([
    supabase
      .from('products')
      .select('id, name, stock_total, stock_minimum, subcategory_id, cost_usd, supplier_code')
      .eq('is_active', true)
      .order('name'),
    supabase.from('v_category_tree').select('subcategory_id, subcategory_name'),
    supabase.from('product_images').select('product_id, storage_path').eq('is_primary', true),
  ])

  const products = (productsRes.data as ProductRow[]) ?? []
  const categoryTree = categoryTreeRes.data ?? []

  const catMap = (categoryTree as { subcategory_id: string; subcategory_name: string }[]).reduce<
    Record<string, string>
  >((acc, row) => {
    acc[row.subcategory_id] = row.subcategory_name
    return acc
  }, {})

  const imageByProduct = (imagesRes.data ?? []).reduce<Record<string, string>>((acc, img) => {
    acc[img.product_id] = getPublicImageUrl(img.storage_path)
    return acc
  }, {})

  const inventoryProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    stock_total: p.stock_total,
    stock_minimum: p.stock_minimum,
    subcategory_name: catMap[p.subcategory_id] ?? '',
    cost_usd: p.cost_usd,
    supplier_code: p.supplier_code,
    imageUrl: imageByProduct[p.id] ?? null,
  }))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Inventario</h1>
      <InventoryTable products={inventoryProducts} />
    </div>
  )
}
