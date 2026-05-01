export default function GarantiasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-panel to-raised">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Protección al cliente
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold text-cream sm:text-6xl">
            Garantías y<br />
            <span className="text-gold">devoluciones</span>
          </h1>
        </div>
      </section>

      {/* Info principal */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-edge bg-panel/40 p-8 sm:p-12">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold/70 ring-1 ring-gold/30 flex-shrink-0">
                <svg className="h-7 w-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cream mb-2">
                  Todos nuestros productos tienen garantía
                </h2>
                <p className="text-sand/70">
                  Compramos solo a proveedores autorizados. Cada instrumento y accesorio 
                  cuenta con respaldo por defectos de fabricación.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: '📦',
                  title: '30 días',
                  description: 'Para defectos de fabricación en accesorios y cuerdas',
                },
                {
                  icon: '🎸',
                  title: '90 días',
                  description: 'Para instrumentos musicales (guitarras, bajos, violines)',
                },
                {
                  icon: '🔌',
                  title: '1 año',
                  description: 'Para equipos electrónicos y amplificadores',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-edge bg-raised/50 p-6 text-center"
                >
                  <span className="text-4xl mb-3 block">{item.icon}</span>
                  <span className="text-2xl font-bold text-gold block mb-2">{item.title}</span>
                  <p className="text-sm text-sand/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cobertura */}
      <section className="py-20 bg-panel/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Qué cubre
            </span>
            <h2 className="heading-serif mt-4 text-4xl font-bold text-cream">
              Cobertura de garantía
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Cubre */}
            <div className="rounded-2xl border border-green-800/30 bg-green-900/10 p-8">
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sí está cubierto
              </h3>
              <ul className="space-y-3">
                {[
                  'Defectos de fabricación en materiales',
                  'Fallas en electrónica (pastillas, potenciómetros, jack)',
                  'Problemas estructurales (mástil torturado, puente desprendido)',
                  'Mal funcionamiento de afinadores y herrajes',
                  'Defectos en acabados (laca, barniz, pintura)',
                  'Fallas en amplificadores y pedales',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sand/70">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* No cubre */}
            <div className="rounded-2xl border border-red-800/30 bg-red-900/10 p-8">
              <h3 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                No está cubierto
              </h3>
              <ul className="space-y-3">
                {[
                  'Daños por mal uso o negligencia',
                  'Modificaciones no autorizadas',
                  'Daños por humedad extrema o temperatura',
                  'Desgaste normal por uso (cuerdas, trastes, baquetas)',
                  'Golpes, caídas o accidentes',
                  'Productos sin factura de compra',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sand/70">
                    <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de reclamo */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Paso a paso
            </span>
            <h2 className="heading-serif mt-4 text-4xl font-bold text-cream">
              ¿Cómo hacer un reclamo?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Contáctanos',
                description: 'Escríbenos por WhatsApp con tu número de pedido y descripción del problema.',
              },
              {
                step: '02',
                title: 'Evaluación',
                description: 'Revisamos tu caso y te solicitamos fotos o videos del defecto.',
              },
              {
                step: '03',
                title: 'Aprobación',
                description: 'Si aplica a garantía, te enviamos las instrucciones de envío.',
              },
              {
                step: '04',
                title: 'Solución',
                description: 'Reparamos, reemplazamos o reembolsamos según corresponda.',
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

      {/* Política de devoluciones */}
      <section className="py-20 bg-panel/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-edge bg-panel/40 p-8 sm:p-12">
            <h2 className="heading-serif text-3xl font-bold text-cream mb-8">
              Política de devoluciones
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20 flex-shrink-0">
                  <span className="text-gold font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-2">Devolución por garantía</h3>
                  <p className="text-sand/60">
                    Si tu producto presenta un defecto de fabricación dentro del período de garantía, 
                    cubrimos los costos de envío para reparación o reemplazo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20 flex-shrink-0">
                  <span className="text-gold font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-2">Devolución por arrepentimiento</h3>
                  <p className="text-sand/60">
                    Si cambiaste de opinión, puedes devolver el producto dentro de los 7 días 
                    posteriores a la compra. Debe estar sin usar, en su empaque original. 
                    Los costos de envío corren por tu cuenta.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20 flex-shrink-0">
                  <span className="text-gold font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-2">Productos no retornables</h3>
                  <p className="text-sand/60">
                    Por razones de higiene, las cuerdas, baquetas y accesorios de contacto 
                    personal no son retornables una vez abiertos, salvo defecto de fabricación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-ink to-panel/30">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-4xl font-bold text-cream mb-6">
            ¿Tienes un problema con tu producto?
          </h2>
          <p className="text-lg text-sand/70 mb-10">
            Estamos aquí para ayudarte. Escríbenos y buscaremos la mejor solución.
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
            Reportar un problema
          </a>
        </div>
      </section>
    </>
  )
}
