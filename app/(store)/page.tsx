import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProductCard from '@/components/store/ProductCard'
import { getCategoryEmoji } from '@/components/store/CategoryIcon'
import type { CategoryTree, ProductRanking, Product, ProductImage } from '@/types/index'

async function getFeaturedProducts() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('v_product_ranking')
    .select('*')
    .order('total_units_sold', { ascending: false })
    .limit(8)
  return (data as ProductRanking[]) ?? []
}

async function getProductImages(productIds: string[]) {
  if (productIds.length === 0) return []
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('product_images')
    .select('*')
    .in('product_id', productIds)
  return (data as ProductImage[]) ?? []
}

async function getProducts(ids: string[]) {
  if (ids.length === 0) return []
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .in('id', ids)
    .eq('is_active', true)
  return (data as Product[]) ?? []
}

async function getRootCategories() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('v_category_tree')
    .select('*')
    .order('category_sort_order')
  if (!data) return []
  const seen = new Set<string>()
  return (data as CategoryTree[]).filter((row) => {
    if (seen.has(row.category_id)) return false
    seen.add(row.category_id)
    return true
  })
}

export default async function HomePage() {
  const [rankings, categories] = await Promise.all([
    getFeaturedProducts(),
    getRootCategories(),
  ])

  const productIds = rankings.map((r) => r.id)
  const [products, images] = await Promise.all([
    getProducts(productIds),
    getProductImages(productIds),
  ])

  const imagesByProduct = images.reduce<Record<string, ProductImage[]>>((acc, img) => {
    if (!acc[img.product_id]) acc[img.product_id] = []
    acc[img.product_id].push(img)
    return acc
  }, {})

  const rankingMap = rankings.reduce<Record<string, ProductRanking>>((acc, r) => {
    acc[r.id] = r
    return acc
  }, {})

  const featuredProducts = products.map((p) => ({
    ...p,
    images: imagesByProduct[p.id] ?? [],
    subcategory_name: rankingMap[p.id]?.subcategory_name,
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 opacity-90" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h1 className="heading-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Tu música,<br />
            <span className="text-amber-400">nuestra pasión</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Accesorios musicales de calidad para artistas y entusiastas
          </p>
          <Link
            href="/productos"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl"
          >
            Ver productos
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="heading-serif mb-8 text-center text-3xl font-bold text-slate-900">
            Categorías
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.category_id}
                href={`/productos?categoria=${cat.category_slug}`}
                className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
              >
                <span className="text-4xl">{getCategoryEmoji(cat.category_slug)}</span>
                <span className="text-sm font-semibold text-slate-700">{cat.category_name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="heading-serif text-3xl font-bold text-slate-900">
              Productos destacados
            </h2>
            <Link
              href="/productos"
              className="text-sm font-semibold text-amber-600 hover:text-amber-700"
            >
              Ver todos →
            </Link>
          </div>
          {featuredProducts.length === 0 ? (
            <p className="text-center text-slate-500">No hay productos disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp banner */}
      <section className="bg-green-600 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="heading-serif text-2xl font-bold text-white sm:text-3xl">
            ¿Tienes dudas? Escríbenos por WhatsApp
          </p>
          <p className="mt-2 text-green-100">
            Respondemos rápido. Hacemos envíos a todo el país.
          </p>
          <a
            href="https://wa.me/584138288674"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-green-700 shadow-lg transition-all hover:bg-green-50"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chatear ahora
          </a>
        </div>
      </section>
    </>
  )
}
