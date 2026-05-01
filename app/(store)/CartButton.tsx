'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cart'

export default function CartButton() {
  const itemCount = useCartStore((s) => s.itemCount())

  return (
    <Link
      href="/carrito"
      className="relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-all"
    >
      <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span className="hidden sm:inline">Carrito</span>
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}
