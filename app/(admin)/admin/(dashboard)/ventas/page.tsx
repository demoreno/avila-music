import { createSupabaseServerClient } from '@/lib/supabase-server'
import SalesClient from './SalesClient'
import type { SaleItemDetail } from '@/types/index'

export default async function VentasPage() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('v_sale_items_detail')
    .select(
      'id, sale_id, sale_date, channel, product_name, quantity, unit_price_usd, unit_cost_usd, gross_profit_usd, margin_pct'
    )
    .order('sale_date', { ascending: false })

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
        Error al cargar las ventas: {error.message}
      </div>
    )
  }

  const rows = (data as Partial<SaleItemDetail>[]) ?? []

  const sales = rows
    .filter((row) => row.id && row.sale_id)
    .map((row) => ({
      id: row.id as string,
      sale_id: row.sale_id as string,
      sale_date: row.sale_date ?? '',
      channel: row.channel ?? '',
      product_name: row.product_name ?? '',
      quantity: Number(row.quantity ?? 0),
      unit_price_usd: Number(row.unit_price_usd ?? 0),
      unit_cost_usd: Number(row.unit_cost_usd ?? 0),
      gross_profit_usd: Number(row.gross_profit_usd ?? 0),
      margin_pct: Number(row.margin_pct ?? 0),
    }))

  return (
    <div>
      <h1 className="heading-serif mb-6 text-2xl font-bold text-slate-900">Ventas</h1>
      <SalesClient sales={sales} />
    </div>
  )
}
