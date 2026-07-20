import Image from 'next/image'
import type { Metadata } from 'next'
import { Truck, Clock, Check, MapPin, Building2 } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Envíos',
  description: 'Conocé cómo hacemos los envíos de tus accesorios musicales a todo el país.',
  alternates: { canonical: '/envios' },
}

export default function EnviosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Logística nacional
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold text-text sm:text-6xl">
            Envíos y<br />
            <span className="gradient-text">entregas</span>
          </h1>
        </div>
      </section>

      {/* Info principal */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-bg-alt p-8 sm:p-12">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-green-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Tienda 100% online
              </span>
              <h2 className="heading-serif mt-6 text-3xl font-bold text-text">
                Sin tienda física,<br />con alcance nacional
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Operamos exclusivamente en línea para ofrecerte los mejores precios.
                Despachamos a cualquier ciudad de Venezuela.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 ring-1 ring-amber-300/50">
                    <Truck className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">Pago a destino</h3>
                </div>
                <p className="text-text-muted">
                  Pagás el envío al recibir tu paquete, en tu puerta. Sin adelantos ni sorpresas de último momento.
                </p>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 ring-1 ring-sky-300/50">
                    <Clock className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">Tiempo de entrega</h3>
                </div>
                <p className="text-text-muted">
                  24-48 horas a ciudades principales, 3-5 días a zonas remotas. Te pasamos el número de guía apenas despachamos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas de envío */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Aliados logísticos
            </span>
            <h2 className="heading-serif mt-4 text-4xl font-bold text-text">
              Empresas de confianza
            </h2>
            <p className="mt-4 text-text-muted max-w-2xl mx-auto">
              Trabajamos con las principales empresas de mensajería de Venezuela
              para garantizar que tu instrumento llegue seguro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* MRW */}
            <div className="group rounded-2xl border border-red-200 bg-red-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm p-2">
                  <Image src="/logos/mrw.png" alt="MRW" width={56} height={56} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text">MRW</h3>
                  <p className="text-sm text-text-light">Mensaje Rápido</p>
                </div>
              </div>
              <p className="text-text-muted mb-6">
                Cobertura nacional con más de 70 oficinas. Ideal para ciudades
                principales y capitales de estado.
              </p>
              <ul className="space-y-2">
                {[
                  'Rastreo en línea 24/7',
                  'Seguro de mercancía incluido',
                  'Entrega puerta a puerta',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                    <Check className="h-4 w-4 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Zoom */}
            <div className="group rounded-2xl border border-sky-200 bg-sky-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm p-2">
                  <Image src="/logos/zoom.png" alt="Zoom" width={56} height={56} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text">Zoom</h3>
                  <p className="text-sm text-text-light">Mensajería</p>
                </div>
              </div>
              <p className="text-text-muted mb-6">
                Amplia red de agencias en todo el país. Opción económica
                para envíos de paquetes medianos y grandes.
              </p>
              <ul className="space-y-2">
                {[
                  'Más de 100 agencias nacionales',
                  'Opción de retiro en oficina',
                  'Notificación SMS al llegar',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                    <Check className="h-4 w-4 text-sky-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de envío */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Paso a paso
            </span>
            <h2 className="heading-serif mt-4 text-4xl font-bold text-text">
              ¿Cómo funciona?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Compra',
                description: 'Realiza tu pedido en nuestra tienda online o escríbenos por WhatsApp.',
              },
              {
                step: '02',
                title: 'Confirmación',
                description: 'Te contactamos para confirmar disponibilidad y datos de envío.',
              },
              {
                step: '03',
                title: 'Despacho',
                description: 'Empacamos con cuidado y entregamos a la empresa de mensajería.',
              },
              {
                step: '04',
                title: 'Entrega',
                description: 'Recibes en tu domicilio u oficina. Pagas el envío al recibir.',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-accent/40 to-transparent" />
                )}
                <div className="text-center">
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover ring-4 ring-white shadow-card mb-6">
                    <span className="text-2xl font-black text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3">{item.title}</h3>
                  <p className="text-text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zonas de cobertura */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-12 shadow-card">
            <h2 className="heading-serif text-3xl font-bold text-text text-center mb-8">
              Zonas de cobertura
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-accent-hover mb-4">
                  <MapPin className="h-5 w-5" />
                  Ciudades principales
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {['Caracas y área metropolitana', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay'].map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-sky-700 mb-4">
                  <Building2 className="h-5 w-5" />
                  Otras ciudades
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {['Ciudad Guayana', 'Barcelona / Puerto La Cruz', 'Mérida', 'San Cristóbal', 'Cumaná'].map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-text-light">
              ¿Tu ciudad no está en la lista? ¡Igual llegamos! Escríbenos para confirmar cobertura.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#10b981]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-4xl font-bold gradient-text mb-6">
            ¿Listo para recibir<br />tu instrumento?
          </h2>
          <p className="text-lg text-text-muted mb-10">
            Explora nuestro catálogo y haz tu pedido hoy mismo.
          </p>
          <a
            href="https://wa.me/584128288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#10b981] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-success/30 hover:shadow-2xl hover:shadow-success/40 hover:scale-105 transition-all duration-300"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
