'use client'

import { useMemo, useState } from 'react'
import { parseDateOnly } from '@/lib/format-date'

interface SaleRow {
  sale_id: string
  sale_date: string
  channel: string
  item_count: number
  gross_revenue: number
  gross_profit: number
  avg_margin: number
}

interface SalesClientProps {
  sales: SaleRow[]
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

const now = new Date()
const CURRENT_YEAR = now.getFullYear()
const CURRENT_MONTH_INDEX = now.getMonth()
const DEFAULT_RANGE = monthRange(CURRENT_YEAR, CURRENT_MONTH_INDEX)

export default function SalesClient({ sales }: SalesClientProps) {
  const [dateFrom, setDateFrom] = useState(DEFAULT_RANGE.start)
  const [dateTo, setDateTo] = useState(DEFAULT_RANGE.end)

  const monthOptions = useMemo(
    () =>
      Array.from({ length: CURRENT_MONTH_INDEX + 1 }, (_, i) => ({
        index: i,
        label: MONTH_LABELS_ES[i],
        ...monthRange(CURRENT_YEAR, i),
      })).reverse(),
    []
  )

  const filtered = useMemo(() => {
    return sales.filter((s) => {
      if (dateFrom && s.sale_date < dateFrom) return false
      if (dateTo && s.sale_date > dateTo) return false
      return true
    })
  }, [sales, dateFrom, dateTo])

  const totals = useMemo(() => {
    return filtered.reduce(
      (acc, s) => ({
        revenue: acc.revenue + s.gross_revenue,
        profit: acc.profit + s.gross_profit,
        count: acc.count + 1,
      }),
      { revenue: 0, profit: 0, count: 0 }
    )
  }, [filtered])

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {monthOptions.map((m) => {
          const active = dateFrom === m.start && dateTo === m.end
          return (
            <button
              key={m.index}
              onClick={() => { setDateFrom(m.start); setDateTo(m.end) }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          )
        })}
        <button
          onClick={() => { setDateFrom(''); setDateTo('') }}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            !dateFrom && !dateTo ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Todo
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">Desde:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">Hasta:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Ventas</p>
          <p className="text-xl font-bold text-slate-900">{totals.count}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Ingresos brutos</p>
          <p className="text-xl font-bold text-slate-900">USD {totals.revenue.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Ganancia bruta</p>
          <p className="text-xl font-bold text-slate-900">USD {totals.profit.toFixed(2)}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-600">Fecha</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Canal</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Items</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Ingresos brutos</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Ganancia</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Margen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No hay ventas en el período seleccionado
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.sale_id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-700">
                    {parseDateOnly(s.sale_date).toLocaleDateString('es-VE')}
                  </td>
                  <td className="px-4 py-3 text-slate-500 capitalize">{s.channel}</td>
                  <td className="px-4 py-3 text-slate-700">{s.item_count}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    USD {s.gross_revenue.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">USD {s.gross_profit.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        s.avg_margin >= 0.3
                          ? 'text-green-600'
                          : s.avg_margin >= 0.15
                          ? 'text-amber-600'
                          : 'text-red-500'
                      }`}
                    >
                      {(s.avg_margin * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
