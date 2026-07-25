'use client'

import { useBcvRate } from '@/lib/bcv/context'
import { formatBs } from '@/lib/bcv/format'

export default function BsPrice({ usd, className }: { usd: number; className?: string }) {
  const rate = useBcvRate()
  if (!rate) return null
  return <span className={className}>{formatBs(usd, rate)}</span>
}
