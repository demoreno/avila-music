'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

/**
 * adminClient uses the service-role key, which bypasses RLS entirely — every
 * action in this file MUST call this before touching adminClient, or it's an
 * unauthenticated write path straight to the database.
 */
async function requireAdminUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  return user
}

interface SavePurchaseOrderInput {
  orderId?: string
  notes: string | null
  estimatedArrivalDate: string | null
  items: { productId: string; quantity: number }[]
}

export async function savePurchaseOrder(input: SavePurchaseOrderInput): Promise<string> {
  await requireAdminUser()

  if (input.items.length === 0) throw new Error('El pedido debe tener al menos un producto')
  if (input.items.some((item) => item.quantity <= 0)) {
    throw new Error('Las cantidades deben ser mayores a cero')
  }

  let orderId = input.orderId

  if (orderId) {
    const { data: existing, error: fetchError } = await adminClient
      .from('purchase_orders')
      .select('status')
      .eq('id', orderId)
      .single()
    if (fetchError) throw new Error(fetchError.message)
    if (existing.status === 'recibido') {
      throw new Error('Este pedido ya fue recibido y no se puede modificar')
    }

    const { error: updateError } = await adminClient
      .from('purchase_orders')
      .update({
        notes: input.notes,
        estimated_arrival_date: input.estimatedArrivalDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
    if (updateError) throw new Error(updateError.message)

    const { error: deleteError } = await adminClient
      .from('purchase_order_items')
      .delete()
      .eq('purchase_order_id', orderId)
    if (deleteError) throw new Error(deleteError.message)
  } else {
    const { data: inserted, error: insertError } = await adminClient
      .from('purchase_orders')
      .insert({ notes: input.notes, estimated_arrival_date: input.estimatedArrivalDate })
      .select('id')
      .single()
    if (insertError) throw new Error(insertError.message)
    orderId = inserted.id as string
  }

  const { error: itemsError } = await adminClient.from('purchase_order_items').insert(
    input.items.map((item) => ({
      purchase_order_id: orderId,
      product_id: item.productId,
      quantity: item.quantity,
    }))
  )
  if (itemsError) throw new Error(itemsError.message)

  revalidatePath('/admin/pedidos')
  revalidatePath(`/admin/pedidos/${orderId}`)
  revalidatePath('/admin/inventario')

  return orderId
}

export async function updatePurchaseOrderStatus(orderId: string, status: string, estimatedArrivalDate?: string) {
  const user = await requireAdminUser()

  const { error } = await adminClient.rpc('update_purchase_order_status', {
    p_order_id: orderId,
    p_status: status,
    p_created_by: user.id,
  })
  if (error) throw new Error(error.message)

  if (estimatedArrivalDate) {
    const { error: dateError } = await adminClient
      .from('purchase_orders')
      .update({ estimated_arrival_date: estimatedArrivalDate })
      .eq('id', orderId)
    if (dateError) throw new Error(dateError.message)
  }

  revalidatePath('/admin/pedidos')
  revalidatePath(`/admin/pedidos/${orderId}`)
  revalidatePath('/admin/inventario')
  revalidatePath('/admin/productos')
}

export async function deletePurchaseOrder(orderId: string) {
  await requireAdminUser()

  const { error } = await adminClient.from('purchase_orders').delete().eq('id', orderId)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/pedidos')
  redirect('/admin/pedidos')
}
