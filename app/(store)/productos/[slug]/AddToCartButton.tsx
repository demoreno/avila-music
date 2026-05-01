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
        className="w-full rounded-lg bg-slate-200 py-3 text-sm font-semibold text-slate-500 cursor-not-allowed"
      >
        Sin stock disponible
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all ${
        added ? 'bg-green-500' : 'bg-amber-500 hover:bg-amber-600'
      }`}
    >
      {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
    </button>
  )
}
