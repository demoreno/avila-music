import { createSupabaseServerClient } from '@/lib/supabase-server'
import { parseDateOnly } from '@/lib/format-date'
import KpiCard from '@/components/admin/KpiCard'
import RevenueChart from './RevenueChart'
import Link from 'next/link'
import { Truck, PiggyBank, Wallet, ChevronLeft, ChevronRight } from 'lucide-react'
import type { MonthlyKpi, MonthlyKpiByChannel } from '@/types/index'

const CHANNEL_LABELS: Record<string, string> = {
  mercadolibre: 'MercadoLibre',
  directo: 'Directo / Web',
}

interface UrgentStockRow {
  id: string
  product_name: string
  stock_total: number
  stock_minimum: number
}

interface IncomingOrder {
  id: string
  notes: string | null
  estimated_arrival_date: string | null
  items: number
}

async function getMonthlyKpis() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('v_monthly_kpis')
    .select('*')
    .order('month', { ascending: false })
    .limit(24)
  return (data as MonthlyKpi[]) ?? []
}

async function getMonthlyKpisByChannel(month: string) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('v_monthly_kpis_by_channel')
    .select('*')
    .eq('month', month)
  return (data as MonthlyKpiByChannel[]) ?? []
}

/**
 * Same logic as Inventario's "Necesitan reposición" — stock bajo Y no ya
 * cubierto por un pedido en camino (suggested_order_qty > 0), en vez del
 * chequeo ciego de stock vs mínimo que ignoraba pedidos ya hechos.
 */
async function getUrgentStock() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('v_reorder_intelligence')
    .select('id, product_name, stock_total, stock_minimum, suggested_order_qty, urgency')
    .in('urgency', ['sin_stock_vende', 'critico', 'pedir_pronto'])
    .gt('suggested_order_qty', 0)
    .order('stock_total')
  return (data as (UrgentStockRow & { suggested_order_qty: number; urgency: string })[]) ?? []
}

async function getProfitSplitConfig() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('app_config')
    .select('key, value')
    .in('key', ['reinvestment_pct', 'personal_salary_pct'])
  const config = (data ?? []).reduce<Record<string, number>>((acc, row) => {
    acc[row.key] = Number(row.value)
    return acc
  }, {})
  return {
    reinvestmentPct: config.reinvestment_pct ?? 0.7,
    personalSalaryPct: config.personal_salary_pct ?? 0.3,
  }
}

async function getIncomingOrders(): Promise<IncomingOrder[]> {
  const supabase = await createSupabaseServerClient()
  const [{ data: orders }, { data: items }] = await Promise.all([
    supabase
      .from('purchase_orders')
      .select('id, notes, estimated_arrival_date')
      .eq('status', 'en_camino')
      .order('estimated_arrival_date', { ascending: true, nullsFirst: false }),
    supabase.from('purchase_order_items').select('purchase_order_id, quantity'),
  ])

  const itemsByOrder = (items ?? []).reduce<Record<string, number>>((acc, item) => {
    acc[item.purchase_order_id] = (acc[item.purchase_order_id] ?? 0) + item.quantity
    return acc
  }, {})

  return (orders ?? []).map((order) => ({
    id: order.id,
    notes: order.notes,
    estimated_arrival_date: order.estimated_arrival_date,
    items: itemsByOrder[order.id] ?? 0,
  }))
}

function calcDelta(curr: number, prev: number | undefined): number | undefined {
  if (!prev || prev === 0) return undefined
  return ((curr - prev) / prev) * 100
}

