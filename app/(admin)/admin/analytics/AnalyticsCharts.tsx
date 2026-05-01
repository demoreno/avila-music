'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import type { MonthlyKpi, ProductRanking } from '@/types/index'

const COLORS = ['#d97706', '#0f172a', '#059669', '#7c3aed', '#dc2626', '#0891b2']

interface AnalyticsChartsProps {
  monthlyKpis: MonthlyKpi[]
  topProducts: ProductRanking[]
  dowData: { day: string; ventas: number }[]
  categoryRevenue: { category: string; revenue: number }[]
  restockData: RestockRow[]
}

export interface RestockRow {
  id: string
  name: string
  stock_total: number
  sales_last_30: number
  days_of_stock: number | null
}

function formatMonth(month: string) {
  const d = new Date(month + '-01')
  return d.toLocaleDateString('es-VE', { month: 'short', year: '2-digit' })
}

export default function AnalyticsCharts({
  monthlyKpis,
  topProducts,
  dowData,
  categoryRevenue,
  restockData,
}: AnalyticsChartsProps) {
  const kpiChartData = monthlyKpis.map((k) => ({
    mes: formatMonth(k.month),
    ingresos: Number(k.gross_revenue_usd),
    ganancia: Number(k.gross_profit_usd),
    margen: Number(k.avg_margin_pct) * 100,
  }))

  const ticketData = monthlyKpis.map((k) => ({
    mes: formatMonth(k.month),
    ticket: k.total_sales > 0 ? Number(k.gross_revenue_usd) / k.total_sales : 0,
  }))

  return (
    <div className="space-y-8">
      {/* KPIs por mes */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold text-slate-800">KPIs por mes</h2>
        {kpiChartData.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">Sin datos</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={kpiChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'margen') return [`${Number(value).toFixed(1)}%`, 'Margen']
                  return [`USD ${Number(value).toFixed(2)}`, name === 'ingresos' ? 'Ingresos' : 'Ganancia']
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="ingresos" fill="#d97706" name="Ingresos" radius={[3, 3, 0, 0]} />
              <Bar yAxisId="left" dataKey="ganancia" fill="#0f172a" name="Ganancia" radius={[3, 3, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="margen" stroke="#059669" name="Margen %" dot={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top productos */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">Top 10 productos más vendidos</h2>
          {topProducts.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Sin datos</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={topProducts.slice(0, 10).map((p) => ({
                  nombre: p.product_name.length > 20 ? p.product_name.slice(0, 20) + '…' : p.product_name,
                  unidades: p.total_units_sold,
                }))}
                margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="nombre" tick={{ fontSize: 11 }} width={140} />
                <Tooltip formatter={(v) => [v, 'Unidades vendidas']} />
                <Bar dataKey="unidades" fill="#d97706" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Categorías pie */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">Ingresos por categoría</h2>
          {categoryRevenue.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Sin datos</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryRevenue}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {categoryRevenue.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`USD ${Number(v).toFixed(2)}`, 'Ingresos']} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Patrones temporales */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">Ventas por día de la semana</h2>
          {dowData.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Sin datos</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dowData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => [v, 'Ventas']} />
                <Bar dataKey="ventas" fill="#0f172a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Ticket promedio */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">Ticket promedio por mes</h2>
          {ticketData.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Sin datos</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ticketData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${Number(v).toFixed(0)}`} />
                <Tooltip formatter={(v) => [`USD ${Number(v).toFixed(2)}`, 'Ticket promedio']} />
                <Line type="monotone" dataKey="ticket" stroke="#d97706" strokeWidth={2} dot={{ fill: '#d97706' }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Reabastecimiento */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold text-slate-800">
          Recomendaciones de reabastecimiento
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold text-slate-600">Producto</th>
                <th className="px-4 py-2 font-semibold text-slate-600">Ventas (30 días)</th>
                <th className="px-4 py-2 font-semibold text-slate-600">Stock actual</th>
                <th className="px-4 py-2 font-semibold text-slate-600">Días de stock</th>
                <th className="px-4 py-2 font-semibold text-slate-600">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {restockData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                    Sin datos de ventas
                  </td>
                </tr>
              ) : (
                restockData.map((r) => {
                  const days = r.days_of_stock
                  const status =
                    days === null
                      ? { label: 'Sin movimiento', color: 'bg-slate-100 text-slate-600' }
                      : days <= 7
                      ? { label: 'Crítico', color: 'bg-red-100 text-red-700' }
                      : days <= 30
                      ? { label: 'Reordenar pronto', color: 'bg-amber-100 text-amber-700' }
                      : days > 180
                      ? { label: 'Exceso', color: 'bg-blue-100 text-blue-700' }
                      : { label: 'OK', color: 'bg-green-100 text-green-700' }

                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-2 font-medium text-slate-800">{r.name}</td>
                      <td className="px-4 py-2 text-slate-600">{r.sales_last_30.toFixed(1)}</td>
                      <td className="px-4 py-2 text-slate-700">{r.stock_total}</td>
                      <td className="px-4 py-2 text-slate-600">
                        {days !== null ? Math.round(days) : '—'}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
