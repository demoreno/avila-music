'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { whatsappCartLink } from '@/lib/whatsapp'

export default function CheckoutPage() {
  const { items, total } = useCartStore()
  const cartTotal = total()

  const waLink = items.length > 0
    ? whatsappCartLink(items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price_usd })))
    : 'https://wa.me/584138288674'

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="heading-serif mb-2 text-4xl font-bold gradient-text">Finalizar pedido</h1>
      <p className="text-text-muted mb-8">Completa tu compra en 3 sencillos pasos</p>

      {/* Steps */}
      <div className="rounded-2xl border border-[#1e4d6b]/10 bg-gradient-to-br from-[#1e4d6b]/5 to-[#4da8da]/5 p-8 backdrop-blur-sm">
        <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#1e4d6b]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          ¿Cómo funciona?
        </h2>
        <ol className="space-y-4">
          {[
            { step: 1, text: 'Haz clic en el botón de WhatsApp para enviarnos tu pedido con los productos seleccionados.' },
            { step: 2, text: 'Nuestro equipo confirmará la disponibilidad y te enviará los detalles del pago.' },
            { step: 3, text: 'Una vez confirmado el pago, coordinaremos el envío a tu ubicación.' },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1e4d6b] to-[#0f7a5f] text-sm font-bold text-white shadow-lg">
                {item.step}
              </span>
              <span className="text-text pt-1">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Order Summary */}
      {items.length > 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#1e4d6b]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Resumen del pedido
          </h2>
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-3 text-sm">
                <span className="text-text-muted">
                  <span className="font-semibold text-[#1e4d6b]">{item.quantity}x</span> {item.name}
                </span>
                <span className="font-semibold text-slate-800">
                  USD {(item.quantity * item.price_usd).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-[#1e4d6b]/10 pt-4 text-lg font-bold">
            <span className="text-[#1e4d6b]">Total</span>
            <span className="gradient-text">USD {cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-glow justify-center py-4 text-base"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.886 14.553c-.17-.085-1.009-.499-1.165-.556-.156-.057-.27-.085-.4.114-.127.199-.497.626-.61.754-.114.128-.228.142-.398.057-.17-.085-.723-.298-1.374-.878-.508-.453-.851-1.019-.95-1.19-.099-.17-.01-.262.085-.355.077-.076.17-.199.255-.298.085-.1.128-.17.185-.284.057-.113.028-.213-.014-.298-.043-.085-.383-.922-.525-1.262-.138-.332-.28-.287-.383-.293-.099-.005-.213-.005-.327-.005-.113 0-.298.043-.454.213-.156.17-.596.582-.596 1.423 0 .841.611 1.654.696 1.768.085.114 1.202 1.838 2.913 2.575.408.176.728.282.976.361.41.13.782.111 1.076.067.327-.049 1.009-.412 1.151-.813.142-.4.142-.74.085-.84-.057-.1-.213-.156-.454-.276m-3.103 4.253h-.003a5.675 5.675 0 01-2.888-.793l-.207-.122-2.149.564.572-2.1a5.654 5.654 0 01-.867-3.018c.001-3.127 2.549-5.674 5.678-5.674 1.514 0 2.937.59 4.007 1.662a5.633 5.633 0 011.653 4.011c-.002 3.127-2.551 5.674-5.679 5.674m4.84-10.513a6.788 6.788 0 00-4.796-1.988c-3.763 0-6.823 3.06-6.825 6.825 0 1.202.314 2.375.912 3.413L.635 20.5l4.568-1.198a6.817 6.817 0 003.268.832h.003c3.76 0 6.82-3.06 6.823-6.825a6.793 6.793 0 00-2.003-4.824" />
          </svg>
          Enviar pedido por WhatsApp
        </a>
        <Link
          href="/carrito"
          className="btn-outline justify-center"
        >
          Volver al carrito
        </Link>
      </div>
    </div>
  )
}
