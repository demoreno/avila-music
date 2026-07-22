'use server'

import { revalidatePath } from 'next/cache'
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
    cost_usd: number
    stock_total: number
    stock_minimum: number
    notes: string | null
    is_active: boolean
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
}

export async function createProduct(data: {
  name: string
  subcategory_id: string
  price_usd: number
  cost_usd: number
  stock_total: number
  stock_minimum: number
  notes: string | null
  is_active: boolean
}) {
  await requireAdminUser()

  const slug = slugify(data.name)

  const { error } = await adminClient.from('products').insert({
    name: data.name,
    slug,
    subcategory_id: data.subcategory_id,
    price_usd: data.price_usd,
    cost_usd: data.cost_usd,
    stock_total: data.stock_total,
    stock_minimum: data.stock_minimum,
    notes: data.notes,
    is_active: data.is_active,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/admin/productos')
  revalidatePath('/productos')
}
