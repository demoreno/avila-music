'use client'

import { useState } from 'react'
import { AlertTriangle, TrendingUp, Package, Clock, ClipboardList, X } from 'lucide-react'
import PedidoBuilder, { type PedidoProductOption } from '@/components/admin/PedidoBuilder'

export interface ReorderRow {
  id: string
  product_name: string
  supplier_code: string | null
  subcategory_name: string | null
  category_name: string | null
  stock_total: number
  stock_minimum: number
  cost_usd: number
  stock_status: string
  units_sold_period: number
  months_with_sales: number
  avg_monthly_velocity: number
  months_of_stock: number | null
  reorder_point: number
  pending_in_orders: number
  suggested_order_qty: number
  suggested_order_cost: number
  urgency: string
}

const urgencyConfig: Record<string, { label: string; color: string; bg: string }> = {
  sin_stock_vende: { label: 'Sin stock (vende)', color: 'text-red-700', bg: 'bg-red-100' },
  critico: { label: 'Crítico', color: 'text-orange-700', bg: 'bg-orange-100' },
  pedir_pronto: { label: 'Pedir pronto', color: 'text-amber-700', bg: 'bg-amber-100' },
  ok: { label: 'OK', color: 'text-green-700', bg: 'bg-green-100' },
  sin_movimiento: { label: 'Sin movimiento', color: 'text-slate-500', bg: 'bg-slate-100' },
  inactivo: { label: 'Inactivo', color: 'text-slate-400', bg: 'bg-slate-50' },
}

type UrgencyFilter = 'todos' | 'urgentes' | 'sin_movimiento'

interface ReorderTabProps {
  data: ReorderRow[]
  pedidoProducts: PedidoProductOption[]
}

export default function ReorderTab({ data, pedidoProducts }: ReorderTabProps) {
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>('urgentes')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = data.filter((r) => {
    if (urgencyFilter === 'urgentes')
      return r.urgency === 'sin_stock_vende' || r.urgency === 'critico' || r.urgency === 'pedir_pronto'
    if (urgencyFilter === 'sin_movimiento')
      return r.urgency === 'sin_movimiento' || r.urgency === 'inactivo'
    return true
  })

  const totalSuggestedCost = filtered
    .filter((r) => r.suggested_order_qty > 0)
    .reduce((sum, r) => sum + Number(r.suggested_order_cost), 0)

  const urgentCount = data.filter(
    (r) => r.urgency === 'sin_stock_vende' || r.urgency === 'critico' || r.urgency === 'pedir_pronto'
  ).length

  return (
    <div>
      {/* Summary cards */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">Urgentes</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-red-700">{urgentCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Package className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">Sugerido pedir</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {filtered.reduce((sum, r) => sum + r.suggested_order_qty, 0)} uds
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">Inversión est.</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-800">USD {totalSuggestedCost.toFixed(0)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">Sin movimiento</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {data.filter((r) => r.urgency === 'sin_movimiento' || r.urgency === 'inactivo').length}
          </p>
        </div>
      </div>

      {/* Sub-filter */}
      <div className="mb-3 flex gap-2">
        {([
          ['urgentes', 'Necesitan reposición'],
          ['todos', 'Todos'],
          ['sin_movimiento', 'Sin movimiento'],
        ] as [UrgencyFilter, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setUrgencyFilter(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              urgencyFilter === key
                ? 'bg-slate-800 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={filtered.filter((r) => r.suggested_order_qty > 0).length > 0 && filtered.filter((r) => r.suggested_order_qty > 0).every((r) => selected.has(r.id))}
                  onChange={() => {
                    const selectable = filtered.filter((r) => r.suggested_order_qty > 0)
                    const allSelected = selectable.every((r) => selected.has(r.id))
                    setSelected((prev) => {
                      const next = new Set(prev)
                      if (allSelected) selectable.forEach((r) => next.delete(r.id))
                      else selectable.forEach((r) => next.add(r.id))
                      return next
                    })
                  }}
                  className="rounded"
                  aria-label="Seleccionar todos"
                />
              </th>
              <th className="px-4 py-3 font-semibold text-slate-600">Producto</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Urgencia</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-right">Vel. mensual</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-right">Stock</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-right">Meses restantes</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-right">En pedido</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-right">Sugerido pedir</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-right">Costo est.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                  No hay productos en esta categoría.
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const cfg = urgencyConfig[r.urgency] ?? urgencyConfig.ok
                return (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(r.id)}
                        onChange={() => setSelected((prev) => {
                          const next = new Set(prev)
                          if (next.has(r.id)) next.delete(r.id)
                          else next.add(r.id)
                          return next
                        })}
                        disabled={r.suggested_order_qty === 0}
                        className="rounded disabled:opacity-30"
                        aria-label={`Seleccionar ${r.product_name}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{r.product_name}</p>
                      {r.subcategory_name && (
                        <p className="text-xs text-slate-400">{r.subcategory_name}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-700">
                      {r.avg_monthly_velocity > 0 ? `${r.avg_monthly_velocity} uds/mes` : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${r.stock_total === 0 ? 'text-red-600' : 'text-slate-700'}`}>
                        {r.stock_total}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.months_of_stock !== null ? (
                        <span
                          className={`font-semibold ${
                            r.months_of_stock < 4
                              ? 'text-red-600'
                              : r.months_of_stock < 5
                              ? 'text-amber-600'
                              : 'text-green-600'
                          }`}
                        >
                          {r.months_of_stock} meses
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {r.pending_in_orders > 0 ? r.pending_in_orders : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.suggested_order_qty > 0 ? (
                        <span className="font-bold text-blue-700">{r.suggested_order_qty}</span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {r.suggested_order_qty > 0 ? `USD ${Number(r.suggested_order_cost).toFixed(2)}` : '—'}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {selected.size > 0 && (
        <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
          <div className="flex items-center gap-4 rounded-full bg-slate-900 px-6 py-3 shadow-2xl">
            <span className="text-sm font-medium text-white">
              {selected.size} producto{selected.size === 1 ? '' : 's'} seleccionado{selected.size === 1 ? '' : 's'}
            </span>
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-600"
            >
              <ClipboardList className="h-4 w-4" />
              Crear pedido
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-slate-400 hover:text-white"
              aria-label="Cancelar selección"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl bg-slate-50 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="heading-serif text-xl font-bold text-slate-900">Nuevo pedido (sugerido)</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-700"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <PedidoBuilder
              products={pedidoProducts}
              initialItems={Array.from(selected)
                .map((id) => {
                  const row = data.find((r) => r.id === id)
                  return row ? { productId: id, quantity: row.suggested_order_qty } : null
                })
                .filter((item): item is { productId: string; quantity: number } => item !== null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
