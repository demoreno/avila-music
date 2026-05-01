import { createSupabaseServerClient } from '@/lib/supabase-server'
import AnalyticsCharts from './AnalyticsCharts'
import type { MonthlyKpi, ProductRanking } from '@/types/index'

const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

interface SaleDetailRow {
  sale_date: string | null
  category_name: string | null
  unit_price_usd: number | null
  product_id: string | null
}

interface ProductRow {
  id: string
  name: string
  stock_total: number
}

export default async function AnalyticsPage() {
  const supabase = await createSupabaseServerClient()

  const [kpisRes, rankingRes, detailRes, productsRes] = await Promise.all([
    supabase.from('v_monthly_kpis').select('*').order('month'),
    supabase
      .from('v_product_ranking')
      .select('*')
      .order('total_units_sold', { ascending: false })
      .limit(10),
    supabase
      .from('v_sale_items_detail')
      .select('sale_date, category_name, unit_price_usd, product_id'),
    supabase
      .from('products')
      .select('id, name, stock_total')
      .eq('is_active', true)
      .order('name'),
  ])

  const kpis = (kpisRes.data as MonthlyKpi[]) ?? []
  const topProducts = (rankingRes.data as ProductRanking[]) ?? []
  const details = (detailRes.data as SaleDetailRow[]) ?? []
  const products = (productsRes.data as ProductRow[]) ?? []

  // Day of week counts
  const dowCounts = new Array(7).fill(0) as number[]
  for (const row of details) {
    if (!row.sale_date) continue
    const dow = new Date(row.sale_date).getDay()
    dowCounts[dow]++
  }
  const dowData = DAYS_ES.map((day, i) => ({ day, ventas: dowCounts[i] }))

  // Category revenue
  const catRevMap = new Map<string, number>()
  for (const row of details) {
    if (!row.category_name) continue
    const prev = catRevMap.get(row.category_name) ?? 0
    catRevMap.set(row.category_name, prev + Number(row.unit_price_usd ?? 0))
  }
  const categoryRevenue = Array.from(catRevMap.entries())
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue)

  // Restock: sales in last 30 days per product
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const cutoff = thirtyDaysAgo.toISOString().split('T')[0]

  const salesLast30Map = new Map<string, number>()
  for (const row of details) {
    if (!row.product_id || !row.sale_date || row.sale_date < cutoff) continue
    salesLast30Map.set(row.product_id, (salesLast30Map.get(row.product_id) ?? 0) + 1)
  }

  const restockData = products
    .map((p) => {
      const sales30 = salesLast30Map.get(p.id) ?? 0
      const dailyRate = sales30 / 30
      const daysOfStock = dailyRate > 0 ? p.stock_total / dailyRate : null
      return {
        id: p.id,
        name: p.name,
        stock_total: p.stock_total,
        sales_last_30: sales30,
        days_of_stock: daysOfStock,
      }
    })
    .sort((a, b) => (a.days_of_stock ?? Infinity) - (b.days_of_stock ?? Infinity))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Analytics</h1>
      <AnalyticsCharts
        monthlyKpis={kpis}
        topProducts={topProducts}
        dowData={dowData}
        categoryRevenue={categoryRevenue}
        restockData={restockData}
      />
    </div>
  )
}
