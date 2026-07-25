'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag } from 'lucide-react'
import type { Order, OrderStatus, PaymentStatus } from '@/types/index'

interface OrderRow extends Order {
  customer: { full_name: string | null; email: string | null } | null
}

interface OrdersTableProps {
  orders: OrderRow[]
}

const STATUS_LABELS: Record<OrderStatus, { label: string; className: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-amber-50 text-amber-700' },
  confirmado: { label: 'Confirmado', className: 'bg-blue-50 text-blue-700' },
  en_camino: { label: 'En camino', className: 'bg-blue-50 text-blue-700' },
  completado: { label: 'Completado', className: 'bg-emerald-50 text-emerald-700' },
  cancelado: { label: 'Cancelado', className: 'bg-slate-100 text-slate-500' },
}

const PAYMENT_STATUS_LABELS: Record<PaymentStatus, { label: string; className: string }> = {
  pendiente: { label: 'Pago pendiente', className: 'bg-amber-50 text-amber-700' },
  confirmado: { label: 'Pago confirmado', className: 'bg-emerald-50 text-emerald-700' },
  rechazado: { label: 'Pago rechazado', className: 'bg-red-50 text-red-700' },
}

const MONTH_LABELS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function monthRange(year: number, monthIndex: number): { start: string; end: string } {
  const start = `${year}-${pad(monthIndex + 1)}-01`
  const lastDay = new Date(year, monthIndex + 1, 0).getDate()
  const end = `${year}-${pad(monthIndex + 1)}-${pad(lastDay)}`
  return { start, end }
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // Month chips are built from the actual order dates present, newest first —
  // avoids showing empty months for a store with only a few months of history.
  const monthOptions = useMemo(() => {
    const seen = new Map<string, { year: number; index: number }>()
    for (const order of orders) {
      const d = new Date(order.created_at)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      if (!seen.has(key)) seen.set(key, { year: d.getFullYear(), index: d.getMonth() })
    }
    return Array.from(seen.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([key, { year, index }]) => ({ key, label: `${MONTH_LABELS_ES[index]} ${year}`, ...monthRange(year, index) }))
  }, [orders])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return orders.filter((order) => {
      const orderDate = order.created_at.slice(0, 10)
      if (dateFrom && orderDate < dateFrom) return false
      if (dateTo && orderDate > dateTo) return false
      if (!term) return true
      const reference = order.id.slice(0, 8).toLowerCase()
      const haystack = [reference, order.customer?.full_name ?? '', order.customer?.email ?? ''].join(' ').toLowerCase()
      return haystack.includes(term)
    })
  }, [orders, search, dateFrom, dateTo])

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente o # de orden..."
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      {monthOptions.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => { setDateFrom(''); setDateTo('') }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              !dateFrom && !dateTo ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos
          </button>
          {monthOptions.map((m) => {
            const active = dateFrom === m.start && dateTo === m.end
            return (
              <button
                key={m.key}
                onClick={() => { setDateFrom(m.start); setDateTo(m.end) }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <ShoppingBag className="h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">
            {orders.length === 0 ? 'Todavía no hay órdenes de clientes.' : 'Ninguna orden coincide con la búsqueda.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Orden</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Pago</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order) => {
                const status = STATUS_LABELS[order.status]
                const paymentStatus = PAYMENT_STATUS_LABELS[order.payment_status]
                return (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link href={`/admin/ordenes/${order.id}`} className="font-medium text-slate-800 hover:text-[#1e4d6b]">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {order.customer?.full_name || order.customer?.email ? (
                        <>
                          <p className="font-medium text-slate-700">{order.customer?.full_name || '—'}</p>
                          {order.customer?.email && <p className="text-xs text-slate-400">{order.customer.email}</p>}
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>{status.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${paymentStatus.className}`}>{paymentStatus.label}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">USD {order.total_usd.toFixed(2)}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(order.created_at).toLocaleDateString('es-VE')}
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
