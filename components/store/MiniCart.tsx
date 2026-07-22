'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, X, Music, ArrowRight } from 'lucide-react'
import { useCartStore, useCartCount, useCartSubtotal } from '@/lib/cart/store'

export default function MiniCart() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const items = useCartStore((state) => state.items)
  const cartCount = useCartCount()
  const subtotal = useCartSubtotal()

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Carrito de compras${cartCount > 0 ? `, ${cartCount} producto${cartCount === 1 ? '' : 's'}` : ''}`}
        aria-expanded={open}
        className="relative p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
      >
        <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-black">
            {cartCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="font-semibold text-text">Tu carrito</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <ShoppingCart className="h-10 w-10 mx-auto mb-3 text-slate-300" strokeWidth={1} />
              <p className="text-sm text-text-muted">Tu carrito está vacío.</p>
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {items.map((item) => (
                  <Link
                    key={item.productId}
                    href={`/productos/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-300">
                          <Music className="h-5 w-5" strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{item.name}</p>
                      <p className="text-xs text-text-muted">Cantidad: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-text flex-shrink-0">
                      {item.unitPriceUsd !== null ? `USD ${(item.unitPriceUsd * item.quantity).toFixed(2)}` : 'Consultar'}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="px-4 py-3 border-t border-slate-100 bg-bg-alt">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-text-muted">Total</span>
                  <span className="text-lg font-bold text-text">
                    {subtotal !== null ? `USD ${subtotal.toFixed(2)}` : 'A confirmar'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/carrito"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center text-sm font-medium py-2.5 rounded-lg border border-slate-200 text-text hover:bg-white transition-colors"
                  >
                    Ver carrito
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium py-2.5 rounded-lg bg-[#1e4d6b] text-white hover:bg-[#153a52] transition-colors"
                  >
                    Comprar
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
