import type { Metadata } from 'next'
import { ShieldCheck, Check, X, Package, Guitar, Plug } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Garantías',
  description: 'Todos los productos de Ávila Music son 100% originales y cuentan con garantía. Conocé las condiciones.',
  alternates: { canonical: '/garantias' },
}

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
                <ShieldCheck className="h-7 w-7 text-ink" />
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
                  icon: Package,
                  title: '30 días',
                  description: 'Para defectos de fabricación en accesorios y cuerdas',
                },
                {
                  icon: Guitar,
                  title: '90 días',
                  description: 'Para instrumentos musicales (guitarras, bajos, violines)',
                },
                {
                  icon: Plug,
                  title: '1 año',
                  description: 'Para equipos electrónicos y amplificadores',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-edge bg-raised/50 p-6 text-center"
                >
                  <item.icon className="h-9 w-9 mb-3 mx-auto text-gold" strokeWidth={1.5} />
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
                <Check className="h-6 w-6" />
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
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* No cubre */}
            <div className="rounded-2xl border border-red-800/30 bg-red-900/10 p-8">
              <h3 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-3">
                <X className="h-6 w-6" />
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
                    <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
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
            href="https://wa.me/584128288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] transition-all hover:bg-green-500 hover:shadow-[0_0_60px_-10px_rgba(22,163,74,0.7)]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Reportar un problema
          </a>
        </div>
      </section>
    </>
  )
}
