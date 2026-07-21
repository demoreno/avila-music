'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/cart/store'

/** Mount once near the root — rehydrates the persisted cart after the server-rendered empty state. */
export default function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return null
}
