import { createSupabaseServerClient } from '@/lib/supabase-server'
import KpiCard from '@/components/admin/KpiCard'
import RevenueChart from './RevenueChart'
import Link from 'next/link'
import type { MonthlyKpi, Product } from '@/types/index'

async function getMonthlyKpis() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('v_monthly_kpis')
    .select('*')
    .order('month', { ascending: false })
    .limit(3)
  return (data as MonthlyKpi[]) ?? []
}

async function getCriticalStock() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('products')
    .select('id, name, stock_total, stock_minimum')
    .eq('is_active', true)
    .order('stock_total')
    .limit(20)
  const all = (data as Pick<Product, 'id' | 'name' | 'stock_total' | 'stock_minimum'>[]) ?? []
  return all.filter((p) => p.stock_total <= p.stock_minimum)
}

function calcDelta(curr: number, prev: number | undefined): number | undefined {
  if (!prev || prev === 0) return undefined
  return ((curr - prev) / prev) * 100
}

export default async function DashboardPage() {
  const [kpis, criticalStock] = await Promise.all([getMonthlyKpis(), getCriticalStock()])

  const currentMonth = kpis[0]
  const previousMonth = kpis[1]
  const chartData = [...kpis].reverse()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="heading-serif text-2xl font-bold text-slate-900">Dashboard</h1>
        {currentMonth && (
          <span className="text-sm text-slate-500">
            Mes actual:{' '}
            {new Date(currentMonth.month + '-01').toLocaleDateString('es-VE', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        )}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">Ingresos últimos 3 meses</h2>
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
              {criticalStock.length > 0 && (
                <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  {criticalStock.length}
                </span>
              )}
            </h2>
            <Link href="/admin/inventario" className="text-xs text-amber-600 hover:text-amber-700">
              Ver inventario →
            </Link>
          </div>
          {criticalStock.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">
              Sin alertas de stock crítico
            </p>
          ) : (
            <div className="space-y-2">
              {criticalStock.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2"
                >
                  <span className="max-w-[200px] truncate text-sm font-medium text-slate-700">
                    {product.name}
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
