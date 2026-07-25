'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'
import type { OrderPaymentMethod } from '@/types/index'
import { uploadPaymentProof, submitPaymentProof } from '@/app/(store)/cuenta/actions'

const METHOD_OPTIONS: { value: OrderPaymentMethod; label: string }[] = [
  { value: 'pago_movil', label: 'Pago Móvil' },
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'binance', label: 'Binance' },
]

export default function PaymentProofForm({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [method, setMethod] = useState<OrderPaymentMethod>('pago_movil')
  const [reference, setReference] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!reference.trim()) {
      setError('Indica el número de referencia.')
      return
    }
    if (!file) {
      setError('Adjunta una captura del comprobante.')
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.set('proof', file)
      const proofPath = await uploadPaymentProof(orderId, formData)

      await submitPaymentProof({ orderId, method, reference: reference.trim(), date, proofPath })
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el comprobante.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
      <p className="text-xs font-medium text-slate-700">Cargar comprobante de pago</p>

      <div>
        <label className="mb-1 block text-xs text-slate-600">Tipo de pago</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as OrderPaymentMethod)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          {METHOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs text-slate-600">Número de referencia</label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-600">Fecha del pago</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-slate-600">Captura del comprobante</label>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 hover:border-amber-400 hover:text-amber-600">
          <Upload className="h-3.5 w-3.5" />
          {file ? file.name : 'Seleccionar imagen'}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-[#1e4d6b] py-2 text-xs font-semibold text-white hover:bg-[#153a52] disabled:opacity-60"
      >
        {submitting ? 'Enviando...' : 'Enviar comprobante'}
      </button>
    </form>
  )
}
