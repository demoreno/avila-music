import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProductCard from '@/components/store/ProductCard'
import type { ProductRanking, Product, ProductImage } from '@/types/index'

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

export default async function HomePage() {
  const rankings = await getFeaturedProducts()

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
       {/* Hero Section — Recording Studio Aesthetic */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f14]">
        {/* Noise Texture */}
        <div className="noise-overlay absolute inset-0 z-10 pointer-events-none" />

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/photo-1511379938547-c1f69419868d.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.15] scale-105"
            sizes="100vw"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0f14_85%)]" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

        {/* Audio Waveform — Top */}
        <div className="absolute top-12 left-0 right-0 flex justify-center gap-[3px] h-16 overflow-hidden opacity-40">
          {Array.from({ length: 120 }).map((_, i) => (
            <span
              key={i}
              className="waveform-bar"
              style={{
                '--duration': `${0.6 + Math.random() * 1.8}s`,
                '--delay': `${Math.random() * 1}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 w-full pb-16">
          <div className="max-w-3xl">
            {/* Headline */}
            <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-8 animate-fade-in-up text-white">
              Tu música,<br />
              <span className="italic font-light gradient-text-gold" style={{ letterSpacing: '0.04em' }}>
                nuestra pasión
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/35 leading-relaxed max-w-lg mb-10 animate-fade-in-up stagger-1">
              Accesorios musicales seleccionados para artistas que exigen lo mejor. 
              Envíos a todo el país con garantía incluida.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-2">
              <Link
                href="/productos"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 group"
              >
                Ver productos
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white/70 font-semibold rounded-xl hover:border-white/30 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
              >
                Conócenos
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 pt-8 border-t border-white/[0.04] animate-fade-in-up stagger-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  {
                    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />,
                    label: 'Envíos nacionales',
                    sub: 'A todo el país',
                  },
                  {
                    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                    label: 'Garantía',
                    sub: '100% originales',
                  },
                  {
                    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
                    label: 'Atención rápida',
                    sub: 'Por WhatsApp',
                  },
                  {
                    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />,
                    label: 'Pago seguro',
                    sub: 'Múltiples métodos',
                  },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.04] flex-shrink-0">
                      <svg className="h-4 w-4 text-amber-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {badge.svg}
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white/70">{badge.label}</div>
                      <div className="text-[10px] text-white/25">{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audio Waveform — Bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-[2px] h-20 overflow-hidden opacity-50">
          {Array.from({ length: 160 }).map((_, i) => {
            const isGlow = i % 7 === 0 || i % 11 === 0
            return (
              <span
                key={i}
                className={`waveform-bar ${isGlow ? 'glow' : ''}`}
                style={{
                  '--duration': `${0.5 + Math.random() * 2}s`,
                  '--delay': `${Math.random() * 1.2}s`,
                } as React.CSSProperties}
              />
            )
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="h-5 w-5 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-white to-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="badge badge-hot mb-4">Más vendidos</span>
              <h2 className="heading-serif text-4xl sm:text-5xl font-bold gradient-text mb-2">
                Productos destacados
              </h2>
              <p className="text-lg text-text-muted">Los favoritos de nuestros clientes</p>
            </div>
            <Link
              href="/productos"
              className="group flex items-center gap-2 text-[#1e4d6b] font-semibold hover:text-[#0f7a5f] transition-colors"
            >
              Ver todos
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          
          {featuredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-card">
              <span className="text-6xl mb-4 block">🎵</span>
              <p className="text-text-muted text-lg">Próximamente nuevos productos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/productos"
              className="btn-primary"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-[#1e4d6b] via-[#0f7a5f] to-[#1e4d6b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f59e0b] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="badge bg-white/10 text-white border-white/20 mb-4">¿Por qué Ávila Music?</span>
            <h2 className="heading-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Calidad que se escucha
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Cada producto está seleccionado pensando en la calidad y durabilidad que tu música merece
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                ),
                title: 'Envíos nacionales',
                desc: 'A todo el país de forma segura',
                color: 'from-[#10b981] to-[#059669]',
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Garantía incluida',
                desc: 'Productos 100% originales',
                color: 'from-[#3b82f6] to-[#2563eb]',
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: 'Atención rápida',
                desc: 'Respuesta por WhatsApp',
                color: 'from-[#f59e0b] to-[#d97706]',
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Pago seguro',
                desc: 'Múltiples métodos',
                color: 'from-[#8b5cf6] to-[#7c3aed]',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.desc}</p>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#10b981]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-[#f59e0b]/10 to-transparent rounded-full blur-3xl" />
        
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 mb-8 animate-pulse-glow">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-success">
              Atención en tiempo real
            </span>
          </div>
          
          <h2 className="heading-serif text-4xl sm:text-5xl font-bold gradient-text mb-6">
            ¿Tienes dudas? Escríbenos
          </h2>
          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto">
            Respondemos rápido. Te asesoramos para encontrar exactamente lo que necesitas.
          </p>
          
          <a
            href="https://wa.me/584138288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#10b981] text-white px-10 py-5 rounded-full font-semibold text-lg shadow-xl shadow-success/30 hover:shadow-2xl hover:shadow-success/40 hover:scale-105 transition-all duration-300 btn-glow"
          >
            <WhatsAppIcon className="h-6 w-6" />
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.886 14.553c-.17-.085-1.009-.499-1.165-.556-.156-.057-.27-.085-.4.114-.127.199-.497.626-.61.754-.114.128-.228.142-.398.057-.17-.085-.723-.298-1.374-.878-.508-.453-.851-1.019-.95-1.19-.099-.17-.01-.262.085-.355.077-.076.17-.199.255-.298.085-.1.128-.17.185-.284.057-.113.028-.213-.014-.298-.043-.085-.383-.922-.525-1.262-.138-.332-.28-.287-.383-.293-.099-.005-.213-.005-.327-.005-.113 0-.298.043-.454.213-.156.17-.596.582-.596 1.423 0 .841.611 1.654.696 1.768.085.114 1.202 1.838 2.913 2.575.408.176.728.282.976.361.41.13.782.111 1.076.067.327-.049 1.009-.412 1.151-.813.142-.4.142-.74.085-.84-.057-.1-.213-.156-.454-.276m-3.103 4.253h-.003a5.675 5.675 0 01-2.888-.793l-.207-.122-2.149.564.572-2.1a5.654 5.654 0 01-.867-3.018c.001-3.127 2.549-5.674 5.678-5.674 1.514 0 2.937.59 4.007 1.662a5.633 5.633 0 011.653 4.011c-.002 3.127-2.551 5.674-5.679 5.674m4.84-10.513a6.788 6.788 0 00-4.796-1.988c-3.763 0-6.823 3.06-6.825 6.825 0 1.202.314 2.375.912 3.413L.635 20.5l4.568-1.198a6.817 6.817 0 003.268.832h.003c3.76 0 6.82-3.06 6.823-6.825a6.793 6.793 0 00-2.003-4.824" />
    </svg>
  )
}
