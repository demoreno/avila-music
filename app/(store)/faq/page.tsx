import type { Metadata } from 'next'
import { ShoppingBag, Truck, ShieldCheck, Headphones, ChevronDown } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description: 'Resuelve tus dudas sobre pedidos, envíos, pagos y garantías en Ávila Music.',
  alternates: { canonical: '/faq' },
}

const COMPRAS_FAQ = [
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
]

const ENVIOS_FAQ = [
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
    a: 'Sí, puedes retirar tu pedido sin costo adicional en nuestro showroom de Caracas, coordinando una cita previa. Te notificaremos cuando esté listo.',
  },
  {
    q: '¿Empacan bien los instrumentos?',
    a: 'Absolutamente. Usamos embalaje reforzado con burbuja, espuma y cajas rígidas. Los instrumentos van asegurados para evitar daños durante el transporte.',
  },
  {
    q: '¿Qué pasa si mi producto llega dañado?',
    a: 'Toma fotos del daño y del empaque al momento de recibir. Contáctanos dentro de las 24 horas y gestionaremos el reclamo con la empresa de envío o te enviaremos un reemplazo.',
  },
]

const PRODUCTOS_FAQ = [
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
    a: 'Si coordinas una cita en nuestro showroom, sí puedes probarlo antes de retirarlo. Para envíos a domicilio, ofrecemos 7 días de prueba (el producto debe estar sin señales de uso).',
  },
  {
    q: '¿Tienen catálogo físico?',
    a: 'Puedes ver todo nuestro catálogo en esta página web, o coordinar una cita en nuestro showroom de Caracas para verlo en persona. Si necesitas ayuda, escríbenos y te asesoramos.',
  },
  {
    q: '¿Reciben productos como parte de pago?',
    a: 'No manejamos trade-ins ni recibimos instrumentos usados como parte de pago. Solo vendemos productos nuevos.',
  },
]

const ATENCION_FAQ = [
  {
    q: '¿Cuál es su horario de atención?',
    a: 'Lunes a Viernes: 10:00 AM - 5:00 PM. Sábados: 9:00 AM - 1:00 PM. Domingos: cerrado. Fuera de horario, déjanos un mensaje y te respondemos al día siguiente.',
  },
  {
    q: '¿Por qué medio puedo contactarlos?',
    a: 'El canal principal es WhatsApp (+58 412-8288674). También puedes escribirnos por Instagram (@avilamusiccs) o correo electrónico.',
  },
  {
    q: '¿Tienen tienda física?',
    a: 'Operamos principalmente en línea para ofrecerte los mejores precios, pero contamos con un showroom en Caracas (Centro de Operaciones y Despacho) para retiro y atención presencial, exclusivamente bajo previa cita.',
  },
  {
    q: '¿Hacen envíos internacionales?',
    a: 'Por ahora solo enviamos dentro de Venezuela. Si estás en el exterior, puedes hacer un pedido y nosotros lo enviamos a un familiar en el país.',
  },
]

const ALL_FAQS = [...COMPRAS_FAQ, ...ENVIOS_FAQ, ...PRODUCTOS_FAQ, ...ATENCION_FAQ]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ALL_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Ayuda
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold gradient-text sm:text-6xl">
            Preguntas<br />
            frecuentes
          </h1>
        </div>
      </section>

      {/* Categorías de FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Compras y pagos */}
          <div className="mb-16">
            <h2 className="heading-serif text-2xl font-bold text-text mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 ring-1 ring-amber-300/50">
                <ShoppingBag className="h-5 w-5 text-accent-hover" />
              </div>
              Compras y pagos
            </h2>

            <div className="space-y-4">
              {COMPRAS_FAQ.map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>

          {/* Envíos y entregas */}
          <div className="mb-16">
            <h2 className="heading-serif text-2xl font-bold text-text mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 ring-1 ring-amber-300/50">
                <Truck className="h-5 w-5 text-accent-hover" />
              </div>
              Envíos y entregas
            </h2>

            <div className="space-y-4">
              {ENVIOS_FAQ.map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>

          {/* Productos y garantía */}
          <div className="mb-16">
            <h2 className="heading-serif text-2xl font-bold text-text mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 ring-1 ring-amber-300/50">
                <ShieldCheck className="h-5 w-5 text-accent-hover" />
              </div>
              Productos y garantía
            </h2>

            <div className="space-y-4">
              {PRODUCTOS_FAQ.map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>

          {/* Atención al cliente */}
          <div>
            <h2 className="heading-serif text-2xl font-bold text-text mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 ring-1 ring-amber-300/50">
                <Headphones className="h-5 w-5 text-accent-hover" />
              </div>
              Atención al cliente
            </h2>

            <div className="space-y-4">
              {ATENCION_FAQ.map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-4xl font-bold gradient-text mb-6">
            ¿No encontraste tu respuesta?
          </h2>
          <p className="text-lg text-text-muted mb-10">
            Escríbenos por WhatsApp. Estamos aquí para ayudarte.
          </p>
          <a
            href="https://wa.me/584128288674"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-whatsapp to-whatsapp-hover hover:from-whatsapp-hover hover:to-whatsapp px-8 py-4 text-base font-semibold text-white shadow-xl shadow-whatsapp/30 hover:shadow-2xl hover:shadow-whatsapp/40 hover:scale-105 transition-all duration-300"
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
    <details className="group rounded-xl border border-border bg-bg-alt p-6 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="text-text font-medium pr-8">{question}</span>
        <ChevronDown className="h-5 w-5 text-accent transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-4 text-text-muted leading-relaxed">{answer}</p>
    </details>
  )
}
