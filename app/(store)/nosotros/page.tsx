import Link from 'next/link'
import Image from 'next/image'

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[300px] flex items-center bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Nuestra historia
          </span>
          <h1 className="heading-serif text-4xl sm:text-5xl font-bold text-text">
            Más que música,<br />
            <span className="text-primary">somos pasión</span>
          </h1>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Desde 2020
              </span>
              <h2 className="heading-serif text-3xl sm:text-4xl font-bold text-text mb-6">
                Nacimos músicos,<br />crecimos sirviendo
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                Ávila Music nació en 2020 con una misión clara: ofrecer a los músicos venezolanos 
                instrumentos y accesorios de calidad, con un servicio que entienda sus necesidades reales.
              </p>
              <p className="text-text-muted text-lg leading-relaxed">
                Lo que comenzó como un sueño entre amigos, hoy es una tienda de referencia para 
                guitarristas, bajistas, bateristas y músicos de cuerdas en todo el país. Cada producto 
                que ofrecemos ha sido seleccionado con el mismo criterio con el que elegiríamos para 
                nosotros mismos.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/photo-1511379938547-c1f69419868d.webp"
                  alt="Música y pasión"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl font-bold text-text mb-3">Nuestros valores</h2>
            <p className="text-text-muted">Lo que nos define</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Calidad primero',
                description: 'Cada producto pasa por nuestro filtro de calidad. Solo ofrecemos lo que usaríamos nosotros.',
              },
              {
                icon: '🤝',
                title: 'Servicio cercano',
                description: 'Atención personalizada por WhatsApp. Hablas con personas que entienden de música.',
              },
              {
                icon: '🚚',
                title: 'Envíos confiables',
                description: 'Despachos a todo el país con MRW y Zoom. Tu instrumento llega seguro.',
              },
              {
                icon: '💯',
                title: 'Transparencia',
                description: 'Precios claros, sin sorpresas. Lo que ves es lo que pagas.',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{value.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl font-bold text-text mb-3">Hitos importantes</h2>
            <p className="text-text-muted">Nuestro camino</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30" />

            <div className="space-y-10">
              {[
                {
                  year: '2020',
                  title: 'El comienzo',
                  description: 'Iniciamos operaciones desde casa, con un pequeño inventario de cuerdas y accesorios básicos.',
                },
                {
                  year: '2022',
                  title: 'Crecimiento',
                  description: 'Ampliamos nuestro catálogo con guitarras, bajos y equipos electrónicos. Primeros envíos nacionales.',
                },
                {
                  year: '2024',
                  title: 'Expansión',
                  description: 'Alianzas con proveedores internacionales. Llegamos a músicos en todo el territorio venezolano.',
                },
                {
                  year: '2026',
                  title: 'Innovación',
                  description: 'Nueva plataforma online. Seguimos creciendo, siempre cerca de la comunidad musical.',
                },
              ].map((milestone, index) => (
                <div key={milestone.year} className="relative flex gap-6">
                  <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary ring-4 ring-white shadow-md">
                    <span className="text-sm font-bold text-white">{milestone.year}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-text">{milestone.title}</h3>
                    <p className="mt-2 text-text-muted leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calidad-Precio */}
      <section className="py-16 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-primary/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-6xl mb-4 block">⚖️</span>
                    <p className="text-2xl heading-serif font-bold text-primary">Calidad + Precio Justo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Nuestro compromiso
              </span>
              <h2 className="heading-serif text-3xl font-bold text-text mb-6">
                La mejor relación calidad-precio
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                Creemos que cada músico merece acceder a productos de calidad sin pagar de más. 
                Por eso trabajamos directamente con fabricantes reconocidos, eliminando intermediarios 
                innecesarios.
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                Nuestro equipo prueba y selecciona cada producto considerando tres factores: 
                durabilidad, sonido y precio. Solo lo que aprueba nuestros estándares llega a tu manos.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-text font-semibold">Productos verificados</h3>
                    <p className="text-sm text-text-muted">Probados por músicos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-text font-semibold">Precios competitivos</h3>
                    <p className="text-sm text-text-muted">Sin intermediarios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Marcas que distribuimos
            </span>
            <h2 className="heading-serif text-3xl font-bold text-text mb-3">Calidad que respalda tu música</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Trabajamos con las marcas más reconocidas del mercado, aquellas que los músicos 
              profesionales confían para su sonido.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Ernie Ball', file: 'ernie-ball.svg', bg: 'bg-ink' },
              { name: "D'Addario", file: 'daddario.svg', bg: 'bg-white' },
              { name: 'Alice', file: 'alice.svg', bg: 'bg-white' },
              { name: 'Smiger', file: 'smiger.svg', bg: 'bg-ink' },
              { name: 'Wilkinson', file: 'wilkinson.svg', bg: 'bg-white' },
            ].map((brand) => (
              <div
                key={brand.name}
                className={`group flex items-center justify-center rounded-xl border border-border ${brand.bg} p-6 transition-all hover:border-primary/30 hover:shadow-md`}
              >
                <div className="relative h-10 w-full flex items-center justify-center">
                  <Image
                    src={`/marcas/${brand.file}`}
                    alt={brand.name}
                    fill
                    className="object-contain opacity-70 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-text-muted text-sm">
            Y muchas más marcas de calidad disponibles en nuestro catálogo
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-3xl sm:text-4xl font-bold text-text mb-4">
            ¿Listo para encontrar tu sonido ideal?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Explora nuestro catálogo o escríbenos. Estamos aquí para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Ver productos
            </Link>
            <a
              href="https://wa.me/584138288674"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-success text-success hover:bg-success hover:text-white px-8 py-3.5 rounded-lg font-semibold transition-all"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar con un asesor
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
