import type { Metadata } from 'next'
import { ShoppingBag, Truck, ShieldCheck, Headphones, ChevronDown } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description: 'Resolvé tus dudas sobre pedidos, envíos, pagos y garantías en Ávila Music.',
  alternates: { canonical: '/faq' },
}

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
                <ShoppingBag className="h-5 w-5 text-gold" />
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
                <Truck className="h-5 w-5 text-gold" />
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
                <ShieldCheck className="h-5 w-5 text-gold" />
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
                <Headphones className="h-5 w-5 text-gold" />
              </div>
              Atención al cliente
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Cuál es su horario de atención?',
                  a: 'Lunes a Viernes: 9:00 AM - 5:00 PM. Sábados: 9:00 AM - 1:00 PM. Domingos: cerrado. Fuera de horario, déjanos un mensaje y te respondemos al día siguiente.',
                },
                {
                  q: '¿Por qué medio puedo contactarlos?',
                  a: 'El canal principal es WhatsApp (+58 412-8288674). También puedes escribirnos por Instagram (@avilamusiccs) o correo electrónico.',
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
            href="https://wa.me/584128288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] transition-all hover:bg-green-500 hover:shadow-[0_0_60px_-10px_rgba(22,163,74,0.7)]"
          >
            <WhatsAppIcon className="h-5 w-5" />
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
        <ChevronDown className="h-5 w-5 text-gold transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-4 text-sand/60 leading-relaxed">{answer}</p>
    </details>
  )
}
