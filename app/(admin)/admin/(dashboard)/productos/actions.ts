'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const PRODUCT_IMAGES_BUCKET = 'products'

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

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    price_usd: number
    price_ml_usd: number
    cost_usd: number
    stock_total: number
    stock_minimum: number
    notes: string | null
    description: string | null
    is_active: boolean
    featured: boolean
    new_arrival: boolean
    supplier_code: string | null
  }
) {
  await requireAdminUser()

  const { error } = await adminClient
    .from('products')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/productos')
  revalidatePath('/admin/inventario')
  revalidatePath('/productos')
  revalidatePath('/')
}

export async function createProduct(data: {
  name: string
  subcategory_id: string
  price_usd: number
  price_ml_usd: number
  cost_usd: number
  stock_total: number
  stock_minimum: number
  notes: string | null
  description: string | null
  is_active: boolean
  featured: boolean
  new_arrival: boolean
  supplier_code: string | null
}) {
  await requireAdminUser()

  const slug = slugify(data.name)

  const { data: inserted, error } = await adminClient
    .from('products')
    .insert({
      name: data.name,
      slug,
      subcategory_id: data.subcategory_id,
      price_usd: data.price_usd,
      price_ml_usd: data.price_ml_usd,
      cost_usd: data.cost_usd,
      stock_total: data.stock_total,
      stock_minimum: data.stock_minimum,
      notes: data.notes,
      description: data.description,
      is_active: data.is_active,
      featured: data.featured,
      new_arrival: data.new_arrival,
      supplier_code: data.supplier_code,
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/admin/productos')
  revalidatePath('/productos')
  revalidatePath('/')

  return inserted.id as string
}

export async function uploadProductImages(productId: string, formData: FormData) {
  await requireAdminUser()

  const files = formData.getAll('images').filter((f): f is File => f instanceof File && f.size > 0)
  if (files.length === 0) return

  const { count } = await adminClient
    .from('product_images')
    .select('id', { count: 'exact', head: true })
    .eq('product_id', productId)

  let nextSortOrder = count ?? 0

  for (const file of files) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const objectPath = `${randomUUID()}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await adminClient.storage
      .from(PRODUCT_IMAGES_BUCKET)
      // Long cacheControl is safe: objectPath is a fresh UUID per upload, never reused.
      .upload(objectPath, buffer, { contentType: file.type || undefined, cacheControl: '31536000' })
    if (uploadError) throw new Error(uploadError.message)

    const { error: insertError } = await adminClient.from('product_images').insert({
      product_id: productId,
      storage_path: `${PRODUCT_IMAGES_BUCKET}/${objectPath}`,
      sort_order: nextSortOrder,
      is_primary: nextSortOrder === 0,
    })
    if (insertError) throw new Error(insertError.message)

    nextSortOrder++
  }

  revalidatePath('/admin/productos')
  revalidatePath('/productos')
  revalidatePath('/')
}

export async function deleteProductImage(imageId: string) {
  await requireAdminUser()

  const { data: image, error: fetchError } = await adminClient
    .from('product_images')
    .select('product_id, storage_path, is_primary')
    .eq('id', imageId)
    .single()
  if (fetchError) throw new Error(fetchError.message)

  const objectPath = image.storage_path.replace(`${PRODUCT_IMAGES_BUCKET}/`, '')
  const { error: removeError } = await adminClient.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .remove([objectPath])
  if (removeError) throw new Error(removeError.message)

  const { error: deleteError } = await adminClient.from('product_images').delete().eq('id', imageId)
  if (deleteError) throw new Error(deleteError.message)

  if (image.is_primary) {
    const { data: next } = await adminClient
      .from('product_images')
      .select('id')
      .eq('product_id', image.product_id)
      .order('sort_order', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (next) {
      await adminClient.from('product_images').update({ is_primary: true }).eq('id', next.id)
    }
  }

  revalidatePath('/admin/productos')
  revalidatePath('/productos')
  revalidatePath('/')
}
