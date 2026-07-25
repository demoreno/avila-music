import type { SupabaseClient } from '@supabase/supabase-js'
import { getPublicImageUrl } from '@/lib/catalog/image-url'
import type { PickerProduct } from '@/components/admin/ProductPickerModal'

/** Shared by /blog/nuevo and /blog/[id]/editar — product list for the related-products picker. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- avoids importing the generated Database type just for this helper
export async function getPickerProducts(supabase: SupabaseClient<any>): Promise<PickerProduct[]> {
  const [{ data: products }, { data: categoryTree }, { data: images }] = await Promise.all([
    supabase.from('products').select('id, name, subcategory_id').eq('is_active', true).order('name'),
    supabase.from('v_category_tree').select('subcategory_id, subcategory_name'),
    supabase.from('product_images').select('product_id, storage_path').eq('is_primary', true),
  ])

  const categoryBySubcategory = new Map(
    (categoryTree ?? []).map((c: { subcategory_id: string; subcategory_name: string }) => [c.subcategory_id, c.subcategory_name])
  )
  const imageByProduct = new Map(
    (images ?? []).map((img: { product_id: string; storage_path: string }) => [img.product_id, getPublicImageUrl(img.storage_path)])
  )

  return (products ?? []).map((p: { id: string; name: string; subcategory_id: string }) => ({
    id: p.id,
    name: p.name,
    subcategory_name: categoryBySubcategory.get(p.subcategory_id) ?? '',
    imageUrl: imageByProduct.get(p.id) ?? null,
  }))
}
