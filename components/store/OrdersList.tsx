'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package, X, Truck, FileText } from 'lucide-react'
import type { Order, OrderItem, OrderStatus, PaymentStatus } from '@/types/index'
import { cancelMyOrder } from '@/app/(store)/cuenta/actions'
import PaymentProofForm from './PaymentProofForm'

const STATUS_LABELS: Record<OrderStatus, { label: string; className: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-amber-50 text-amber-700' },
  confirmado: { label: 'Confirmado', className: 'bg-blue-50 text-blue-700' },
  en_camino: { label: 'En camino', className: 'bg-blue-50 text-blue-700' },
  completado: { label: 'Completado', className: 'bg-emerald-50 text-emerald-700' },
  cancelado: { label: 'Cancelado', className: 'bg-slate-100 text-slate-500' },
}

const PAYMENT_STATUS_LABELS: Record<PaymentStatus, { label: string; className: string }> = {
  pendiente: { label: 'Pago pendiente', className: 'bg-amber-50 text-amber-700' },
  confirmado: { label: 'Pago confirmado', className: 'bg-emerald-50 text-emerald-700' },
  rechazado: { label: 'Pago rechazado', className: 'bg-red-50 text-red-700' },
}

const CANCELABLE: OrderStatus[] = ['pendiente', 'confirmado']

interface OrdersListProps {
  orders: (Order & { items: OrderItem[]; paymentProofUrl: string | null })[]
}

export default function OrdersList({ orders }: OrdersListProps) {
  const router = useRouter()
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleCancel(orderId: string) {
    if (!reason.trim()) {
      setError('Indica el motivo de la cancelación.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await cancelMyOrder(orderId, reason.trim())
      setCancelingId(null)
      setReason('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cancelar el pedido.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orders.length === 0) {
    return (
      <p className="text-base text-text-muted">
        Todavía no tienes pedidos registrados. Cuando confirmes una compra por WhatsApp, va a aparecer acá.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const status = STATUS_LABELS[order.status]
        const paymentStatus = PAYMENT_STATUS_LABELS[order.payment_status]
        const reference = order.id.slice(0, 8).toUpperCase()
        const isOpenOrder = order.status !== 'completado' && order.status !== 'cancelado'

        return (
          <div key={order.id} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-base font-semibold text-slate-800">
                  <Package className="h-4 w-4 text-slate-400" />
                  Pedido #{reference}
                </p>
                <p className="mt-0.5 text-sm text-text-muted">
                  {new Date(order.created_at).toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>{status.label}</span>
                {isOpenOrder && (
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${paymentStatus.className}`}>{paymentStatus.label}</span>
                )}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {order.items.map((item) => (
                <p key={item.id} className="text-base text-slate-600">
                  {item.quantity}x {item.product_name}
                </p>
              ))}
            </div>

            {order.shipping_carrier && order.tracking_number && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-blue-700">
                <Truck className="h-3.5 w-3.5" />
                Enviado por {order.shipping_carrier} — Guía: {order.tracking_number}
              </p>
            )}

            {order.paymentProofUrl && (
              <a
                href={order.paymentProofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#1e4d6b] hover:text-[#0f7a5f]"
              >
                <FileText className="h-3.5 w-3.5" />
                Ver comprobante enviado
              </a>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-lg font-bold text-slate-800">USD {order.total_usd.toFixed(2)}</span>
              {CANCELABLE.includes(order.status) && !order.payment_method && (
                <button
                  type="button"
                  onClick={() => { setCancelingId(order.id); setReason(''); setError('') }}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Cancelar pedido
                </button>
              )}
            </div>

            {order.status === 'cancelado' && order.cancellation_reason && (
              <p className="mt-2 text-sm text-slate-400">Motivo: {order.cancellation_reason}</p>
            )}

            {isOpenOrder && (!order.payment_method || order.payment_status === 'rechazado') && (
              <PaymentProofForm orderId={order.id} />
            )}
            {isOpenOrder && order.payment_method && order.payment_status === 'pendiente' && (
              <p className="mt-3 text-sm text-slate-400">Tu comprobante está en revisión.</p>
            )}

            {cancelingId === order.id && (
              <div className="mt-4 rounded-lg border border-red-100 bg-red-50 p-3">
                <label className="mb-1.5 block text-xs font-medium text-slate-700">¿Por qué quieres cancelarlo?</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
                  placeholder="Ej: cambié de opinión, encontré un error en el pedido..."
                />
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCancel(order.id)}
                    disabled={submitting}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    {submitting ? 'Cancelando...' : 'Confirmar cancelación'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCancelingId(null)}
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
