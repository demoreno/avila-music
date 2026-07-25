'use server'

import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { CartItem } from '@/lib/cart/types'

interface CreateOrderInput {
  shippingAddress: string
  notes: string | null
  preferredCarrier: string | null
  items: CartItem[]
}

/**
 * Customer-owned insert, so this uses the regular RLS-scoped client (not the
 * service-role adminClient pattern admin actions use) — RLS itself enforces
 * that customer_id must equal the caller's own auth.uid().
 *
 * Returns null (not an error) when the visitor isn't logged in — checkout still
 * completes via WhatsApp either way, this is a best-effort enhancement, not a
 * hard requirement to buy.
 */
export async function createOrder(input: CreateOrderInput): Promise<{ orderId: string; reference: string } | null> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  if (input.items.length === 0) throw new Error('El carrito está vacío')
  if (!input.shippingAddress.trim()) throw new Error('Falta la dirección de envío')

  const hasAllPrices = input.items.every((item) => item.unitPriceUsd !== null)
  const totalUsd = hasAllPrices
    ? input.items.reduce((sum, item) => sum + (item.unitPriceUsd as number) * item.quantity, 0)
    : 0

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: user.id,
      shipping_address: input.shippingAddress.trim(),
      notes: input.notes?.trim() || null,
      preferred_carrier: input.preferredCarrier,
      total_usd: totalUsd,
    })
    .select('id')
    .single()

  if (orderError) throw new Error(orderError.message)

  const { error: itemsError } = await supabase.from('order_items').insert(
    input.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.name,
      quantity: item.quantity,
      unit_price_usd: item.unitPriceUsd ?? 0,
    }))
  )

  if (itemsError) throw new Error(itemsError.message)

  return { orderId: order.id as string, reference: (order.id as string).slice(0, 8).toUpperCase() }
}
