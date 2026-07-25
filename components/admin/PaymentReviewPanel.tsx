'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Check, X } from 'lucide-react'
import { reviewPayment } from '@/app/(admin)/admin/(dashboard)/ordenes/actions'
import type { Order, OrderPaymentMethod } from '@/types/index'

const METHOD_LABELS: Record<OrderPaymentMethod, string> = {
  pago_movil: 'Pago Móvil',
  transferencia: 'Transferencia',
  binance: 'Binance',
}

const STATUS_STYLE = {
  pendiente: 'bg-amber-50 text-amber-700',
  confirmado: 'bg-emerald-50 text-emerald-700',
  rechazado: 'bg-red-50 text-red-700',
}

export default function PaymentReviewPanel({ order, proofUrl }: { order: Order; proofUrl: string | null }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleReview(status: 'confirmado' | 'rechazado') {
    setSaving(true)
    setError('')
    try {
      await reviewPayment(order.id, status)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo actualizar el pago.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <CreditCard className="h-4 w-4" />
          Pago
        </h3>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[order.payment_status]}`}>
          {order.payment_status === 'pendiente' ? 'Pendiente' : order.payment_status === 'confirmado' ? 'Confirmado' : 'Rechazado'}
        </span>
      </div>

      {order.payment_method ? (
        <div className="space-y-1.5 text-sm text-slate-600">
          <p><span className="text-slate-400">Tipo:</span> {METHOD_LABELS[order.payment_method]}</p>
          <p><span className="text-slate-400">Referencia:</span> {order.payment_reference}</p>
          <p><span className="text-slate-400">Fecha:</span> {order.payment_date}</p>
          {proofUrl && (
            <a
              href={proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block overflow-hidden rounded-lg border border-slate-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- private-bucket signed URL, not a known remotePattern and expires shortly anyway */}
              <img src={proofUrl} alt="Comprobante de pago" className="w-full object-cover" />
            </a>
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-400">El cliente todavía no cargó un comprobante.</p>
      )}

      {order.payment_method && order.payment_status !== 'confirmado' && (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => handleReview('confirmado')}
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            <Check className="h-3.5 w-3.5" />
            Confirmar pago
          </button>
          <button
            type="button"
            onClick={() => handleReview('rechazado')}
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            <X className="h-3.5 w-3.5" />
            Rechazar
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
