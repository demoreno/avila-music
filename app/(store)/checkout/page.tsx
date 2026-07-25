'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ArrowLeft, ArrowRight, ShoppingCart, Music } from 'lucide-react'
import type { CartItem } from '@/lib/cart/types'
import { useCartStore, useCartSubtotal } from '@/lib/cart/store'
import { generateOrderNumber } from '@/lib/cart/order'
import { whatsappOrderLink } from '@/lib/whatsapp'
import { createOrder } from './actions'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

interface ConfirmedOrder {
  reference: string
  saved: boolean
  items: CartItem[]
}

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = useCartSubtotal()

  const [shippingAddress, setShippingAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [preferredCarrier, setPreferredCarrier] = useState('')
  const [addressError, setAddressError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null)
  const [whatsappSent, setWhatsappSent] = useState(false)

  async function handleConfirm() {
    if (!shippingAddress.trim()) {
      setAddressError('Falta la dirección de envío.')
      return
    }
    setAddressError('')
    setSubmitting(true)

    // Persisting the order is best-effort — if the visitor isn't logged in, or
    // something fails, checkout still completes via WhatsApp either way. This step
    // only saves the order; sending the WhatsApp message is a separate, explicit
    // action below (also avoids window.open() being blocked as a popup when it
    // follows an awaited call instead of a direct click).
    let reference = generateOrderNumber()
    let saved = false
    try {
      const result = await createOrder({
        shippingAddress,
        notes: notes || null,
        preferredCarrier: preferredCarrier || null,
        items,
      })
      if (result) {
        reference = result.reference
        saved = true
      }
    } catch {
      // fall through — still let them send the WhatsApp message
    }

    setConfirmed({ reference, saved, items: [...items] })
    clearCart()
    setSubmitting(false)
  }

  function handleSendWhatsapp() {
    if (!confirmed) return
    const link = whatsappOrderLink(confirmed.items, confirmed.reference)
    window.open(link, '_blank', 'noopener,noreferrer')
    setWhatsappSent(true)
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="h-16 w-16 mx-auto mb-6 text-success" strokeWidth={1.5} />
        <h1 className="heading-serif text-3xl font-bold text-text mb-3">
          Pedido {confirmed.saved ? 'registrado' : 'listo'} #{confirmed.reference}
        </h1>
        <p className="text-text-muted mb-8">
          {confirmed.saved
            ? 'Ya puedes ver el estado en "Mi cuenta". Para que lo recibamos, envíanos el resumen por WhatsApp.'
            : 'Para que lo recibamos y te contactemos, envíanos el resumen por WhatsApp.'}
        </p>

        <button
          type="button"
          onClick={handleSendWhatsapp}
          className="btn-primary btn-glow w-full justify-center py-4 sm:w-auto sm:px-10"
        >
          <WhatsAppIcon className="h-6 w-6" />
          {whatsappSent ? 'Enviar de nuevo por WhatsApp' : 'Enviar por WhatsApp'}
        </button>

        {whatsappSent && (
          <p className="mt-4 text-sm text-text-muted">
            Se abrió WhatsApp en otra pestaña — confirma el mensaje ahí para completar tu pedido.
          </p>
        )}

        <div className="mt-8">
          <Link href="/productos" className="text-sm font-medium text-text-muted hover:text-text transition-colors inline-flex items-center gap-2">
            Seguir comprando
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
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
      <p className="text-text-muted mb-8">Revisa tu orden — el siguiente paso es enviarla por WhatsApp.</p>

      <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden mb-6">
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

      <div className="rounded-2xl border border-border bg-white shadow-card p-5 mb-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Dirección de envío</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={3}
            placeholder="Ej: Av. Principal, Edificio X, Piso 2, Apto 3, Caracas"
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          {addressError && <p className="mt-1 text-xs text-error">{addressError}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Transportista preferido (opcional)</label>
          <select
            value={preferredCarrier}
            onChange={(e) => setPreferredCarrier(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          >
            <option value="">Sin preferencia</option>
            <option value="MRW">MRW</option>
            <option value="Zoom">Zoom</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Notas (opcional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Referencias de entrega, horario preferido, etc."
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={submitting}
        className="btn-primary w-full justify-center py-4 disabled:opacity-60"
      >
        {submitting ? 'Confirmando...' : 'Confirmar pedido'}
      </button>
    </div>
  )
}
