'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { CheckCircle2, ArrowLeft, ArrowRight, ShoppingCart, Music, LogIn } from 'lucide-react'
import type { CartItem } from '@/lib/cart/types'
import { useCartStore, useCartSubtotal } from '@/lib/cart/store'
import { whatsappOrderLink } from '@/lib/whatsapp'
import { createOrder } from './actions'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'
import BsPrice from '@/components/shared/BsPrice'

interface ConfirmedOrder {
  reference: string
  items: CartItem[]
}

const CARRIER_OPTIONS = [
  { name: 'MRW', logo: '/logos/mrw-logo.png' },
  { name: 'Zoom', logo: '/logos/zoom-logo.png' },
]

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = useCartSubtotal()

  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [shippingAddress, setShippingAddress] = useState('')
  const [recipientFirstName, setRecipientFirstName] = useState('')
  const [recipientLastName, setRecipientLastName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [recipientCedula, setRecipientCedula] = useState('')
  const [notes, setNotes] = useState('')
  const [preferredCarrier, setPreferredCarrier] = useState('')
  const [addressError, setAddressError] = useState('')
  const [recipientError, setRecipientError] = useState('')
  const [carrierError, setCarrierError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null)
  const [whatsappSent, setWhatsappSent] = useState(false)

  // Checkout requires an account — this used to be optional and let anyone persist
  // an order without logging in, which was flagged as a real security gap. Checked
  // client-side (same pattern as AccountMenu) so we can show a login prompt instead
  // of the form; createOrder() also enforces this server-side as the real boundary.
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user)
      setAuthChecked(true)
    })
  }, [])

  // The confirmation screen replaces a much taller form, so the browser keeps
  // whatever scroll position the visitor had while filling it out — jump back to
  // the top so the order number is actually visible instead of off-screen above.
  useEffect(() => {
    if (confirmed) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [confirmed])

  async function handleConfirm() {
    let hasError = false
    if (!shippingAddress.trim()) {
      setAddressError('Falta la dirección de envío.')
      hasError = true
    } else {
      setAddressError('')
    }
    if (!recipientFirstName.trim() || !recipientLastName.trim() || !recipientPhone.trim() || !recipientCedula.trim()) {
      setRecipientError('Completa nombre, apellido, teléfono y cédula de quien recibe.')
      hasError = true
    } else {
      setRecipientError('')
    }
    if (!preferredCarrier) {
      setCarrierError('Elige un transportista.')
      hasError = true
    } else {
      setCarrierError('')
    }
    if (hasError) return

    setSubmitError('')
    setSubmitting(true)
    try {
      // No hay columnas propias para estos datos — se concatenan al final de la
      // dirección de envío para no tener que tocar el esquema de `orders`.
      const fullShippingAddress = [
        shippingAddress.trim(),
        '',
        `Recibe: ${recipientFirstName.trim()} ${recipientLastName.trim()}`,
        `Teléfono: ${recipientPhone.trim()}`,
        `Cédula: ${recipientCedula.trim()}`,
      ].join('\n')

      const result = await createOrder({
        shippingAddress: fullShippingAddress,
        notes: notes || null,
        preferredCarrier,
        items,
      })
      setConfirmed({ reference: result.reference, items: [...items] })
      clearCart()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'No se pudo registrar el pedido. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
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
          Pedido registrado #{confirmed.reference}
        </h1>
        <p className="text-text-muted mb-8">
          Ya registramos tu pedido — puedes hacer todo el proceso desde &quot;Mi cuenta&quot;. Si prefieres, también puedes escribirnos por WhatsApp.
        </p>

        <button
          type="button"
          onClick={handleSendWhatsapp}
          className="btn-primary btn-glow w-full justify-center py-4 sm:w-auto sm:px-10"
        >
          <WhatsAppIcon className="h-6 w-6" />
          {whatsappSent ? 'Enviar de nuevo por WhatsApp' : 'Escribir por WhatsApp (opcional)'}
        </button>

        {whatsappSent && (
          <p className="mt-4 text-sm text-text-muted">
            Se abrió WhatsApp en otra pestaña — confirma el mensaje ahí para completar tu pedido.
          </p>
        )}

        <div className="mt-10 rounded-2xl border border-border bg-bg-alt p-6 text-left">
          <h2 className="mb-3 text-sm font-semibold text-text">¿Qué sigue ahora?</h2>
          <ol className="space-y-2.5 text-sm text-text-muted">
            <li className="flex gap-2.5">
              <span className="font-semibold text-accent">1.</span>
              Ya quedó registrado — no necesitas escribirnos para que lo recibamos, aunque puedes hacerlo si quieres que te contactemos más rápido.
            </li>
            <li className="flex gap-2.5">
              <span className="font-semibold text-accent">2.</span>
              Entra a &quot;Mi cuenta&quot; → Mis pedidos y elige cómo vas a pagar (Pago Móvil, transferencia o Binance) — ahí te mostramos los datos.
            </li>
            <li className="flex gap-2.5">
              <span className="font-semibold text-accent">3.</span>
              Realizas el pago y subes tu comprobante en la misma sección para que lo confirmemos.
            </li>
            <li className="flex gap-2.5">
              <span className="font-semibold text-accent">4.</span>
              Una vez confirmado el pago, coordinamos el envío a cobro a destino.
            </li>
          </ol>
        </div>

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

  if (!authChecked) {
    return <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6" />
  }

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <LogIn className="h-16 w-16 mx-auto mb-6 text-slate-300" strokeWidth={1} />
        <h1 className="heading-serif text-3xl font-bold text-text mb-3">Necesitas una cuenta</h1>
        <p className="text-text-muted mb-8">
          Para completar tu pedido desde la web, primero crea una cuenta o inicia sesión — así puedes ver el estado de tus pedidos y subir el comprobante de pago.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/cuenta/login?redirect=/checkout" className="btn-primary justify-center">
            Iniciar sesión
          </Link>
          <Link
            href="/cuenta/registro?redirect=/checkout"
            className="inline-flex items-center justify-center rounded-xl border-2 border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Crear cuenta
          </Link>
        </div>
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
      <p className="text-text-muted mb-8">Revisa los datos de tu pedido antes de confirmarlo.</p>

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
            <span className="text-right flex-shrink-0">
              <span className="block font-semibold text-text">
                {item.unitPriceUsd !== null ? `USD ${(item.unitPriceUsd * item.quantity).toFixed(2)}` : 'A consultar'}
              </span>
              {item.unitPriceUsd !== null && (
                <BsPrice usd={item.unitPriceUsd * item.quantity} className="block text-sm text-text-muted" />
              )}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between p-4 border-t border-border bg-bg-alt">
          <span className="text-lg font-bold text-text">Total</span>
          <span className="text-right">
            <span className="block text-lg font-bold text-text">
              {subtotal !== null ? `USD ${subtotal.toFixed(2)}` : 'A confirmar'}
            </span>
            {subtotal !== null && <BsPrice usd={subtotal} className="block text-base text-text-muted" />}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-card p-5 mb-8 space-y-4">
        <div>
          <label htmlFor="shipping-address" className="mb-1.5 block text-base font-medium text-text">Dirección de envío</label>
          <textarea
            id="shipping-address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={3}
            placeholder="Ej: Av. Principal, Edificio X, Piso 2, Apto 3, Caracas"
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          {addressError && <p aria-live="polite" className="mt-1 text-xs text-error">{addressError}</p>}
        </div>
        <div>
          <span className="mb-1.5 block text-base font-medium text-text">Datos de quien recibe</span>
          <p className="mb-2.5 text-sm text-text-muted">Necesarios para que la empresa de mensajería pueda entregar el paquete.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label htmlFor="recipient-first-name" className="sr-only">Nombre</label>
            <input
              id="recipient-first-name"
              type="text"
              value={recipientFirstName}
              onChange={(e) => setRecipientFirstName(e.target.value)}
              placeholder="Nombre"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <label htmlFor="recipient-last-name" className="sr-only">Apellido</label>
            <input
              id="recipient-last-name"
              type="text"
              value={recipientLastName}
              onChange={(e) => setRecipientLastName(e.target.value)}
              placeholder="Apellido"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <label htmlFor="recipient-phone" className="sr-only">Teléfono</label>
            <input
              id="recipient-phone"
              type="tel"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="Teléfono"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <label htmlFor="recipient-cedula" className="sr-only">Cédula</label>
            <input
              id="recipient-cedula"
              type="text"
              value={recipientCedula}
              onChange={(e) => setRecipientCedula(e.target.value)}
              placeholder="Cédula"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
          {recipientError && <p aria-live="polite" className="mt-1 text-xs text-error">{recipientError}</p>}
        </div>
        <div>
          <span className="mb-1.5 block text-base font-medium text-text">Transportista de envío</span>
          <p className="mb-2.5 text-sm text-text-muted">
            El envío es a cobro a destino: lo pagas directo a la empresa de mensajería al recibir tu paquete.{' '}
            <Link
              href="/envios"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline hover:text-accent-hover"
            >
              Más información sobre envíos
            </Link>
          </p>
          <div className="grid grid-cols-2 gap-3">
            {CARRIER_OPTIONS.map((option) => (
              <label
                key={option.name}
                className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg border px-4 py-4 text-base font-medium transition-colors ${
                  preferredCarrier === option.name
                    ? 'border-accent bg-primary-light/40 text-text'
                    : 'border-border text-text-muted hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="preferredCarrier"
                  value={option.name}
                  checked={preferredCarrier === option.name}
                  onChange={() => setPreferredCarrier(option.name)}
                  className="sr-only"
                />
                <Image src={option.logo} alt={option.name} width={36} height={36} className="h-9 w-9 object-contain" />
                {option.name}
              </label>
            ))}
          </div>
          {carrierError && <p aria-live="polite" className="mt-1 text-xs text-error">{carrierError}</p>}
        </div>
        <div>
          <label htmlFor="checkout-notes" className="mb-1.5 block text-sm font-medium text-text">Notas (opcional)</label>
          <textarea
            id="checkout-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Referencias de entrega, horario preferido, etc."
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      {submitError && (
        <p role="alert" aria-live="assertive" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {submitError}
        </p>
      )}

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
