'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Truck, Upload } from 'lucide-react'
import { updateOrderStatus, adminCancelOrder, uploadShippingProof } from '@/app/(admin)/admin/(dashboard)/ordenes/actions'
import type { Order, OrderStatus } from '@/types/index'

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'en_camino', label: 'En camino' },
  { value: 'completado', label: 'Completado' },
]

const CARRIER_OPTIONS = ['MRW', 'Zoom', 'Otro']
const CANCELABLE: OrderStatus[] = ['pendiente', 'confirmado']

export default function OrderStatusPanel({ order, shippingProofUrl }: { order: Order; shippingProofUrl: string | null }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [cancelOpen, setCancelOpen] = useState(false)
  const [reason, setReason] = useState('')

  // Prompted only when moving TO en_camino without shipping info yet — same pattern
  // as Pedidos' "estimated arrival date" modal. Carrier defaults to whatever the
  // customer picked as a preference at checkout, if they picked one.
  const [shippingPrompt, setShippingPrompt] = useState(false)
  const initialCarrier = order.shipping_carrier ?? (CARRIER_OPTIONS.includes(order.preferred_carrier ?? '') ? order.preferred_carrier! : CARRIER_OPTIONS[0])
  const [carrier, setCarrier] = useState(initialCarrier)
  const [carrierOther, setCarrierOther] = useState('')
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number ?? '')
  const [proofFile, setProofFile] = useState<File | null>(null)

  async function handleStatusChange(status: OrderStatus) {
    if (status === 'en_camino' && !order.shipping_carrier) {
      setShippingPrompt(true)
      return
    }
    await submitStatusChange(status)
  }

  async function submitStatusChange(status: OrderStatus, shippingInfo?: { carrier: string; trackingNumber: string; proofPath?: string }) {
    setSaving(true)
    setError('')
    try {
      await updateOrderStatus(order.id, status, shippingInfo)
      setShippingPrompt(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo actualizar el estado.')
    } finally {
      setSaving(false)
    }
  }

  async function handleConfirmShipping() {
    const finalCarrier = carrier === 'Otro' ? carrierOther.trim() : carrier
    if (!finalCarrier) {
      setError('Indica el transportista.')
      return
    }
    if (!trackingNumber.trim()) {
      setError('Indica el número de guía.')
      return
    }

    setSaving(true)
    setError('')
    try {
      let proofPath: string | undefined
      if (proofFile) {
        const formData = new FormData()
        formData.set('proof', proofFile)
        proofPath = await uploadShippingProof(order.id, formData)
      }
      await submitStatusChange('en_camino', { carrier: finalCarrier, trackingNumber: trackingNumber.trim(), proofPath })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo confirmar el envío.')
      setSaving(false)
    }
  }

  async function handleCancel() {
    if (!reason.trim()) {
      setError('Indica el motivo de la cancelación.')
      return
    }
    setSaving(true)
    setError('')
    try {
      await adminCancelOrder(order.id, reason.trim())
      setCancelOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cancelar la orden.')
    } finally {
      setSaving(false)
    }
  }

  const isFinal = order.status === 'completado' || order.status === 'cancelado'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-700">Estado de la orden</h3>

      {order.preferred_carrier && (
        <p className="mb-3 text-xs text-slate-500">
          Transportista preferido por el cliente: <span className="font-medium text-slate-700">{order.preferred_carrier}</span>
        </p>
      )}

      {isFinal ? (
        <p className="text-sm text-slate-500">
          Esta orden ya está {order.status === 'completado' ? 'completada' : 'cancelada'} — no admite más cambios.
        </p>
      ) : (
        <>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            disabled={saving}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {shippingPrompt && (
            <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-700">
                <Truck className="h-3.5 w-3.5" />
                Transportista
              </label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                {CARRIER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {carrier === 'Otro' && (
                <input
                  type="text"
                  value={carrierOther}
                  onChange={(e) => setCarrierOther(e.target.value)}
                  placeholder="Nombre del transportista"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              )}
              <label className="mb-1.5 mt-3 block text-xs font-medium text-slate-700">Número de guía</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Ej: 123456789"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <label className="mb-1.5 mt-3 block text-xs font-medium text-slate-700">Comprobante de envío (opcional)</label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-blue-300 px-3 py-2 text-xs text-blue-700 hover:border-blue-400">
                <Upload className="h-3.5 w-3.5" />
                {proofFile ? proofFile.name : 'Seleccionar imagen'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleConfirmShipping}
                  disabled={saving}
                  className="rounded-lg bg-[#1e4d6b] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#153a52] disabled:opacity-60"
                >
                  {saving ? 'Guardando...' : 'Confirmar envío'}
                </button>
                <button
                  type="button"
                  onClick={() => setShippingPrompt(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {CANCELABLE.includes(order.status) && !cancelOpen && (
            <button
              type="button"
              onClick={() => { setCancelOpen(true); setReason(''); setError('') }}
              className="mt-3 w-full rounded-lg border border-red-200 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Cancelar orden
            </button>
          )}

          {cancelOpen && (
            <div className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3">
              <label className="mb-1.5 block text-xs font-medium text-slate-700">Motivo de la cancelación</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  Confirmar cancelación
                </button>
                <button
                  type="button"
                  onClick={() => setCancelOpen(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {(order.shipping_carrier || order.tracking_number) && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Truck className="h-3.5 w-3.5" />
          {order.shipping_carrier} — Guía: {order.tracking_number}
        </div>
      )}

      {shippingProofUrl && (
        <a href={shippingProofUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block overflow-hidden rounded-lg border border-slate-200">
          {/* unoptimized: private-bucket signed URL, not a known remotePattern and expires shortly anyway — optimizing/caching it would break once the URL expires */}
          <Image
            src={shippingProofUrl}
            alt="Comprobante de envío"
            width={0}
            height={0}
            sizes="100vw"
            unoptimized
            style={{ width: '100%', height: 'auto' }}
          />
        </a>
      )}

      {order.status === 'cancelado' && order.cancellation_reason && (
        <p className="mt-3 text-xs text-slate-400">Motivo: {order.cancellation_reason}</p>
      )}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
