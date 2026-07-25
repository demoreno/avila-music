'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { requireAdminUser } from '@/lib/require-admin'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { OrderStatus, PaymentStatus } from '@/types/index'

const SHIPPING_PROOFS_BUCKET = 'shipping-proofs'

// Status transitions go through the DB functions (SECURITY DEFINER, admin-gated
// internally via is_admin()) — cancel_order() and update_order_status() enforce
// terminal-state locking and, for "completado", create the real accounting sale.
// Shipping carrier/tracking/proof are plain informational fields, updated directly
// via RLS (admin has a FOR ALL policy on orders and on the shipping-proofs bucket).

interface ShippingInfo {
  carrier: string
  trackingNumber: string
  proofPath?: string
}

export async function uploadShippingProof(orderId: string, formData: FormData): Promise<string> {
  await requireAdminUser()

  const file = formData.get('proof')
  if (!(file instanceof File) || file.size === 0) throw new Error('Selecciona una imagen')

  const supabase = await createSupabaseServerClient()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const objectPath = `${orderId}/${randomUUID()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabase.storage
    .from(SHIPPING_PROOFS_BUCKET)
    .upload(objectPath, buffer, { contentType: file.type || undefined })
  if (error) throw new Error(error.message)

  return objectPath
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, shippingInfo?: ShippingInfo) {
  await requireAdminUser()

  const supabase = await createSupabaseServerClient()

  if (shippingInfo) {
    const { error: shippingError } = await supabase
      .from('orders')
      .update({
        shipping_carrier: shippingInfo.carrier,
        tracking_number: shippingInfo.trackingNumber,
        ...(shippingInfo.proofPath ? { shipping_proof_path: shippingInfo.proofPath } : {}),
      })
      .eq('id', orderId)
    if (shippingError) throw new Error(shippingError.message)
  }

  const { error } = await supabase.rpc('update_order_status', { p_order_id: orderId, p_status: status })
  if (error) throw new Error(error.message)

  revalidatePath('/admin/ordenes')
  revalidatePath(`/admin/ordenes/${orderId}`)
  revalidatePath('/cuenta')
}

export async function reviewPayment(orderId: string, status: Extract<PaymentStatus, 'confirmado' | 'rechazado'>) {
  await requireAdminUser()

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('orders').update({ payment_status: status }).eq('id', orderId)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/ordenes')
  revalidatePath(`/admin/ordenes/${orderId}`)
  revalidatePath('/cuenta')
}

export async function adminCancelOrder(orderId: string, reason: string) {
  await requireAdminUser()

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.rpc('cancel_order', { p_order_id: orderId, p_reason: reason })
  if (error) throw new Error(error.message)

  revalidatePath('/admin/ordenes')
  revalidatePath(`/admin/ordenes/${orderId}`)
}
