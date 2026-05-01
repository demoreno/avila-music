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
      {/* Hero Section con imagen de fondo */}
      <section className="relative flex min-h-[700px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photo-1511379938547-c1f69419868d.webp"
            alt="Ávila Music - Instrumentos musicales"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-ink/20 to-ink/60" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="animate-fade-in-up">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Desde 2026
              </span>
              <span className="h-px w-8 bg-gold" />
            </div>
            
            <h1 className="heading-serif text-5xl font-bold text-cream sm:text-6xl lg:text-7xl">
              El sonido que<br />
              <span className="text-gold">te define</span>
            </h1>
            
            <p className="mt-6 text-lg text-sand/80 sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Instrumentos y accesorios seleccionados para músicos que exigen calidad. 
              Desde guitarras hasta equipos electrónicos, todo para tu arte.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/productos"
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-base font-semibold text-ink transition-all hover:bg-glow hover:shadow-[0_0_40px_rgba(200,146,46,0.4)]"
              >
                Explorar catálogo
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/productos?view=categorias"
                className="inline-flex items-center gap-3 rounded-full border border-edge bg-panel/50 px-8 py-4 text-base font-semibold text-cream backdrop-blur-sm transition-all hover:border-gold/50 hover:bg-panel/70"
              >
                Ver categorías
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-sand/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categorías - Grid asimétrico */}
      <section className="relative py-24 bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="heading-serif text-4xl font-bold text-cream sm:text-5xl">
              Categorías
            </h2>
            <p className="mt-4 text-sand/70 max-w-xl mx-auto">
              Encuentra exactamente lo que necesitas para llevar tu música al siguiente nivel
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, index) => (
              <Link
                key={cat.category_id}
                href={`/productos?categoria=${cat.category_slug}`}
                className="group relative flex flex-col items-center gap-4 rounded-2xl border border-edge bg-panel/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-panel/60 hover:shadow-[0_20px_40px_-15px_rgba(200,146,46,0.15)] overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gold/0 via-gold/0 to-gold/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-raised to-panel ring-1 ring-edge group-hover:ring-gold/30 transition-all">
                  <span className="text-4xl filter drop-shadow-lg">{getCategoryEmoji(cat.category_slug)}</span>
                </div>
                <div className="relative z-10 text-center">
                  <span className="block text-sm font-semibold text-cream group-hover:text-gold transition-colors">
                    {cat.category_name}
                  </span>
                  {cat.product_count > 0 && (
                    <span className="mt-1 block text-xs text-sand/50">
                      {cat.product_count} {cat.product_count === 1 ? 'producto' : 'productos'}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner promocional */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('/photo-1511379938547-c1f69419868d.webp')] bg-cover bg-center opacity-10" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Calidad garantizada
              </span>
              <h2 className="heading-serif mt-4 text-4xl font-bold text-cream sm:text-5xl">
                Productos seleccionados<br />para músicos exigentes
              </h2>
              <p className="mt-6 text-sand/70 text-lg leading-relaxed">
                Cada producto en nuestro catálogo ha sido cuidadosamente seleccionado pensando en la calidad y durabilidad que tu música merece.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                    <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream">Envíos nacionales</h3>
                    <p className="text-sm text-sand/60">A todo el país</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                    <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream">Garantía incluida</h3>
                    <p className="text-sm text-sand/60">Productos originales</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-full bg-gradient-to-br from-gold/20 to-transparent p-1">
                <div className="aspect-square rounded-full bg-ink flex items-center justify-center">
                  <span className="text-9xl">🎸</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 h-32 w-32 bg-gold/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-gold/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-24 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Los más vendidos
              </span>
              <h2 className="heading-serif mt-4 text-4xl font-bold text-cream sm:text-5xl">
                Productos destacados
              </h2>
            </div>
            <Link
              href="/productos"
              className="group hidden sm:flex items-center gap-2 text-sm font-semibold text-gold hover:text-glow transition-colors"
            >
              Ver todos
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {featuredProducts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🎵</span>
              <p className="text-sand/60 text-lg">Próximamente nuevos productos</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="mt-12 text-center sm:hidden">
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-6 py-3 text-sm font-semibold text-cream transition-all hover:border-gold/50 hover:bg-gold hover:text-ink"
                >
                  Ver todos los productos
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* WhatsApp CTA - Premium */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-green-950/10 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-800/50 bg-green-900/20 px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-green-400">
              Atención personalizada
            </span>
          </div>
          
          <h2 className="heading-serif text-4xl font-bold text-cream sm:text-5xl">
            ¿Tienes dudas? <span className="text-green-400">Hablemos</span>
          </h2>
          
          <p className="mt-6 text-lg text-sand/70 max-w-xl mx-auto leading-relaxed">
            Nuestro equipo de expertos te asesora para encontrar exactamente lo que necesitas. 
            Respondemos rápido y con pasión por la música.
          </p>
          
          <a
            href="https://wa.me/584138288674"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-green-600 px-10 py-5 text-lg font-semibold text-white shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] transition-all hover:bg-green-500 hover:shadow-[0_0_60px_-10px_rgba(22,163,74,0.7)] hover:scale-105"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chatear por WhatsApp
          </a>
          
          <p className="mt-6 text-sm text-sand/50">
            Horario de atención: Lunes a Sábado, 9am - 6pm
          </p>
        </div>
      </section>
    </>
  )
}
