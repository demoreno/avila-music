'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/lib/cart/store'
import type { CartItem } from '@/lib/cart/types'

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>
  quantity?: number
  className?: string
  children?: React.ReactNode
  ariaLabel?: string
}

export default function AddToCartButton({ product, quantity = 1, className, children, ariaLabel }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [justAdded, setJustAdded] = useState(false)

  function handleClick() {
    addItem(product, quantity)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const isOutOfStock = product.stockTotal === 0

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isOutOfStock}
      aria-label={ariaLabel}
      className={className}
    >
      {justAdded ? (
        <>
          <Check className="h-5 w-5" />
          {children ? 'Agregado' : null}
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          {children ?? 'Agregar al carrito'}
        </>
      )}
    </button>
  )
}
