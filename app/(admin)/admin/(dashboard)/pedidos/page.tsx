import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function PedidosPage() {
  const supabase = await createSupabaseServerClient()

  const [{ data: orders }, { data: itemRows }, { data: productRows }] = await Promise.all([
    supabase.from('purchase_orders').select('id, notes, created_at').order('created_at', { ascending: false }),
    supabase.from('purchase_order_items').select('purchase_order_id, product_id, quantity'),
    supabase.from('products').select('id, cost_usd'),
  ])

  const costByProduct = (productRows ?? []).reduce<Record<string, number>>((acc, p) => {
    acc[p.id] = p.cost_usd
    return acc
  }, {})

  const totalsByOrder = (itemRows ?? []).reduce<Record<string, { items: number; total: number }>>((acc, row) => {
    const existing = acc[row.purchase_order_id] ?? { items: 0, total: 0 }
    existing.items += row.quantity
    existing.total += row.quantity * (costByProduct[row.product_id] ?? 0)
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
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-600">Fecha</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Notas</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Unidades</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Total estimado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((order) => {
                const totals = totalsByOrder[order.id] ?? { items: 0, total: 0 }
                return (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">
                      {new Date(order.created_at).toLocaleDateString('es-VE')}
                    </td>
                    <td className="max-w-[240px] truncate px-4 py-3 text-slate-500">{order.notes || '—'}</td>
                    <td className="px-4 py-3 text-slate-700">{totals.items}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">USD {totals.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/pedidos/${order.id}`}
                        className="text-amber-600 hover:text-amber-700 text-xs font-medium"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
