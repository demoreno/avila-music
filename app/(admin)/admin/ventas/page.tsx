import { createSupabaseServerClient } from '@/lib/supabase-server'
import SalesClient from './SalesClient'
import type { SaleItemDetail } from '@/types/index'

export default async function VentasPage() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('v_sale_items_detail')
    .select('sale_id, sale_date, channel, unit_price_usd, gross_profit_usd, margin_pct')
    .order('sale_date', { ascending: false })

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
        Error al cargar las ventas: {error.message}
      </div>
    )
  }

  const rows = (data as Partial<SaleItemDetail>[]) ?? []

  const salesMap = new Map<
    string,
    { sale_id: string; sale_date: string; channel: string; items: number; revenue: number; profit: number; margins: number[] }
  >()

  for (const row of rows) {
    if (!row.sale_id) continue
    const existing = salesMap.get(row.sale_id)
    if (existing) {
      existing.items++
      existing.revenue += Number(row.unit_price_usd ?? 0)
      existing.profit += Number(row.gross_profit_usd ?? 0)
      existing.margins.push(Number(row.margin_pct ?? 0))
    } else {
      salesMap.set(row.sale_id, {
        sale_id: row.sale_id,
        sale_date: row.sale_date ?? '',
        channel: row.channel ?? '',
        items: 1,
        revenue: Number(row.unit_price_usd ?? 0),
        profit: Number(row.gross_profit_usd ?? 0),
        margins: [Number(row.margin_pct ?? 0)],
      })
    }
  }

  const sales = Array.from(salesMap.values()).map((s) => ({
    sale_id: s.sale_id,
    sale_date: s.sale_date,
    channel: s.channel,
    item_count: s.items,
    gross_revenue: s.revenue,
    gross_profit: s.profit,
    avg_margin: s.margins.length > 0 ? s.margins.reduce((a, b) => a + b, 0) / s.margins.length : 0,
  }))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Ventas</h1>
      <SalesClient sales={sales} />
    </div>
  )
}
