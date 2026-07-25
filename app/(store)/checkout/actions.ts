'use server'

import { after } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getBcvRate } from '@/lib/bcv/get-rate'
import { notifyNewOrder } from '@/lib/notify-order-email'
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
 * Requires an authenticated session — checkout used to allow anonymous orders
 * as a "best effort" enhancement, but that let anyone persist an order without
 * ever creating an account, which was flagged as a real security gap. The
 * checkout page also gates this client-side (redirects to /cuenta/login), but
 * this check is the real boundary — never trust the client-side gate alone.
 */
export async function createOrder(input: CreateOrderInput): Promise<{ orderId: string; reference: string }> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Debes iniciar sesión para completar tu pedido.')

  if (input.items.length === 0) throw new Error('El carrito está vacío')
  if (!input.shippingAddress.trim()) throw new Error('Falta la dirección de envío')

  // Precio recalculado en el servidor a partir del catálogo — el unitPriceUsd que
  // llega del carrito (cliente) es solo un snapshot para mostrar en el checkout y
  // NO se usa para el monto real de la orden, así se evita que un total manipulado
  // en el cliente llegue a persistirse.
  const productIds = input.items.map((item) => item.productId)
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, price_usd')
    .in('id', productIds)

  if (productsError) throw new Error(productsError.message)

  const priceById = new Map((products ?? []).map((p) => [p.id as string, p]))

  const resolvedItems = input.items.map((item) => {
    const product = priceById.get(item.productId)
    if (!product) throw new Error(`Producto no encontrado: ${item.name}`)
    return {
      productId: item.productId,
      productName: product.name as string,
      quantity: item.quantity,
      unitPriceUsd: (product.price_usd as number | null) ?? 0,
    }
  })

  const totalUsd = resolvedItems.reduce((sum, item) => sum + item.unitPriceUsd * item.quantity, 0)

  // Snapshot de la tasa BCV al momento de la compra — igual que el precio, se
  // congela acá y no se vuelve a tocar (aunque el pago se confirme días después).
  const bcvRate = await getBcvRate()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: user.id,
      shipping_address: input.shippingAddress.trim(),
      notes: input.notes?.trim() || null,
      preferred_carrier: input.preferredCarrier,
      total_usd: totalUsd,
      bcv_rate_usd: bcvRate?.rate ?? null,
    })
    .select('id')
    .single()

  if (orderError) throw new Error(orderError.message)

  const { error: itemsError } = await supabase.from('order_items').insert(
    resolvedItems.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      unit_price_usd: item.unitPriceUsd,
    }))
  )

  if (itemsError) throw new Error(itemsError.message)

  const reference = (order.id as string).slice(0, 8).toUpperCase()

  // Regla provisional de monitoreo — aviso por correo al owner en cada checkout,
  // por si no ha entrado al admin. Corre después de responder (after()) para no
  // sumar la latencia de Resend a la request, y sin riesgo de que el runtime
  // serverless corte una promesa "fire-and-forget" sin awaitear.
  after(() =>
    notifyNewOrder({
      reference,
      customerEmail: user.email ?? null,
      shippingAddress: input.shippingAddress.trim(),
      preferredCarrier: input.preferredCarrier,
      totalUsd,
      items: resolvedItems.map((item) => ({
        name: item.productName,
        quantity: item.quantity,
        unitPriceUsd: item.unitPriceUsd,
      })),
    })
  )

  return { orderId: order.id as string, reference }
}
