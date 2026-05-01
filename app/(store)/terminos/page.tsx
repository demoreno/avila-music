export default function TerminosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-panel to-raised">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Legal
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold text-cream sm:text-6xl">
            Términos y<br />
            <span className="text-gold">condiciones</span>
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-invert prose-lg max-w-none">
            
            <div className="rounded-2xl border border-edge bg-panel/40 p-8 sm:p-12">
              <p className="text-sand/60 mb-8">
                <strong className="text-cream">Última actualización:</strong> Enero 2026
              </p>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  1. Información general
                </h2>
                <p className="text-sand/70 leading-relaxed">
                  Ávila Music es una tienda en línea dedicada a la venta de instrumentos musicales 
                  y accesorios. Al utilizar este sitio web y realizar compras, aceptas los siguientes 
                  términos y condiciones. Si no estás de acuerdo, por favor no utilices nuestros servicios.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  2. Productos y precios
                </h2>
                <div className="space-y-4 text-sand/70">
                  <p className="leading-relaxed">
                    <strong className="text-cream">2.1 Disponibilidad:</strong> Todos los productos 
                    publicados están sujetos a disponibilidad. Nos reservamos el derecho de modificar 
                    el catálogo sin previo aviso.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">2.2 Precios:</strong> Los precios están expresados 
                    en dólares estadounidenses (USD). Aceptamos pagos en USD y bolívares a la tasa 
                    oficial del BCV. Los precios incluyen IVA.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">2.3 Imágenes:</strong> Las fotografías son 
                    ilustrativas. Los colores pueden variar ligeramente debido a la configuración 
                    de tu dispositivo.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  3. Proceso de compra
                </h2>
                <div className="space-y-4 text-sand/70">
                  <p className="leading-relaxed">
                    <strong className="text-cream">3.1 Pedido:</strong> Al completar una compra, 
                    enviamos una confirmación por WhatsApp o correo electrónico. El pedido se considera 
                    formalizado una vez confirmado por nuestro equipo.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">3.2 Pago:</strong> El pago debe realizarse dentro 
                    de las 24 horas posteriores a la confirmación. De no recibirse, el pedido será 
                    cancelado automáticamente.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">3.3 Facturación:</strong> Emitimos factura 
                    fiscal para todos los pedidos. Solicítala al momento de comprar.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  4. Envíos y entregas
                </h2>
                <div className="space-y-4 text-sand/70">
                  <p className="leading-relaxed">
                    <strong className="text-cream">4.1 Cobertura:</strong> Realizamos envíos a todo 
                    el territorio venezolano a través de MRW y Zoom.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">4.2 Costos:</strong> El envío se paga directamente 
                    al recibir el paquete (cobro a destino). Los costos varían según la empresa y 
                    el destino.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">4.3 Tiempos:</strong> Ciudades principales: 
                    24-48 horas. Otras ciudades: 3-5 días hábiles.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">4.4 Riesgo:</strong> El producto viaja asegurado. 
                    Si llega dañado, contáctanos dentro de las 24 horas con evidencia fotográfica.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  5. Garantías y devoluciones
                </h2>
                <div className="space-y-4 text-sand/70">
                  <p className="leading-relaxed">
                    <strong className="text-cream">5.1 Cobertura:</strong> Todos los productos 
                    tienen garantía por defectos de fabricación: 30 días (accesorios), 90 días 
                    (instrumentos), 1 año (electrónica).
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">5.2 Exclusiones:</strong> La garantía no cubre 
                    daños por mal uso, modificaciones, accidentes o desgaste normal.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">5.3 Devoluciones:</strong> Aceptamos devoluciones 
                    dentro de los 7 días posteriores a la compra si el producto está sin usar y en 
                    su empaque original. Los costos de envío corren por tu cuenta.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  6. Datos personales
                </h2>
                <div className="space-y-4 text-sand/70">
                  <p className="leading-relaxed">
                    <strong className="text-cream">6.1 Protección:</strong> Tus datos están 
                    protegidos y solo se utilizan para procesar pedidos y enviarte información 
                    relacionada con tu compra.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">6.2 Confidencialidad:</strong> No compartimos 
                    tu información con terceros, excepto con las empresas de envío necesarias 
                    para la entrega.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">6.3 Comunicaciones:</strong> Al comprar, 
                    aceptas recibir mensajes relacionados con tu pedido. Puedes darte de baja 
                    en cualquier momento.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  7. Propiedad intelectual
                </h2>
                <div className="space-y-4 text-sand/70">
                  <p className="leading-relaxed">
                    <strong className="text-cream">7.1 Contenido:</strong> Todo el contenido de 
                    este sitio (textos, imágenes, logos, diseño) es propiedad de Ávila Music y 
                    está protegido por leyes de derechos de autor.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">7.2 Uso:</strong> No puedes copiar, reproducir 
                    o distribuir contenido sin autorización escrita previa.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  8. Limitación de responsabilidad
                </h2>
                <div className="space-y-4 text-sand/70">
                  <p className="leading-relaxed">
                    <strong className="text-cream">8.1 Sitio web:</strong> No nos responsabilizamos 
                    por interrupciones temporales del sitio por mantenimiento o causas técnicas.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cream">8.2 Uso del producto:</strong> El uso de los 
                    instrumentos y accesorios es bajo tu propia responsabilidad. Recomendamos 
                    contar con supervisión profesional para principiantes.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  9. Modificaciones
                </h2>
                <p className="text-sand/70 leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Los cambios entran en vigor inmediatamente después de su publicación en este sitio.
                </p>
              </section>

              <section>
                <h2 className="heading-serif text-2xl font-bold text-cream mb-4">
                  10. Contacto
                </h2>
                <p className="text-sand/70 leading-relaxed mb-4">
                  Para dudas sobre estos términos, contáctanos:
                </p>
                <div className="rounded-xl border border-edge bg-raised/50 p-6">
                  <p className="text-sand/60">
                    <strong className="text-cream">WhatsApp:</strong> +58 413-8288674<br />
                    <strong className="text-cream">Email:</strong> contacto@avilamusic.com<br />
                    <strong className="text-cream">Horario:</strong> Lunes a Viernes 9am-6pm, Sábados 9am-1pm
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Aceptación */}
      <section className="py-20 bg-gradient-to-b from-ink to-panel/30">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-edge bg-panel/40 p-8">
            <svg className="h-12 w-12 text-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-sand/60">
              Al realizar una compra en Ávila Music, aceptas automáticamente estos 
              términos y condiciones.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
