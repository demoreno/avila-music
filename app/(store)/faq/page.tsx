export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-panel to-raised">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Ayuda
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold text-cream sm:text-6xl">
            Preguntas<br />
            <span className="text-gold">frecuentes</span>
          </h1>
        </div>
      </section>

      {/* Categorías de FAQ */}
      <section className="py-20 bg-ink">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Compras y pagos */}
          <div className="mb-16">
            <h2 className="heading-serif text-2xl font-bold text-cream mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              Compras y pagos
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Cómo puedo realizar un pedido?',
                  a: 'Puedes comprar directamente en nuestra tienda online o escribirnos por WhatsApp para ayudarte con el proceso. Te guiaremos paso a paso.',
                },
                {
                  q: '¿Qué métodos de pago aceptan?',
                  a: 'Aceptamos pagos en USD (efectivo, Zelle, PayPal, Binance Pay) y bolívares a la tasa del BCV. También transferencias bancarias nacionales.',
                },
                {
                  q: '¿Los precios incluyen IVA?',
                  a: 'Sí, todos nuestros precios publicados incluyen IVA. No hay cargos ocultos ni sorpresas al finalizar tu compra.',
                },
                {
                  q: '¿Puedo apartar un producto?',
                  a: 'Sí, puedes apartar productos con un 50% de anticipo. El tiempo máximo de apartado es de 7 días.',
                },
                {
                  q: '¿Hacen cotizaciones para pedidos grandes?',
                  a: 'Sí, ofrecemos precios especiales para escuelas de música, academias y compras al mayor. Escríbenos para una cotización personalizada.',
                },
              ].map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>

          {/* Envíos y entregas */}
          <div className="mb-16">
            <h2 className="heading-serif text-2xl font-bold text-cream mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              Envíos y entregas
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Hacen envíos a todo el país?',
                  a: 'Sí, despachamos a cualquier ciudad de Venezuela a través de MRW y Zoom. El costo del envío se paga directamente al recibir el paquete.',
                },
                {
                  q: '¿Cuánto tarda en llegar mi pedido?',
                  a: 'Para ciudades principales (Caracas, Valencia, Maracaibo): 24-48 horas. Para otras ciudades: 3-5 días hábiles. Te enviamos el número de tracking apenas despachamos.',
                },
                {
                  q: '¿Puedo recoger mi pedido personalmente?',
                  a: 'Sí, puedes retirar tu pedido en nuestro almacén en Caracas sin costo adicional. Te notificaremos cuando esté listo.',
                },
                {
                  q: '¿Empacan bien los instrumentos?',
                  a: 'Absolutamente. Usamos embalaje reforzado con burbuja, espuma y cajas rígidas. Los instrumentos van asegurados para evitar daños durante el transporte.',
                },
                {
                  q: '¿Qué pasa si mi producto llega dañado?',
                  a: 'Toma fotos del daño y del empaque al momento de recibir. Contáctanos dentro de las 24 horas y gestionaremos el reclamo con la empresa de envío o te enviaremos un reemplazo.',
                },
              ].map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>

          {/* Productos y garantía */}
          <div className="mb-16">
            <h2 className="heading-serif text-2xl font-bold text-cream mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              Productos y garantía
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Todos los productos tienen garantía?',
                  a: 'Sí, todos nuestros productos cuentan con garantía por defectos de fabricación. El período varía: 30 días para accesorios, 90 días para instrumentos, 1 año para equipos electrónicos.',
                },
                {
                  q: '¿Los productos son originales?',
                  a: 'Sí, trabajamos solo con proveedores autorizados. Todos nuestros productos son 100% originales y nuevos en su empaque.',
                },
                {
                  q: '¿Puedo probar un instrumento antes de comprarlo?',
                  a: 'Si retiras en nuestro almacén, sí puedes probarlo. Para envíos a domicilio, ofrecemos 7 días de prueba (el producto debe estar sin señales de uso).',
                },
                {
                  q: '¿Tienen catálogo físico?',
                  a: 'Somos tienda 100% online, pero puedes ver todo nuestro catálogo en esta página web. Si necesitas ayuda, escríbenos y te asesoramos.',
                },
                {
                  q: '¿Reciben productos como parte de pago?',
                  a: 'No manejamos trade-ins ni recibimos instrumentos usados como parte de pago. Solo vendemos productos nuevos.',
                },
              ].map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>

          {/* Atención al cliente */}
          <div>
            <h2 className="heading-serif text-2xl font-bold text-cream mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              Atención al cliente
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Cuál es su horario de atención?',
                  a: 'Lunes a Viernes: 9:00 AM - 6:00 PM. Sábados: 9:00 AM - 1:00 PM. Domingos: cerrado. Fuera de horario, déjanos un mensaje y te respondemos al día siguiente.',
                },
                {
                  q: '¿Por qué medio puedo contactarlos?',
                  a: 'El canal principal es WhatsApp (+58 413-8288674). También puedes escribirnos por Instagram (@avilamusic) o correo electrónico.',
                },
                {
                  q: '¿Tienen tienda física?',
                  a: 'No, operamos exclusivamente en línea para ofrecerte los mejores precios. Tenemos almacén en Caracas pero no atención al público.',
                },
                {
                  q: '¿Hacen envíos internacionales?',
                  a: 'Por ahora solo enviamos dentro de Venezuela. Si estás en el exterior, puedes hacer un pedido y nosotros lo enviamos a un familiar en el país.',
                },
              ].map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-ink to-panel/30">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-4xl font-bold text-cream mb-6">
            ¿No encontraste tu respuesta?
          </h2>
          <p className="text-lg text-sand/70 mb-10">
            Escríbenos por WhatsApp. Estamos aquí para ayudarte.
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
            Hablar con un asesor
          </a>
        </div>
      </section>
    </>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-edge bg-panel/40 p-6 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="text-cream font-medium pr-8">{question}</span>
        <svg
          className="h-5 w-5 text-gold transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="mt-4 text-sand/60 leading-relaxed">{answer}</p>
    </details>
  )
}
