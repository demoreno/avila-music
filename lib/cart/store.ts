'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './types'

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            const cap = existing.stockTotal > 0 ? existing.stockTotal : Infinity
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: Math.min(i.quantity + quantity, cap) }
                  : i
              ),
            }
          }
          const cap = item.stockTotal > 0 ? item.stockTotal : Infinity
          return { items: [...state.items, { ...item, quantity: Math.min(quantity, cap) }] }
        }),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId
                    ? { ...i, quantity: Math.min(quantity, i.stockTotal > 0 ? i.stockTotal : Infinity) }
                    : i
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    // skipHydration avoids a hydration mismatch: the server always renders an
    // empty cart, so the client must too until CartHydration rehydrates post-mount.
    { name: 'avila-cart', skipHydration: true }
  )
)

export function useCartCount() {
  return useCartStore((state) => state.items.reduce((sum, i) => sum + i.quantity, 0))
}

export function useCartSubtotal() {
  return useCartStore((state) => {
    if (state.items.some((i) => i.unitPriceUsd === null)) return null
    return state.items.reduce((sum, i) => sum + (i.unitPriceUsd as number) * i.quantity, 0)
  })
}
