import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getPublicImageUrl } from '@/lib/catalog/image-url'
import FacturacionClient from './FacturacionClient'

export default async function FacturacionPage() {
  const supabase = await createSupabaseServerClient()

  const [{ data, error }, { data: imagesData }] = await Promise.all([
    supabase.from('products').select('id, name, price_usd, stock_total').order('name'),
    supabase.from('product_images').select('product_id, storage_path').eq('is_primary', true),
  ])

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
        Error al cargar los productos: {error.message}
      </div>
    )
  }

  const imageByProduct = (imagesData ?? []).reduce<Record<string, string>>((acc, img) => {
    acc[img.product_id] = getPublicImageUrl(img.storage_path)
    return acc
  }, {})

  const products = (data ?? []).map((p) => ({ ...p, imageUrl: imageByProduct[p.id] ?? null }))

  return (
    <div>
      <h1 className="heading-serif mb-2 text-2xl font-bold text-slate-900">Facturación</h1>
      <p className="mb-6 text-sm text-slate-500">
        Registrá ventas directas (fuera de MercadoLibre) — descuenta stock automáticamente.
      </p>
      <FacturacionClient products={products} />
    </div>
  )
}
