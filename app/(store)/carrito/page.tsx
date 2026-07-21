'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Music } from 'lucide-react'
import { useCartStore, useCartSubtotal } from '@/lib/cart/store'

export default function CarritoPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const subtotal = useCartSubtotal()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-slate-300" strokeWidth={1} />
        <h1 className="heading-serif text-3xl font-bold text-text mb-3">Tu carrito está vacío</h1>
        <p className="text-text-muted mb-8">Explorá el catálogo y agregá los productos que te interesen.</p>
        <Link href="/productos" className="btn-primary">
          Ver productos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="heading-serif text-3xl sm:text-4xl font-bold text-text mb-8">Tu carrito</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-card"
            >
              <Link href={`/productos/${item.slug}`} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <Music className="h-8 w-8" strokeWidth={1} />
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/productos/${item.slug}`} className="font-semibold text-text hover:text-[#1e4d6b] transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    aria-label={`Quitar ${item.name} del carrito`}
                    className="flex-shrink-0 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 rounded-full border border-border">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      aria-label="Disminuir cantidad"
                      className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-text transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-text">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.stockTotal > 0 && item.quantity >= item.stockTotal}
                      aria-label="Aumentar cantidad"
                      className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-text transition-colors disabled:opacity-30 disabled:hover:text-text-muted"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <span className="font-semibold text-text">
                    {item.unitPriceUsd !== null ? `USD ${(item.unitPriceUsd * item.quantity).toFixed(2)}` : 'Precio a consultar'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-bg-alt p-6 shadow-card">
            <h2 className="text-lg font-semibold text-text mb-4">Resumen</h2>
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span>{items.reduce((sum, i) => sum + i.quantity, 0)} producto(s)</span>
            </div>
            <div className="flex items-center justify-between text-xl font-bold text-text pt-3 border-t border-border mb-6">
              <span>Total</span>
              <span>{subtotal !== null ? `USD ${subtotal.toFixed(2)}` : 'A confirmar'}</span>
            </div>
            <Link href="/checkout" className="btn-primary w-full justify-center">
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/productos" className="block text-center text-sm text-text-muted hover:text-text transition-colors mt-4">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
