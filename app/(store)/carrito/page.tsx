'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { whatsappCartLink } from '@/lib/whatsapp'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCartStore()
  const cartTotal = total()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="heading-serif mt-4 text-2xl font-bold text-slate-900">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-slate-500">Agrega algunos productos para continuar</p>
        <Link
          href="/productos"
          className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Ver productos
        </Link>
      </div>
    )
  }

  const waLink = whatsappCartLink(
    items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price_usd }))
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="heading-serif text-3xl font-bold text-slate-900">Carrito</h1>
        <button
          onClick={clearCart}
          className="text-sm text-slate-500 underline hover:text-red-500"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-2xl">🎵</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/productos/${item.slug}`}
                className="font-semibold text-slate-800 hover:text-amber-600 line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-sm text-slate-500">USD {item.price_usd.toFixed(2)} c/u</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.id, item.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-600"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQty(item.id, item.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-600"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right text-sm font-bold text-slate-900">
              USD {(item.quantity * item.price_usd).toFixed(2)}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="ml-2 text-slate-400 hover:text-red-500"
              title="Eliminar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-700">Subtotal</span>
          <span className="text-2xl font-bold text-slate-900">USD {cartTotal.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Los precios son en dólares estadounidenses. El precio final puede variar según el método de pago.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/productos"
            className="flex-1 rounded-lg border border-slate-300 py-3 text-center text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            Seguir comprando
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-500 py-3 text-sm font-semibold text-white hover:bg-green-600"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Confirmar pedido por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
