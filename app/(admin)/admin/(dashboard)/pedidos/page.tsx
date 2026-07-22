import Link from 'next/link'
import { Plus, Truck } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { parseDateOnly } from '@/lib/format-date'
import { STATUS_OPTIONS } from '@/lib/purchase-order-status'
import type { PurchaseOrderStatus } from '@/types/index'

export default async function PedidosPage() {
  const supabase = await createSupabaseServerClient()

  const [{ data: orders }, { data: itemRows }, { data: productRows }] = await Promise.all([
    supabase
      .from('purchase_orders')
      .select('id, notes, status, estimated_arrival_date, created_at')
      .order('created_at', { ascending: false }),
    supabase.from('purchase_order_items').select('purchase_order_id, product_id, quantity'),
    supabase.from('products').select('id, name, cost_usd'),
  ])

  const productById = (productRows ?? []).reduce<Record<string, { name: string; cost_usd: number }>>((acc, p) => {
    acc[p.id] = { name: p.name, cost_usd: p.cost_usd }
    return acc
  }, {})

  const detailsByOrder = (itemRows ?? []).reduce<
    Record<string, { items: number; total: number; lines: { name: string; quantity: number }[] }>
  >((acc, row) => {
    const existing = acc[row.purchase_order_id] ?? { items: 0, total: 0, lines: [] }
    const product = productById[row.product_id]
    existing.items += row.quantity
    existing.total += row.quantity * (product?.cost_usd ?? 0)
    existing.lines.push({ name: product?.name ?? 'Producto', quantity: row.quantity })
    acc[row.purchase_order_id] = existing
    return acc
  }, {})

  const rows = orders ?? []

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="heading-serif text-2xl font-bold text-slate-900">Pedidos</h1>
        <Link
          href="/admin/pedidos/nuevo"
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Nuevo pedido
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-400">
          Todavía no creaste ningún pedido. Podés armar uno desde acá o seleccionando productos en Inventario.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map((order) => {
            const details = detailsByOrder[order.id] ?? { items: 0, total: 0, lines: [] }
            const statusOption = STATUS_OPTIONS.find((o) => o.value === (order.status as PurchaseOrderStatus))
            const previewLines = details.lines.slice(0, 4)
            const remaining = details.lines.length - previewLines.length

            return (
              <Link
                key={order.id}
                href={`/admin/pedidos/${order.id}`}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusOption?.badgeClass}`}>
                    {statusOption?.label ?? order.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    {parseDateOnly(order.created_at).toLocaleDateString('es-VE')}
                  </span>
                </div>

                {order.notes && (
                  <p className="mb-2 line-clamp-2 text-xs italic text-slate-500">{order.notes}</p>
                )}

                <div className="mb-3 flex-1 space-y-1 text-sm text-slate-700">
                  {previewLines.map((line, idx) => (
                    <p key={idx} className="truncate">
                      {line.quantity}x {line.name}
                    </p>
                  ))}
                  {remaining > 0 && <p className="text-xs text-slate-400">+{remaining} más</p>}
                </div>

                {order.estimated_arrival_date && (
                  <p className="mb-2 flex items-center gap-1.5 text-xs text-blue-600">
                    <Truck className="h-3.5 w-3.5" />
                    Llega {parseDateOnly(order.estimated_arrival_date).toLocaleDateString('es-VE')}
                  </p>
                )}

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-500">{details.items} unidades</span>
                  <span className="font-semibold text-slate-800">USD {details.total.toFixed(2)}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