// `month` viene de Postgres como timestamptz (ej. "2026-06-01T00:00:00+00:00").
// Comparamos/enlazamos solo por "YYYY-MM" para no depender del encoding del "+" en la query string.
function monthKey(month: string): string {
  return month.slice(0, 7)
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>
}) {
  const { month: monthParam } = await searchParams

  const [kpis, urgentStock, profitConfig, incomingOrders] = await Promise.all([
    getMonthlyKpis(),
    getUrgentStock(),
    getProfitSplitConfig(),
    getIncomingOrders(),
  ])

  const selectedIndex = monthParam
    ? Math.max(
        kpis.findIndex((row) => monthKey(row.month) === monthParam),
        0
      )
    : 0

  const currentMonth = kpis[selectedIndex]
  const previousMonth = kpis[selectedIndex + 1]
  const newerMonth = kpis[selectedIndex - 1]
  const canGoNewer = selectedIndex > 0
  const canGoOlder = selectedIndex < kpis.length - 1

  const chartData = kpis.slice(selectedIndex, selectedIndex + 3).reverse()
  const kpisByChannel = currentMonth ? await getMonthlyKpisByChannel(currentMonth.month) : []
  const currentMonthByChannel = kpisByChannel

  const netProfit = currentMonth ? Number(currentMonth.gross_profit_usd) : 0
  const reinvestmentAmount = netProfit * profitConfig.reinvestmentPct
  const salaryAmount = netProfit * profitConfig.personalSalaryPct

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#1e4d6b] to-[#4da8da] p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-serif text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-blue-100">Resumen ejecutivo de ventas y rendimiento</p>
          </div>
          {currentMonth && (
            <div className="flex items-center gap-2">
              <Link
                href={canGoOlder ? `/admin/dashboard?month=${monthKey(previousMonth.month)}` : '#'}
                aria-disabled={!canGoOlder}
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-colors ${
                  canGoOlder ? 'text-white hover:bg-white/20' : 'pointer-events-none text-white/30'
                }`}
                aria-label="Mes anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
                  {selectedIndex === 0 ? 'Mes actual' : 'Mes seleccionado'}
                </p>
                <p className="text-lg font-semibold text-white">
                  {parseDateOnly(currentMonth.month).toLocaleDateString('es-VE', {
                    month: 'long',
                    year: 'numeric',
                  }).charAt(0).toUpperCase().slice(0, 1) + parseDateOnly(currentMonth.month).toLocaleDateString('es-VE', {
                    month: 'long',
                    year: 'numeric',
                  }).slice(1)}
                </p>
              </div>
              <Link
                href={canGoNewer ? `/admin/dashboard?month=${monthKey(newerMonth.month)}` : '#'}
                aria-disabled={!canGoNewer}
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-colors ${
                  canGoNewer ? 'text-white hover:bg-white/20' : 'pointer-events-none text-white/30'
                }`}
                aria-label="Mes siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Ventas del mes"
          value={currentMonth ? String(currentMonth.total_sales) : '—'}
          delta={
            currentMonth && previousMonth
              ? calcDelta(currentMonth.total_sales, previousMonth.total_sales)
              : undefined
          }
          deltaLabel="vs mes anterior"
        />
        <KpiCard
          label="Ingresos brutos"
          value={currentMonth ? Number(currentMonth.gross_revenue_usd).toFixed(2) : '—'}
          prefix="USD "
          delta={
            currentMonth && previousMonth
              ? calcDelta(
                  Number(currentMonth.gross_revenue_usd),
                  Number(previousMonth.gross_revenue_usd)
                )
              : undefined
          }
          deltaLabel="vs mes anterior"
        />
        <KpiCard
          label="Ganancia bruta"
          value={currentMonth ? Number(currentMonth.gross_profit_usd).toFixed(2) : '—'}
          prefix="USD "
          delta={
            currentMonth && previousMonth
              ? calcDelta(
                  Number(currentMonth.gross_profit_usd),
                  Number(previousMonth.gross_profit_usd)
                )
              : undefined
          }
          deltaLabel="vs mes anterior"
        />
        <KpiCard
          label="Margen promedio"
          value={
            currentMonth
              ? (Number(currentMonth.avg_margin_pct) * 100).toFixed(1)
              : '—'
          }
          suffix="%"
          delta={
            currentMonth && previousMonth
              ? calcDelta(
                  Number(currentMonth.avg_margin_pct),
                  Number(previousMonth.avg_margin_pct)
                )
              : undefined
          }
          deltaLabel="vs mes anterior"
        />
      </div>

      {currentMonthByChannel.length > 0 && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">
            Por canal — {selectedIndex === 0 ? 'mes actual' : 'mes seleccionado'}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {currentMonthByChannel.map((row) => (
              <div key={row.channel} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  {CHANNEL_LABELS[row.channel] ?? row.channel}
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Ventas</p>
                    <p className="font-bold text-slate-900">{row.total_sales}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Ingresos</p>
                    <p className="font-bold text-slate-900">USD {Number(row.gross_revenue_usd).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Ganancia</p>
                    <p className="font-bold text-slate-900">USD {Number(row.gross_profit_usd).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Margen</p>
                    <p className="font-bold text-slate-900">{(Number(row.avg_margin_pct) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">
            Distribución de ganancia — {selectedIndex === 0 ? 'mes actual' : 'mes seleccionado'}
          </h2>
          {currentMonth ? (
            <div className="space-y-3">
              <div className="space-y-1.5 rounded-lg border border-slate-100 px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Ingresos brutos</span>
                  <span className="font-semibold text-slate-800">
                    USD {Number(currentMonth.gross_revenue_usd).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">− Comisiones MercadoLibre</span>
                  <span className="font-medium text-red-500">
                    − USD {Number(currentMonth.total_ml_commissions_usd).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">− Envíos</span>
                  <span className="font-medium text-red-500">
                    − USD {Number(currentMonth.total_shipping_usd).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">− Costo de productos</span>
                  <span className="font-medium text-red-500">
                    − USD {Number(currentMonth.total_cost_usd).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-600">= Ganancia neta del mes</span>
                <span className="text-lg font-bold text-slate-900">USD {netProfit.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <PiggyBank className="h-4 w-4 text-[#0f7a5f]" />
                  Reinversión ({(profitConfig.reinvestmentPct * 100).toFixed(0)}%)
                </span>
                <span className="text-lg font-bold text-[#0f7a5f]">USD {reinvestmentAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Wallet className="h-4 w-4 text-amber-600" />
                  Tu sueldo / ganancia personal ({(profitConfig.personalSalaryPct * 100).toFixed(0)}%)
                </span>
                <span className="text-lg font-bold text-amber-600">USD {salaryAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-400">Sin datos disponibles</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Pedidos en camino</h2>
            <Link href="/admin/pedidos" className="text-xs text-[#1e4d6b] hover:text-[#153a52]">
              Ver pedidos →
            </Link>
          </div>
          {incomingOrders.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">No hay pedidos en camino ahora mismo.</p>
          ) : (
            <div className="space-y-2">
              {incomingOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/pedidos/${order.id}`}
                  className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 hover:bg-blue-100"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {order.notes || `Pedido — ${order.items} unidad(es)`}
                    </p>
                    <p className="text-xs text-slate-500">{order.items} unidad(es)</p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1.5 text-xs font-semibold text-blue-700">
                    <Truck className="h-3.5 w-3.5" />
                    {order.estimated_arrival_date
                      ? parseDateOnly(order.estimated_arrival_date).toLocaleDateString('es-VE')
                      : 'Sin fecha'}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">
            Ingresos — 3 meses hasta {currentMonth ? parseDateOnly(currentMonth.month).toLocaleDateString('es-VE', { month: 'short', year: 'numeric' }) : ''}
          </h2>
          {chartData.length > 0 ? (
            <RevenueChart data={chartData} />
          ) : (
            <p className="py-8 text-center text-sm text-slate-400">Sin datos disponibles</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">
              Alertas de stock
              {urgentStock.length > 0 && (
                <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  {urgentStock.length}
                </span>
              )}
            </h2>
            <Link href="/admin/inventario" className="text-xs text-[#1e4d6b] hover:text-[#153a52]">
              Ver inventario →
            </Link>
          </div>
          {urgentStock.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">
              Sin alertas de stock crítico
            </p>
          ) : (
            <div className="space-y-2">
              {urgentStock.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2"
                >
                  <span className="max-w-[200px] truncate text-sm font-medium text-slate-700">
                    {product.product_name}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-red-600">Stock: {product.stock_total}</span>
                    <span className="text-slate-400">/ mín {product.stock_minimum}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
