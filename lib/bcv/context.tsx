'use client'

import { createContext, useContext } from 'react'

const BcvRateContext = createContext<number | null>(null)

export function BcvRateProvider({ rate, children }: { rate: number | null; children: React.ReactNode }) {
  return <BcvRateContext.Provider value={rate}>{children}</BcvRateContext.Provider>
}

export function useBcvRate(): number | null {
  return useContext(BcvRateContext)
}
