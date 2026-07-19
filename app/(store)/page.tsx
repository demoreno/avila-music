import Link from 'next/link'
import Image from 'next/image'
import { catalog } from '@/lib/catalog'
import ProductCard from '@/components/store/ProductCard'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export default async function HomePage() {
  const featuredProducts = await catalog.getFeaturedProducts(8)

  return (
    <>
       {/* Hero Section — Recording Studio Aesthetic */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#150e08]">
        {/* Noise Texture */}
        <div className="noise-overlay absolute inset-0 z-10 pointer-events-none" />

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/vecteezy_a-guitar-sits-in-front-of-a-drum-kit_72914186.jpeg"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.6] scale-105"
            sizes="100vw"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#150e08_95%)]" />
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
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-lg mb-10 animate-fade-in-up stagger-1">
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-black/30 backdrop-blur-md border border-white/25 text-white font-semibold rounded-xl hover:border-white/50 hover:bg-black/40 transition-all duration-300"
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
                  <div
                    key={badge.label}
                    className="flex items-center gap-3 rounded-xl bg-black/35 backdrop-blur-md border border-white/10 px-3 py-2.5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 flex-shrink-0">
                      <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {badge.svg}
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white whitespace-nowrap">{badge.label}</div>
                      <div className="text-[10px] text-white/60 whitespace-nowrap">{badge.sub}</div>
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
                color: 'from-[#2d6a8f] to-[#1e4d6b]',
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
                color: 'from-[#0f7a5f] to-[#0b5c48]',
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
