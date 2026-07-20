import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Check, Target, Handshake, Truck, Percent, Scale } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé la historia de Ávila Music y por qué somos la tienda de confianza para músicos que buscan calidad en sus accesorios.',
  alternates: { canonical: '/nosotros' },
}

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
                Desde entonces evolucionamos de un catálogo pequeño a una estructura de retail digital
                formal, con procesos definidos de cotización, despacho y postventa.
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                Contamos con capacidad de distribución a nivel nacional a través de alianzas logísticas
                con MRW y Zoom, lo que nos permite llevar pedidos a cualquier ciudad de Venezuela con
                tiempos de entrega predecibles. Cada producto que comercializamos es 100% original,
                adquirido directamente con marcas y proveedores autorizados — sin intermediarios que
                comprometan la calidad o la garantía.
              </p>
              <p className="text-text-muted text-lg leading-relaxed">
                Hoy somos una tienda de referencia para guitarristas, bajistas, bateristas y músicos de
                cuerdas en todo el país, y una operación pensada para escalar: desde cotizaciones
                individuales hasta alianzas comerciales con nuevos proveedores y distribuidores.
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
                icon: Target,
                title: 'Calidad primero',
                description: 'Cada producto pasa por nuestro filtro de calidad. Solo ofrecemos lo que usaríamos nosotros.',
              },
              {
                icon: Handshake,
                title: 'Servicio cercano',
                description: 'Atención personalizada por WhatsApp. Hablas con personas que entienden de música.',
              },
              {
                icon: Truck,
                title: 'Envíos confiables',
                description: 'Despachos a todo el país con MRW y Zoom. Tu instrumento llega seguro.',
              },
              {
                icon: Percent,
                title: 'Transparencia',
                description: 'Precios claros, sin sorpresas. Lo que ves es lo que pagas.',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
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
                    <Scale className="h-16 w-16 mx-auto mb-4 text-primary" strokeWidth={1.5} />
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
<Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-text font-semibold">Productos verificados</h3>
                    <p className="text-sm text-text-muted">Probados por músicos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
<Check className="h-5 w-5 text-primary" />
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Ernie Ball', file: 'ernie-ball.webp', bg: 'bg-white' },
              { name: "D'Addario", file: 'daddario-logo.jpg', bg: 'bg-white' },
              { name: 'Alice', file: 'alice-logo.jpeg', bg: 'bg-white' },
              { name: 'Smiger', file: 'smiger.png', bg: 'bg-white' },
              { name: 'Wilkinson', file: 'wilkinson.png', bg: 'bg-white' },
              { name: 'Yamaha', file: 'Yamaha-Logo.png', bg: 'bg-white' },
            ].map((brand) => (
              <div
                key={brand.name}
                className={`group flex items-center justify-center rounded-xl border border-border ${brand.bg} p-4 transition-all hover:border-primary/30 hover:shadow-md`}
              >
                <div className="relative h-16 w-full flex items-center justify-center">
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
              href="https://wa.me/584128288674"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white px-8 py-3.5 rounded-lg font-semibold transition-all"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hablar con un asesor
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
