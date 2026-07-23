'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, TrendingUp, Package, Clock } from 'lucide-react'

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

export default function ReorderTab({ data }: { data: ReorderRow[] }) {
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>('urgentes')

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
                <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                  No hay productos en esta categoría.
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const cfg = urgencyConfig[r.urgency] ?? urgencyConfig.ok
                return (
                  <tr key={r.id} className="hover:bg-slate-50">
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

      {filtered.some((r) => r.suggested_order_qty > 0) && (
        <div className="mt-4 flex justify-end">
          <Link
            href="/admin/pedidos/nuevo"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Crear pedido con sugeridos
          </Link>
        </div>
      )}
    </div>
  )
}
