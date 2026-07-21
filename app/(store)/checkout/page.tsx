'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ArrowLeft, ArrowRight, ShoppingCart, Music } from 'lucide-react'
import { useCartStore, useCartSubtotal } from '@/lib/cart/store'
import { generateOrderNumber } from '@/lib/cart/order'
import { whatsappOrderLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = useCartSubtotal()

  const [confirmedOrder, setConfirmedOrder] = useState<string | null>(null)

  function handleConfirm() {
    const orderNumber = generateOrderNumber()
    // Next step: persist this order to Supabase here (create sale + sale_items rows)
    // before or alongside opening WhatsApp, once the backend is ready.
    const link = whatsappOrderLink(items, orderNumber)
    window.open(link, '_blank', 'noopener,noreferrer')
    clearCart()
    setConfirmedOrder(orderNumber)
  }

  if (confirmedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="h-16 w-16 mx-auto mb-6 text-success" strokeWidth={1.5} />
        <h1 className="heading-serif text-3xl font-bold text-text mb-3">¡Pedido enviado!</h1>
        <p className="text-text-muted mb-2">
          Tu pedido <strong className="text-text">#{confirmedOrder}</strong> se abrió en WhatsApp.
        </p>
        <p className="text-text-muted mb-8">
          Confirmá el mensaje para que lo recibamos y te contactemos a la brevedad.
        </p>
        <Link href="/productos" className="btn-primary">
          Seguir comprando
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-slate-300" strokeWidth={1} />
        <h1 className="heading-serif text-3xl font-bold text-text mb-3">No hay nada que confirmar</h1>
        <p className="text-text-muted mb-8">Tu carrito está vacío.</p>
        <Link href="/productos" className="btn-primary">
          Ver productos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/carrito" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver al carrito
      </Link>

      <h1 className="heading-serif text-3xl sm:text-4xl font-bold text-text mb-2">Confirmar pedido</h1>
      <p className="text-text-muted mb-8">Revisá tu orden antes de enviarla por WhatsApp.</p>

      <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden mb-8">
        {items.map((item, index) => (
          <div
            key={item.productId}
            className={`flex items-center gap-4 p-4 ${index > 0 ? 'border-t border-border' : ''}`}
          >
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
              {item.imageUrl ? (
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="56px" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <Music className="h-6 w-6" strokeWidth={1} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text truncate">{item.name}</p>
              <p className="text-sm text-text-muted">Cantidad: {item.quantity}</p>
            </div>
            <span className="font-semibold text-text flex-shrink-0">
              {item.unitPriceUsd !== null ? `USD ${(item.unitPriceUsd * item.quantity).toFixed(2)}` : 'A consultar'}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between p-4 border-t border-border bg-bg-alt">
          <span className="text-lg font-bold text-text">Total</span>
          <span className="text-lg font-bold text-text">
            {subtotal !== null ? `USD ${subtotal.toFixed(2)}` : 'A confirmar'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="btn-primary btn-glow w-full justify-center py-4"
      >
        <WhatsAppIcon className="h-6 w-6" />
        Confirmar y enviar por WhatsApp
      </button>
    </div>
  )
}
