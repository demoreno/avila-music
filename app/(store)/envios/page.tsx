export default function EnviosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-panel to-raised">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Logística nacional
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold text-cream sm:text-6xl">
            Envíos y<br />
            <span className="text-gold">entregas</span>
          </h1>
        </div>
      </section>

      {/* Info principal */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-edge bg-panel/40 p-8 sm:p-12">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-800/50 bg-green-900/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Tienda 100% online
              </span>
              <h2 className="heading-serif mt-6 text-3xl font-bold text-cream">
                Sin tienda física,<br />con alcance nacional
              </h2>
              <p className="mt-4 text-lg text-sand/70">
                Operamos exclusivamente en línea para ofrecerte los mejores precios. 
                Despachamos a cualquier ciudad de Venezuela.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-edge bg-raised/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                    <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-cream">Pago a destino</h3>
                </div>
                <p className="text-sand/60">
                  El costo del envío lo cancelas directamente al recibir tu paquete. 
                  Sin pagos anticipados, sin sorpresas.
                </p>
              </div>

              <div className="rounded-xl border border-edge bg-raised/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                    <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-cream">Tiempo de entrega</h3>
                </div>
                <p className="text-sand/60">
                  24-48 horas para ciudades principales. 3-5 días para zonas 
                  remotas. Te enviamos el tracking apenas despachamos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas de envío */}
      <section className="py-20 bg-panel/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Aliados logísticos
            </span>
            <h2 className="heading-serif mt-4 text-4xl font-bold text-cream">
              Empresas de confianza
            </h2>
            <p className="mt-4 text-sand/70 max-w-2xl mx-auto">
              Trabajamos con las principales empresas de mensajería de Venezuela 
              para garantizar que tu instrumento llegue seguro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* MRW */}
            <div className="group rounded-2xl border border-edge bg-panel/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-800 ring-1 ring-red-500/30">
                  <span className="text-2xl font-black text-white">M</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cream">MRW</h3>
                  <p className="text-sm text-sand/50">Mensaje Rápido</p>
                </div>
              </div>
              <p className="text-sand/60 mb-6">
                Cobertura nacional con más de 70 oficinas. Ideal para ciudades 
                principales y capitales de estado.
              </p>
              <ul className="space-y-2">
                {[
                  'Rastreo en línea 24/7',
                  'Seguro de mercancía incluido',
                  'Entrega puerta a puerta',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-sand/50">
                    <svg className="h-4 w-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Zoom */}
            <div className="group rounded-2xl border border-edge bg-panel/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 ring-1 ring-blue-500/30">
                  <span className="text-2xl font-black text-white">Z</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cream">Zoom</h3>
                  <p className="text-sm text-sand/50">Mensajería</p>
                </div>
              </div>
              <p className="text-sand/60 mb-6">
                Amplia red de agencias en todo el país. Opción económica 
                para envíos de paquetes medianos y grandes.
              </p>
              <ul className="space-y-2">
                {[
                  'Más de 100 agencias nacionales',
                  'Opción de retiro en oficina',
                  'Notificación SMS al llegar',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-sand/50">
                    <svg className="h-4 w-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nota para logos */}
          <div className="mt-12 text-center">
            <p className="text-sm text-sand/40">
              📌 Espacio reservado para logos oficiales de MRW y Zoom
            </p>
          </div>
        </div>
      </section>

      {/* Proceso de envío */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Paso a paso
            </span>
            <h2 className="heading-serif mt-4 text-4xl font-bold text-cream">
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
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-gold/50 to-transparent" />
                )}
                <div className="text-center">
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold/70 ring-4 ring-ink mb-6">
                    <span className="text-2xl font-black text-ink">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-cream mb-3">{item.title}</h3>
                  <p className="text-sand/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zonas de cobertura */}
      <section className="py-20 bg-panel/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-edge bg-panel/40 p-8 sm:p-12">
            <h2 className="heading-serif text-3xl font-bold text-cream text-center mb-8">
              Zonas de cobertura
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gold mb-4">Ciudades principales</h3>
                <ul className="space-y-2 text-sand/60">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Caracas y área metropolitana
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Maracaibo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Valencia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Barquisimeto
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Maracay
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gold mb-4">Otras ciudades</h3>
                <ul className="space-y-2 text-sand/60">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Ciudad Guayana
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Barcelona / Puerto La Cruz
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Mérida
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    San Cristóbal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Cumaná
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-sand/50">
              ¿Tu ciudad no está en la lista? ¡Igual llegamos! Escríbenos para confirmar cobertura.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-ink to-panel/30">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-4xl font-bold text-cream mb-6">
            ¿Listo para recibir<br />tu instrumento?
          </h2>
          <p className="text-lg text-sand/70 mb-10">
            Explora nuestro catálogo y haz tu pedido hoy mismo.
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
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
