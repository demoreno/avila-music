'use client'

import { Minus, Plus } from 'lucide-react'

interface QuantityInputProps {
  value: number
  min?: number
  max: number
  onChange: (value: number) => void
  disabled?: boolean
}

export default function QuantityInput({
  value,
  min = 1,
  max,
  onChange,
  disabled = false,
}: QuantityInputProps) {
  function decrement() {
    if (value > min) onChange(value - 1)
  }

  function increment() {
    if (value < max) onChange(value + 1)
  }

  return (
    <div className="flex items-center gap-0">
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Reducir cantidad"
        className="flex h-12 w-12 items-center justify-center rounded-l-xl border border-slate-200 bg-white text-text-muted transition-colors hover:bg-slate-50 hover:text-[#1e4d6b] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus className="h-4 w-4" />
      </button>
      <div className="flex h-12 w-16 items-center justify-center border-y border-slate-200 bg-white text-base font-semibold text-text tabular-nums">
        {value}
      </div>
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="Aumentar cantidad"
        className="flex h-12 w-12 items-center justify-center rounded-r-xl border border-slate-200 bg-white text-text-muted transition-colors hover:bg-slate-50 hover:text-[#1e4d6b] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
