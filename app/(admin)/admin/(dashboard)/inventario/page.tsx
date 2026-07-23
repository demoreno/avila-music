import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getPublicImageUrl } from '@/lib/catalog/image-url'
import InventoryTable from './InventoryTable'
import ReorderTab from './ReorderTab'

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

  const [productsRes, categoryTreeRes, imagesRes, pendingOrdersRes, reorderRes] = await Promise.all([
    supabase
      .from('products')
      .select('id, name, stock_total, stock_minimum, subcategory_id, cost_usd, supplier_code')
      .eq('is_active', true)
      .order('name'),
    supabase.from('v_category_tree').select('subcategory_id, subcategory_name'),
    supabase.from('product_images').select('product_id, storage_path').eq('is_primary', true),
    supabase.from('purchase_orders').select('id').not('status', 'in', '(recibido,cancelado)'),
    supabase.from('v_reorder_intelligence').select('*'),
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

  const activeOrderIds = (pendingOrdersRes.data ?? []).map((o) => o.id)
  const pendingItemsRes = activeOrderIds.length
    ? await supabase
        .from('purchase_order_items')
        .select('product_id, quantity, purchase_order_id')
        .in('purchase_order_id', activeOrderIds)
    : { data: [] }

  const pendingByProduct = (pendingItemsRes.data ?? []).reduce<Record<string, { qty: number; orderIds: string[] }>>(
    (acc, item) => {
      const existing = acc[item.product_id] ?? { qty: 0, orderIds: [] }
      existing.qty += item.quantity
      if (!existing.orderIds.includes(item.purchase_order_id)) existing.orderIds.push(item.purchase_order_id)
      acc[item.product_id] = existing
      return acc
    },
    {}
  )

  const inventoryProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    stock_total: p.stock_total,
    stock_minimum: p.stock_minimum,
    subcategory_name: catMap[p.subcategory_id] ?? '',
    cost_usd: p.cost_usd,
    supplier_code: p.supplier_code,
    imageUrl: imageByProduct[p.id] ?? null,
    pendingOrder: pendingByProduct[p.id] ?? null,
  }))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Inventario</h1>
      <InventoryTable products={inventoryProducts} reorderData={reorderRes.data ?? []} />
    </div>
  )
}
