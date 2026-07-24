'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { requireAdminUser } from '@/lib/require-admin'
import { slugify } from '@/lib/slugify'
import { getPublicImageUrl } from '@/lib/catalog/image-url'

const BLOG_IMAGES_BUCKET = 'blog'

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// adminClient uses the service-role key, which bypasses RLS entirely — every
// action in this file MUST call requireAdminUser() before touching adminClient.

export async function uploadBlogCoverImage(formData: FormData): Promise<string> {
  await requireAdminUser()

  const file = formData.get('image')
  if (!(file instanceof File) || file.size === 0) throw new Error('Selecciona una imagen')

  const ext = file.name.split('.').pop() ?? 'jpg'
  const objectPath = `${randomUUID()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await adminClient.storage
    .from(BLOG_IMAGES_BUCKET)
    // Long cacheControl is safe: objectPath is a fresh UUID per upload, never reused.
    .upload(objectPath, buffer, { contentType: file.type || undefined, cacheControl: '31536000' })
  if (error) throw new Error(error.message)

  return getPublicImageUrl(`${BLOG_IMAGES_BUCKET}/${objectPath}`)
}

interface BlogPostInput {
  title: string
  excerpt: string
  content: string
  cover_image_url: string | null
  meta_description: string | null
  is_published: boolean
  related_product_ids: string[]
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  if (slug) revalidatePath(`/blog/${slug}`)
}

export async function createBlogPost(data: BlogPostInput): Promise<string> {
  await requireAdminUser()

  const slug = slugify(data.title)

  const { data: inserted, error } = await adminClient
    .from('blog_posts')
    .insert({
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      cover_image_url: data.cover_image_url,
      meta_description: data.meta_description,
      is_published: data.is_published,
      published_at: data.is_published ? new Date().toISOString() : null,
      related_product_ids: data.related_product_ids,
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  revalidateBlogPaths(slug)
  return inserted.id as string
}

export async function updateBlogPost(id: string, data: BlogPostInput) {
  await requireAdminUser()

  const { data: existing, error: fetchError } = await adminClient
    .from('blog_posts')
    .select('slug, is_published, published_at')
    .eq('id', id)
    .single()
  if (fetchError) throw new Error(fetchError.message)

  // Slug is set once at creation and never changes — otherwise old shared/indexed links break.
  const { error } = await adminClient
    .from('blog_posts')
    .update({
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      cover_image_url: data.cover_image_url,
      meta_description: data.meta_description,
      is_published: data.is_published,
      published_at: data.is_published ? existing.published_at ?? new Date().toISOString() : existing.published_at,
      related_product_ids: data.related_product_ids,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidateBlogPaths(existing.slug)
}

export async function deleteBlogPost(id: string) {
  await requireAdminUser()

  const { data: existing, error: fetchError } = await adminClient
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .single()
  if (fetchError) throw new Error(fetchError.message)

  const { error } = await adminClient.from('blog_posts').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidateBlogPaths(existing.slug)
}
