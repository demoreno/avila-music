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
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f59e0b]/20 to-[#fbbf24]/20 animate-pulse-glow" />
          <div className="relative flex h-full w-full items-center justify-center text-7xl">
            🛒
          </div>
        </div>
        <h1 className="heading-serif text-3xl font-bold text-[#1e4d6b] mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-text-muted mb-8">Agrega algunos productos para continuar</p>
        <Link
          href="/productos"
          className="btn-primary"
        >
          Ver productos
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    )
  }

  const waLink = whatsappCartLink(
    items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price_usd }))
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="heading-serif text-4xl font-bold gradient-text">Carrito de compras</h1>
          <p className="text-text-muted">{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-text-muted hover:text-error transition-colors flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Vaciar carrito
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card hover:shadow-card-hover hover:border-[#1e4d6b]/30 transition-all duration-300"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="80px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-3xl">🎵</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/productos/${item.slug}`}
                className="font-semibold text-[#1e4d6b] hover:text-[#0f7a5f] transition-colors line-clamp-1 block"
              >
                {item.name}
              </Link>
              <p className="text-sm text-text-muted">USD {item.price_usd.toFixed(2)} c/u</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.id, item.quantity - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 text-slate-600 hover:border-[#1e4d6b] hover:bg-[#1e4d6b] hover:text-white transition-all duration-300 font-bold text-lg"
              >
                −
              </button>
              <span className="w-10 text-center text-base font-bold text-[#1e4d6b]">{item.quantity}</span>
              <button
                onClick={() => updateQty(item.id, item.quantity + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 text-slate-600 hover:border-[#1e4d6b] hover:bg-[#1e4d6b] hover:text-white transition-all duration-300 font-bold text-lg"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <p className="w-28 text-right text-base font-bold gradient-text">
              USD {(item.quantity * item.price_usd).toFixed(2)}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-error/10 hover:text-error transition-all duration-300"
              title="Eliminar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="mt-8 rounded-2xl border border-[#1e4d6b]/10 bg-gradient-to-br from-[#1e4d6b]/5 to-[#4da8da]/5 p-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-[#1e4d6b]">Subtotal</span>
          <span className="text-3xl font-bold gradient-text">USD {cartTotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-text-muted mb-6">
          Los precios son en dólares estadounidenses. El precio final puede variar según el método de pago.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/productos"
            className="btn-outline justify-center flex-1"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Seguir comprando
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-glow justify-center flex-1"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.886 14.553c-.17-.085-1.009-.499-1.165-.556-.156-.057-.27-.085-.4.114-.127.199-.497.626-.61.754-.114.128-.228.142-.398.057-.17-.085-.723-.298-1.374-.878-.508-.453-.851-1.019-.95-1.19-.099-.17-.01-.262.085-.355.077-.076.17-.199.255-.298.085-.1.128-.17.185-.284.057-.113.028-.213-.014-.298-.043-.085-.383-.922-.525-1.262-.138-.332-.28-.287-.383-.293-.099-.005-.213-.005-.327-.005-.113 0-.298.043-.454.213-.156.17-.596.582-.596 1.423 0 .841.611 1.654.696 1.768.085.114 1.202 1.838 2.913 2.575.408.176.728.282.976.361.41.13.782.111 1.076.067.327-.049 1.009-.412 1.151-.813.142-.4.142-.74.085-.84-.057-.1-.213-.156-.454-.276m-3.103 4.253h-.003a5.675 5.675 0 01-2.888-.793l-.207-.122-2.149.564.572-2.1a5.654 5.654 0 01-.867-3.018c.001-3.127 2.549-5.674 5.678-5.674 1.514 0 2.937.59 4.007 1.662a5.633 5.633 0 011.653 4.011c-.002 3.127-2.551 5.674-5.679 5.674m4.84-10.513a6.788 6.788 0 00-4.796-1.988c-3.763 0-6.823 3.06-6.825 6.825 0 1.202.314 2.375.912 3.413L.635 20.5l4.568-1.198a6.817 6.817 0 003.268.832h.003c3.76 0 6.82-3.06 6.823-6.825a6.793 6.793 0 00-2.003-4.824" />
            </svg>
            Confirmar pedido por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
