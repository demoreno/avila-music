import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getPublicImageUrl } from '@/lib/catalog/image-url'
import PedidoBuilder from '@/components/admin/PedidoBuilder'

export default async function EditarPedidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const [{ data: order }, { data: itemsData }, { data: productsData }, { data: imagesData }] = await Promise.all([
    supabase.from('purchase_orders').select('id, notes').eq('id', id).maybeSingle(),
    supabase.from('purchase_order_items').select('product_id, quantity').eq('purchase_order_id', id),
    supabase.from('products').select('id, name, cost_usd, supplier_code, stock_total, stock_minimum').order('name'),
    supabase.from('product_images').select('product_id, storage_path').eq('is_primary', true),
  ])

  if (!order) notFound()

  const imageByProduct = (imagesData ?? []).reduce<Record<string, string>>((acc, img) => {
    acc[img.product_id] = getPublicImageUrl(img.storage_path)
    return acc
  }, {})

  const products = (productsData ?? []).map((p) => ({ ...p, imageUrl: imageByProduct[p.id] ?? null }))
  const initialItems = (itemsData ?? []).map((item) => ({ productId: item.product_id, quantity: item.quantity }))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Editar pedido</h1>
      <PedidoBuilder products={products} initialItems={initialItems} initialNotes={order.notes ?? ''} orderId={order.id} />
    </div>
  )
}
