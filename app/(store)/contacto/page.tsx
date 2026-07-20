import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, MapPin, ShoppingCart, LifeBuoy, Handshake, CalendarCheck, ChevronDown } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Departamentos de ventas, soporte y compras de Ávila Music. Escríbenos por WhatsApp o correo electrónico.',
  alternates: { canonical: '/contacto' },
}

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Departamentos
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold gradient-text sm:text-6xl">
            Contáctanos
          </h1>
        </div>
      </section>

      {/* Departamentos */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl font-bold text-text">
              Un correo para cada gestión
            </h2>
            <p className="mt-4 text-text-muted max-w-2xl mx-auto">
              Escríbenos al departamento correspondiente para una respuesta más rápida y precisa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Ventas */}
            <a
              href="mailto:ventas@avilamusic.store"
              className="group rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-accent ring-1 ring-amber-300/50 mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Ventas</h3>
              <p className="text-text-muted mb-4">Cotizaciones y atención a clientes.</p>
              <span className="text-accent-hover font-mono text-sm">ventas@avilamusic.store</span>
            </a>

            {/* Soporte */}
            <a
              href="mailto:soporte@avilamusic.store"
              className="group rounded-2xl border border-sky-200 bg-sky-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-700 ring-1 ring-sky-300/50 mb-6 group-hover:scale-110 transition-transform">
                <LifeBuoy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Soporte</h3>
              <p className="text-text-muted mb-4">Garantías y atención técnica.</p>
              <span className="text-sky-700 font-mono text-sm">soporte@avilamusic.store</span>
            </a>

            {/* Compras / B2B */}
            <a
              href="mailto:compras@avilamusic.store"
              className="group rounded-2xl border border-purple-200 bg-purple-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 ring-1 ring-purple-500/30 mb-6 group-hover:scale-110 transition-transform">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Compras</h3>
              <p className="text-text-muted mb-4">Exclusivo para alianzas B2B y proveedores.</p>
              <span className="text-purple-700 font-mono text-sm">compras@avilamusic.store</span>
            </a>
          </div>

          <div className="mt-8 max-w-5xl mx-auto">
            <a
              href="https://wa.me/584128288674"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-700 ring-1 ring-green-500/30 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Atención Rápida — WhatsApp</h3>
                <p className="text-text-muted text-sm">Respuesta en minutos · <span className="text-green-700 font-mono">+58 412-8288674</span></p>
              </div>
            </a>
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
                    <span className="text-accent-hover font-mono">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-amber-200/60">
                    <span className="text-text font-medium">Sábados</span>
                    <span className="text-accent-hover font-mono">10:00 AM - 1:00 PM</span>
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
                Oficina Comercial
              </h2>

              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-8 shadow-card">
                <div className="space-y-4 text-text-muted mb-6">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-text">Centro de Operaciones y Despacho:</strong> Av. Urdaneta, Torre Alfa, Oficina 8A, Caracas, Venezuela
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-text">Tienda online:</strong> Operamos en todo el territorio venezolano
                    </span>
                  </p>
                </div>

                <div className="rounded-xl bg-white border border-sky-100 p-4">
                  <p className="text-sm text-text-muted flex items-start gap-2">
                    <CalendarCheck className="h-4 w-4 text-sky-600 mt-0.5 flex-shrink-0" />
                    Atención presencial y retiro de mercancía exclusivamente bajo previa cita. Coordina la tuya por WhatsApp o el correo de ventas.
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
            href="https://wa.me/584128288674"
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
