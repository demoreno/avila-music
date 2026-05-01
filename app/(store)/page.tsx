import Link from 'next/link'
import Image from 'next/image'
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
      {/* Hero Section - Full Width Editorial Banner */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden transition-page">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/photo-1511379938547-c1f69419868d.webp"
            alt="Ávila Music - Instrumentos musicales"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Capa 1: Gradiente horizontal sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e4d6b]/25 via-[#1e4d6b]/15 to-transparent" />
          {/* Capa 2: Gradiente vertical solo abajo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e4d6b]/60 via-transparent to-70%" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest rounded-sm mb-8 border border-white/20">
              Desde 2020
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-8">
              Tu música,<br />
              <span className="font-light italic text-[#4da8da]">nuestra pasión</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl mb-10">
              Accesorios musicales de calidad para artistas y entusiastas
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 bg-white text-[#1e4d6b] px-8 py-4 rounded-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:bg-white/95 group"
              >
                Ver productos
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/productos?view=categorias"
                className="inline-flex items-center gap-2 border border-white/50 backdrop-blur-sm text-white hover:bg-white hover:text-[#1e4d6b] px-8 py-4 rounded-sm font-semibold transition-all"
              >
                Ver categorías
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías - Editorial Grid */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl sm:text-5xl font-bold text-[#1e4d6b] mb-4">Categorías</h2>
            <p className="text-lg text-text-muted max-w-md mx-auto">Encuentra exactamente lo que necesitas</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((cat, index) => (
              <Link
                key={cat.category_id}
                href={`/productos?categoria=${cat.category_slug}`}
                className="group relative flex flex-col items-center gap-4 rounded-xl bg-[#e8f1f5] p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#1e4d6b]/10 hover:-translate-y-1"
              >
                <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{getCategoryEmoji(cat.category_slug)}</span>
                <div className="text-center">
                  <span className="heading-serif text-lg font-bold text-[#1e4d6b] block mb-1">{cat.category_name}</span>
                  {cat.product_count > 0 && (
                    <span className="text-xs text-text-muted uppercase tracking-wider">{cat.product_count} productos</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="heading-serif text-4xl sm:text-5xl font-bold text-[#1e4d6b] mb-3">Productos destacados</h2>
              <p className="text-lg text-text-muted">Los más vendidos por nuestros clientes</p>
            </div>
            <Link
              href="/productos"
              className="hidden sm:flex items-center gap-2 text-[#1e4d6b] font-semibold hover:text-[#4da8da] transition-colors group"
            >
              Ver todos
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {featuredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <span className="text-5xl mb-4 block">🎵</span>
              <p className="text-text-muted">Próximamente nuevos productos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-[#1e4d6b] hover:bg-[#153a52] text-white px-6 py-3 rounded-sm font-semibold transition-all"
            >
              Ver todos los productos
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Promocional - Editorial Style */}
      <section className="py-24 bg-[#1e4d6b] relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4da8da] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest rounded-sm mb-6">
                Calidad garantizada
              </span>
              <h2 className="heading-serif text-4xl sm:text-5xl font-bold text-white mb-6">
                Productos seleccionados para músicos exigentes
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                Cada producto en nuestro catálogo ha sido cuidadosamente seleccionado pensando en 
                la calidad y durabilidad que tu música merece.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Envíos nacionales</h3>
                    <p className="text-sm text-white/60">A todo el país</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Garantía incluida</h3>
                    <p className="text-sm text-white/60">Productos originales</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Respuesta rápida</h3>
                    <p className="text-sm text-white/60">Atención por WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Pago seguro</h3>
                    <p className="text-sm text-white/60">Múltiples métodos</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                  <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <svg className="h-20 w-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div className="aspect-video rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <svg className="h-16 w-16 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 10l12-3" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="aspect-video rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <svg className="h-16 w-16 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 16v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                  </div>
                  <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <svg className="h-20 w-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f1f5] px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-success">
              Atención personalizada
            </span>
          </div>
          
          <h2 className="heading-serif text-4xl sm:text-5xl font-bold text-[#1e4d6b] mb-6">
            ¿Tienes dudas? Escríbenos por WhatsApp
          </h2>
          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto">
            Respondemos rápido. Te asesoramos para encontrar exactamente lo que necesitas.
          </p>
          <a
            href="https://wa.me/584138288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-success hover:bg-success/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chatear ahora
          </a>
          <p className="mt-6 text-sm text-text-muted">
            Horario: Lunes a Sábado, 9am - 6pm
          </p>
        </div>
      </section>
    </>
  )
}
