import { notFound } from 'next/navigation'
import { MapPin, StickyNote } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import OrderStatusPanel from '@/components/admin/OrderStatusPanel'
import PaymentReviewPanel from '@/components/admin/PaymentReviewPanel'
import type { Order, OrderItem } from '@/types/index'

export default async function OrdenDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const [{ data: order }, { data: items }] = await Promise.all([
    supabase.from('orders').select('*').eq('id', id).single(),
    supabase.from('order_items').select('*').eq('order_id', id),
  ])

  if (!order) notFound()

  const [{ data: customer }, proofUrl, shippingProofUrl] = await Promise.all([
    supabase.from('profiles').select('full_name, email').eq('id', order.customer_id).single(),
    (order as Order).payment_proof_path
      ? supabase.storage
          .from('payment-proofs')
          .createSignedUrl((order as Order).payment_proof_path as string, 60 * 10)
          .then((res) => res.data?.signedUrl ?? null)
      : Promise.resolve(null),
    (order as Order).shipping_proof_path
      ? supabase.storage
          .from('shipping-proofs')
          .createSignedUrl((order as Order).shipping_proof_path as string, 60 * 10)
          .then((res) => res.data?.signedUrl ?? null)
      : Promise.resolve(null),
  ])

  return (
    <div>
      <div className="mb-6">
        <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">
          Orden #{(order as Order).id.slice(0, 8).toUpperCase()}
        </h1>
        <p className="text-sm text-slate-500">
          {customer?.full_name || 'Cliente'}
          {customer?.email && <span className="text-slate-400"> — {customer.email}</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Productos</h3>
            <div className="divide-y divide-slate-100">
              {(items as OrderItem[] ?? []).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-slate-700">{item.quantity}x {item.product_name}</span>
                  <span className="font-medium text-slate-800">USD {(item.unit_price_usd * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="text-sm font-bold text-slate-800">Total</span>
              <span className="text-sm font-bold text-slate-800">USD {(order as Order).total_usd.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin className="h-4 w-4" />
              Dirección de envío
            </h3>
            <p className="whitespace-pre-line text-sm text-slate-600">{(order as Order).shipping_address}</p>
          </div>

          {(order as Order).notes && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <StickyNote className="h-4 w-4" />
                Notas del cliente
              </h3>
              <p className="whitespace-pre-line text-sm text-slate-600">{(order as Order).notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <PaymentReviewPanel order={order as Order} proofUrl={proofUrl} />
          <OrderStatusPanel order={order as Order} shippingProofUrl={shippingProofUrl} />
        </div>
      </div>
    </div>
  )
}
