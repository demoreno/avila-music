'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { requireAdminUser } from '@/lib/require-admin'
import type { PaymentMethod } from '@/types/index'

export type SaleChannel = 'directo' | 'mercadolibre'

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// adminClient uses the service-role key, which bypasses RLS entirely — every
// action in this file MUST call requireAdminUser() before touching adminClient.

interface ManualSaleItemInput {
  productId: string
  quantity: number
  unitPriceUsd: number
}

interface ManualSaleInput {
  saleDate: string
  channel: SaleChannel
  paymentMethod: PaymentMethod
  shippingType: string
  discountUsd: number
  notes: string | null
  items: ManualSaleItemInput[]
}

interface ManualSaleResult {
  saleId: string
  itemCount: number
  totalRevenue: number
  totalGrossProfit: number
  totalShippingCost: number
}

export async function createManualSale(input: ManualSaleInput): Promise<ManualSaleResult> {
  const user = await requireAdminUser()

  const { data, error } = await adminClient
    .rpc('create_manual_sale', {
      p_sale_date: input.saleDate,
      p_channel: input.channel,
      p_payment_method: input.paymentMethod,
      p_shipping_type: input.shippingType,
      p_discount_usd: input.discountUsd,
      p_notes: input.notes,
      p_items: input.items.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
        unit_price_usd: item.unitPriceUsd,
      })),
      p_created_by: user.id,
    })
    .single()

  if (error) throw new Error(error.message)

  const row = data as {
    sale_id: string
    item_count: number
    total_revenue: number
    total_gross_profit: number
    total_shipping_cost: number
  }

  revalidatePath('/admin/facturacion')
  revalidatePath('/admin/ventas')
  revalidatePath('/admin/inventario')
  revalidatePath('/admin/productos')
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/analytics')

  return {
    saleId: row.sale_id,
    itemCount: row.item_count,
    totalRevenue: Number(row.total_revenue),
    totalGrossProfit: Number(row.total_gross_profit),
    totalShippingCost: Number(row.total_shipping_cost),
  }
}
