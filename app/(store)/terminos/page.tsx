import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Términos y condiciones de compra y uso del sitio de Ávila Music.',
  alternates: { canonical: '/terminos' },
}

export default function TerminosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold gradient-text sm:text-6xl">
            Términos y<br />
            condiciones
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">

            <div className="rounded-2xl border border-border bg-bg-alt p-8 sm:p-12">
              <p className="text-text-muted mb-8">
                <strong className="text-text">Última actualización:</strong> Enero 2026
              </p>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  1. Información general
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Ávila Music es una tienda en línea dedicada a la venta de instrumentos musicales
                  y accesorios. Al utilizar este sitio web y realizar compras, aceptas los siguientes
                  términos y condiciones. Si no estás de acuerdo, por favor no utilices nuestros servicios.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  2. Productos y precios
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">2.1 Disponibilidad:</strong> Todos los productos
                    publicados están sujetos a disponibilidad. Nos reservamos el derecho de modificar
                    el catálogo sin previo aviso.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">2.2 Precios:</strong> Los precios están expresados
                    en dólares estadounidenses (USD). Aceptamos pagos en USD y bolívares a la tasa
                    oficial del BCV. Los precios incluyen IVA.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">2.3 Imágenes:</strong> Las fotografías son
                    ilustrativas. Los colores pueden variar ligeramente debido a la configuración
                    de tu dispositivo.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  3. Proceso de compra
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">3.1 Pedido:</strong> Al completar una compra,
                    enviamos una confirmación por WhatsApp o correo electrónico. El pedido se considera
                    formalizado una vez confirmado por nuestro equipo.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">3.2 Pago:</strong> El pago debe realizarse dentro
                    de las 24 horas posteriores a la confirmación. De no recibirse, el pedido será
                    cancelado automáticamente.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">3.3 Facturación:</strong> Emitimos factura
                    fiscal para todos los pedidos. Solicítala al momento de comprar.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  4. Envíos y entregas
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">4.1 Cobertura:</strong> Realizamos envíos a todo
                    el territorio venezolano a través de MRW y Zoom.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">4.2 Costos:</strong> El envío se paga directamente
                    al recibir el paquete (cobro a destino). Los costos varían según la empresa y
                    el destino.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">4.3 Tiempos:</strong> Ciudades principales:
                    24-48 horas. Otras ciudades: 3-5 días hábiles.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">4.4 Riesgo:</strong> El producto viaja asegurado.
                    Si llega dañado, contáctanos dentro de las 24 horas con evidencia fotográfica.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  5. Garantías y devoluciones
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">5.1 Cobertura:</strong> Todos los productos
                    tienen garantía por defectos de fabricación: 30 días (accesorios), 90 días
                    (instrumentos), 1 año (electrónica).
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">5.2 Exclusiones:</strong> La garantía no cubre
                    daños por mal uso, modificaciones, accidentes o desgaste normal.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">5.3 Devoluciones:</strong> Aceptamos devoluciones
                    dentro de los 7 días posteriores a la compra si el producto está sin usar y en
                    su empaque original. Los costos de envío corren por tu cuenta.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  6. Datos personales
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">6.1 Protección:</strong> Tus datos están
                    protegidos y solo se utilizan para procesar pedidos y enviarte información
                    relacionada con tu compra.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">6.2 Confidencialidad:</strong> No compartimos
                    tu información con terceros, excepto con las empresas de envío necesarias
                    para la entrega.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">6.3 Comunicaciones:</strong> Al comprar,
                    aceptas recibir mensajes relacionados con tu pedido. Puedes darte de baja
                    en cualquier momento.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  7. Propiedad intelectual
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">7.1 Contenido:</strong> Todo el contenido de
                    este sitio (textos, imágenes, logos, diseño) es propiedad de Ávila Music y
                    está protegido por leyes de derechos de autor.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">7.2 Uso:</strong> No puedes copiar, reproducir
                    o distribuir contenido sin autorización escrita previa.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  8. Limitación de responsabilidad
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">8.1 Sitio web:</strong> No nos responsabilizamos
                    por interrupciones temporales del sitio por mantenimiento o causas técnicas.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">8.2 Uso del producto:</strong> El uso de los
                    instrumentos y accesorios es bajo tu propia responsabilidad. Recomendamos
                    contar con supervisión profesional para principiantes.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  9. Modificaciones
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento.
                  Los cambios entran en vigor inmediatamente después de su publicación en este sitio.
                </p>
              </section>

              <section>
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  10. Contacto
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  Para dudas sobre estos términos, contáctanos:
                </p>
                <div className="rounded-xl border border-border bg-white p-6 shadow-card">
                  <p className="text-text-muted">
                    <strong className="text-text">WhatsApp:</strong> +58 412-8288674<br />
                    <strong className="text-text">Email:</strong> contacto@avilamusic.shop<br />
                    <strong className="text-text">Horario:</strong> Lunes a Viernes 10am-6pm, Sábados 10am-1pm
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Aceptación */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <ShieldCheck className="h-12 w-12 text-accent mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted">
              Al realizar una compra en Ávila Music, aceptas automáticamente estos
              términos y condiciones.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
