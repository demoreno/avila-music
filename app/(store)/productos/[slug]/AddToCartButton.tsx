'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import type { Product, ProductImage } from '@/types/index'

interface AddToCartButtonProps {
  product: Product & { images?: ProductImage[] }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const primaryImage = product.images?.find((i) => i.is_primary) ?? product.images?.[0]
  const imageUrl = primaryImage
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${primaryImage.storage_path}`
    : null

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price_usd: product.price_usd,
      quantity: 1,
      image_url: imageUrl,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (product.stock_total === 0) {
    return (
      <button
        disabled
        className="w-full rounded-xl bg-slate-100 py-4 text-sm font-semibold text-slate-400 cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        Sin stock disponible
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full rounded-xl py-4 text-sm font-semibold text-white transition-all duration-500 flex items-center justify-center gap-2 shadow-lg ${
        added
          ? 'bg-gradient-to-r from-[#10b981] to-[#059669] shadow-success/30'
          : 'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#fbbf24] hover:to-[#f59e0b] shadow-[#f59e0b]/30 hover:shadow-xl hover:-translate-y-0.5'
      }`}
    >
      {added ? (
        <>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          ¡Agregado al carrito!
        </>
      ) : (
        <>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Agregar al carrito
        </>
      )}
    </button>
  )
}
