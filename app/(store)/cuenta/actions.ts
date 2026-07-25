'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { OrderPaymentMethod } from '@/types/index'

const PAYMENT_PROOFS_BUCKET = 'payment-proofs'

const ALLOWED_IMAGE_TYPES: Record<string, { ext: string; matches: (bytes: Uint8Array) => boolean }> = {
  jpeg: { ext: 'jpg', matches: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  png: {
    ext: 'png',
    matches: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  webp: {
    ext: 'webp',
    matches: (b) =>
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
}

/**
 * Sniffs the real file signature instead of trusting the client's filename or
 * declared MIME type — both are attacker-controlled and were previously used
 * as-is to name the stored object and its Content-Type.
 */
function detectImageType(bytes: Uint8Array): { ext: string; contentType: string } | null {
  for (const [type, { ext, matches }] of Object.entries(ALLOWED_IMAGE_TYPES)) {
    if (matches(bytes)) return { ext, contentType: `image/${type}` }
  }
  return null
}

/**
 * Goes through the cancel_order() DB function (SECURITY DEFINER, enforces
 * ownership + "only while pendiente/confirmado" + reason required) rather than
 * an UPDATE — there's no RLS UPDATE policy for customers on `orders` on purpose.
 */
export async function cancelMyOrder(orderId: string, reason: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  const { error } = await supabase.rpc('cancel_order', { p_order_id: orderId, p_reason: reason })
  if (error) throw new Error(error.message)

  revalidatePath('/cuenta')
}

/**
 * Uploads straight into the customer's own order folder — `payment-proofs` is a
 * private bucket, and its storage.objects RLS policy only allows this path
 * (`{order_id}/...`) when `orders.customer_id = auth.uid()`, so this doesn't need
 * a service-role client the way admin image uploads do.
 */
export async function uploadPaymentProof(orderId: string, formData: FormData): Promise<string> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  const file = formData.get('proof')
  if (!(file instanceof File) || file.size === 0) throw new Error('Selecciona una imagen del comprobante')

  const buffer = Buffer.from(await file.arrayBuffer())
  const detected = detectImageType(buffer)
  if (!detected) throw new Error('El comprobante debe ser una imagen JPG, PNG o WEBP')

  const objectPath = `${orderId}/${randomUUID()}.${detected.ext}`

  const { error } = await supabase.storage
    .from(PAYMENT_PROOFS_BUCKET)
    .upload(objectPath, buffer, { contentType: detected.contentType })
  if (error) throw new Error(error.message)

  return objectPath
}

interface SubmitPaymentInput {
  orderId: string
  method: OrderPaymentMethod
  reference: string
  date: string
  proofPath: string
}

export async function submitPaymentProof(input: SubmitPaymentInput) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  const { error } = await supabase.rpc('submit_payment_proof', {
    p_order_id: input.orderId,
    p_method: input.method,
    p_reference: input.reference,
    p_date: input.date,
    p_proof_path: input.proofPath,
  })
  if (error) throw new Error(error.message)

  revalidatePath('/cuenta')
}
