import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getPublicImageUrl } from '@/lib/catalog/image-url'
import PedidoBuilder from '@/components/admin/PedidoBuilder'

export default async function NuevoPedidoPage() {
  const supabase = await createSupabaseServerClient()

  const [{ data: productsData }, { data: imagesData }] = await Promise.all([
    supabase.from('products').select('id, name, cost_usd, supplier_code, stock_total, stock_minimum').order('name'),
    supabase.from('product_images').select('product_id, storage_path').eq('is_primary', true),
  ])

  const imageByProduct = (imagesData ?? []).reduce<Record<string, string>>((acc, img) => {
    acc[img.product_id] = getPublicImageUrl(img.storage_path)
    return acc
  }, {})

  const products = (productsData ?? []).map((p) => ({ ...p, imageUrl: imageByProduct[p.id] ?? null }))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Nuevo pedido</h1>
      <PedidoBuilder products={products} initialItems={[]} />
    </div>
  )
}
