import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, MapPin, Package, ChevronDown } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escribinos por WhatsApp o completá el formulario de contacto de Ávila Music. Te respondemos rápido.',
  alternates: { canonical: '/contacto' },
}

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Hablemos
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold gradient-text sm:text-6xl">
            Contáctanos
          </h1>
        </div>
      </section>

      {/* Canales de contacto */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl font-bold text-text">
              Estamos para servirte
            </h2>
            <p className="mt-4 text-text-muted max-w-2xl mx-auto">
              Elige tu canal preferido. Respondemos rápido porque sabemos que tu música no puede esperar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <a
              href="https://wa.me/584138288674"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-green-200 bg-green-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-700 ring-1 ring-green-500/30 mb-6 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">WhatsApp</h3>
              <p className="text-text-muted mb-4">Respuesta en minutos. Atención personalizada de músicos para músicos.</p>
              <span className="text-green-700 font-mono text-sm">+58 412-8288674</span>
            </a>

            {/* Email */}
            <div className="group rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-accent ring-1 ring-amber-300/50 mb-6 group-hover:scale-110 transition-transform">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Correo electrónico</h3>
              <p className="text-text-muted mb-4">Para consultas formales, cotizaciones o pedidos especiales.</p>
              <span className="text-accent-hover font-mono text-sm">contacto@avilamusic.com</span>
            </div>

            {/* Redes sociales */}
            <div className="group rounded-2xl border border-purple-200 bg-purple-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 ring-1 ring-purple-500/30 mb-6 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Instagram</h3>
              <p className="text-text-muted mb-4">Síguenos para novedades, promos y contenido musical.</p>
              <span className="text-purple-700 text-sm">@avilamusic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Horario y ubicación */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-serif text-3xl font-bold text-text mb-8">
                Horario de atención
              </h2>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-card">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-amber-200/60">
                    <span className="text-text font-medium">Lunes a Viernes</span>
                    <span className="text-accent-hover font-mono">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-amber-200/60">
                    <span className="text-text font-medium">Sábados</span>
                    <span className="text-accent-hover font-mono">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-text font-medium">Domingos</span>
                    <span className="text-text-light">Cerrado</span>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-4">
                  <p className="text-sm text-green-700 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    ¿Fuera de horario? Déjanos un mensaje y te respondemos al día siguiente.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="heading-serif text-3xl font-bold text-text mb-8">
                Ubicación
              </h2>

              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-8 shadow-card">
                <div className="aspect-video rounded-xl bg-white border border-sky-100 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-sky-200 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="text-text-light">Próximamente mapa interactivo</p>
                  </div>
                </div>

                <div className="space-y-3 text-text-muted">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-sky-600 mt-0.5" />
                    <span>
                      <strong className="text-text">Tienda online:</strong> Operamos en todo el territorio venezolano
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-sky-600 mt-0.5" />
                    <span>
                      <strong className="text-text">Almacén:</strong> Caracas, Venezuela
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ rápida */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="heading-serif text-3xl font-bold text-text text-center mb-12">
            Preguntas frecuentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: '¿Hacen envíos a todo el país?',
                a: 'Sí, despachamos a cualquier ciudad de Venezuela a través de MRW y Zoom. El pago del envío se realiza directamente al recibir.',
              },
              {
                q: '¿Cuánto tarda en llegar mi pedido?',
                a: 'Para ciudades principales: 24-48 horas. Para zonas remotas: 3-5 días hábiles. Te enviamos el número de tracking apenas despachamos.',
              },
              {
                q: '¿Aceptan pagos en divisas?',
                a: 'Sí, aceptamos pagos en USD (efectivo, Zelle, PayPal) y bolívares a la tasa del día.',
              },
              {
                q: '¿Los productos tienen garantía?',
                a: 'Sí, todos nuestros productos cuentan con garantía por defectos de fabricación. Consulta nuestra política de garantías.',
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-border bg-bg-alt p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-text font-medium pr-8">{faq.q}</span>
                  <ChevronDown className="h-5 w-5 text-accent transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-text-muted leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-center">
            <Link href="/faq" className="text-accent-hover hover:text-accent font-medium transition-colors">
              Ver todas las preguntas frecuentes →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#10b981]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-4xl font-bold gradient-text mb-6">
            ¿Tienes alguna duda?
          </h2>
          <p className="text-lg text-text-muted mb-10">
            Estamos aquí para ayudarte a encontrar exactamente lo que necesitas.
          </p>
          <a
            href="https://wa.me/584138288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#10b981] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-success/30 hover:shadow-2xl hover:shadow-success/40 hover:scale-105 transition-all duration-300"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Iniciar conversación
          </a>
        </div>
      </section>
    </>
  )
}
