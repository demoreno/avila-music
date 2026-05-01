export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-panel to-raised">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Hablemos
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold text-cream sm:text-6xl">
            Contáctanos
          </h1>
        </div>
      </section>

      {/* Canales de contacto */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl font-bold text-cream">
              Estamos para servirte
            </h2>
            <p className="mt-4 text-sand/70 max-w-2xl mx-auto">
              Elige tu canal preferido. Respondemos rápido porque sabemos que tu música no puede esperar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <a
              href="https://wa.me/584138288674"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-edge bg-panel/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-green-700/50 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.2)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-700 ring-1 ring-green-500/30 mb-6 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-cream mb-3">WhatsApp</h3>
              <p className="text-sand/60 mb-4">Respuesta en minutos. Atención personalizada de músicos para músicos.</p>
              <span className="text-green-400 font-mono text-sm">+58 413-8288674</span>
            </a>

            {/* Email */}
            <div className="group rounded-2xl border border-edge bg-panel/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_20px_40px_-15px_rgba(200,146,46,0.15)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/80 to-gold ring-1 ring-gold/30 mb-6 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-cream mb-3">Correo electrónico</h3>
              <p className="text-sand/60 mb-4">Para consultas formales, cotizaciones o pedidos especiales.</p>
              <span className="text-gold font-mono text-sm">contacto@avilamusic.com</span>
            </div>

            {/* Redes sociales */}
            <div className="group rounded-2xl border border-edge bg-panel/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_20px_40px_-15px_rgba(200,146,46,0.15)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 ring-1 ring-purple-500/30 mb-6 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-cream mb-3">Instagram</h3>
              <p className="text-sand/60 mb-4">Síguenos para novedades, promos y contenido musical.</p>
              <span className="text-purple-400 text-sm">@avilamusic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Horario y ubicación */}
      <section className="py-20 bg-panel/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-serif text-3xl font-bold text-cream mb-8">
                Horario de atención
              </h2>
              
              <div className="rounded-2xl border border-edge bg-panel/40 p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-edge/50">
                    <span className="text-cream font-medium">Lunes a Viernes</span>
                    <span className="text-gold font-mono">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-edge/50">
                    <span className="text-cream font-medium">Sábados</span>
                    <span className="text-gold font-mono">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-cream font-medium">Domingos</span>
                    <span className="text-sand/50">Cerrado</span>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-green-900/20 border border-green-800/30 p-4">
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    Fuera de horario? Déjanos un mensaje y te respondemos al día siguiente.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="heading-serif text-3xl font-bold text-cream mb-8">
                Ubicación
              </h2>
              
              <div className="rounded-2xl border border-edge bg-panel/40 p-8">
                <div className="aspect-video rounded-xl bg-raised flex items-center justify-center mb-6">
                  <div className="text-center">
                    <svg className="h-16 w-16 text-sand/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sand/50">📌 Próximamente mapa interactivo</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sand/60">
                  <p className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      <strong className="text-cream">Tienda online:</strong> Operamos en todo el territorio venezolano
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>
                      <strong className="text-cream">Almacén:</strong> Caracas, Venezuela
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ rápida */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="heading-serif text-3xl font-bold text-cream text-center mb-12">
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
                className="group rounded-xl border border-edge bg-panel/40 p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-cream font-medium pr-8">{faq.q}</span>
                  <svg
                    className="h-5 w-5 text-gold transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-sand/60 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-center">
            <Link href="/faq" className="text-gold hover:text-glow transition-colors">
              Ver todas las preguntas frecuentes →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-ink to-panel/30">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-4xl font-bold text-cream mb-6">
            ¿Tienes alguna duda?
          </h2>
          <p className="text-lg text-sand/70 mb-10">
            Estamos aquí para ayudarte a encontrar exactamente lo que necesitas.
          </p>
          <a
            href="https://wa.me/584138288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] transition-all hover:bg-green-500 hover:shadow-[0_0_60px_-10px_rgba(22,163,74,0.7)]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Iniciar conversación
          </a>
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'
