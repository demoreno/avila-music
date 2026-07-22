'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Trash2, Copy, Check } from 'lucide-react'
import { matchesSearch } from '@/lib/search'
import Thumbnail from '@/components/admin/Thumbnail'
import {
  savePurchaseOrder,
  deletePurchaseOrder,
  updatePurchaseOrderStatus,
} from '@/app/(admin)/admin/(dashboard)/pedidos/actions'
import { STATUS_OPTIONS } from '@/lib/purchase-order-status'
import type { PurchaseOrderStatus } from '@/types/index'

export interface PedidoProductOption {
  id: string
  name: string
  cost_usd: number
  supplier_code: string | null
  stock_total: number
  stock_minimum: number
  imageUrl: string | null
}

interface PedidoLineItem {
  productId: string
  name: string
  supplier_code: string | null
  imageUrl: string | null
  cost_usd: number
  quantity: string
}

interface PedidoBuilderProps {
  products: PedidoProductOption[]
  initialItems: { productId: string; quantity: number }[]
  initialNotes?: string
  initialStatus?: PurchaseOrderStatus
  initialEstimatedArrivalDate?: string | null
  orderId?: string
}

/** For now: minimum stock × 2. Placeholder until real sales-velocity forecasting exists. */
export function suggestedQuantity(product: Pick<PedidoProductOption, 'stock_minimum'>): number {
  return Math.max(product.stock_minimum * 2, 1)
}

export default function PedidoBuilder({
  products,
  initialItems,
  initialNotes,
  initialStatus,
  initialEstimatedArrivalDate,
  orderId,
}: PedidoBuilderProps) {
  const router = useRouter()
  const productById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products])
  const [status, setStatus] = useState<PurchaseOrderStatus>(initialStatus ?? 'pendiente')
  const [changingStatus, setChangingStatus] = useState(false)
  const [estimatedArrivalDate, setEstimatedArrivalDate] = useState(initialEstimatedArrivalDate ?? '')
  const [arrivalPrompt, setArrivalPrompt] = useState<{ nextStatus: PurchaseOrderStatus; date: string } | null>(null)
  const isLocked = status === 'recibido'

  const [query, setQuery] = useState('')
  const [lineItems, setLineItems] = useState<PedidoLineItem[]>(() =>
    initialItems
      .map((item) => {
        const product = productById.get(item.productId)
        if (!product) return null
        return {
          productId: product.id,
          name: product.name,
          supplier_code: product.supplier_code,
          imageUrl: product.imageUrl,
          cost_usd: product.cost_usd,
          quantity: String(item.quantity),
        }
      })
      .filter((item): item is PedidoLineItem => item !== null)
  )
  const [notes, setNotes] = useState(initialNotes ?? '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const selectedIds = new Set(lineItems.map((i) => i.productId))
    return products
      .filter((p) => !selectedIds.has(p.id))
      .filter((p) => matchesSearch(p.name, query))
      .slice(0, 8)
  }, [query, products, lineItems])

  const total = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.cost_usd * (parseInt(item.quantity) || 0), 0),
    [lineItems]
  )

  const copyText = useMemo(
    () =>
      lineItems
        .map((item) => `${item.supplier_code?.trim() || item.name} x${parseInt(item.quantity) || 0}`)
        .join('\n'),
    [lineItems]
  )

  function addProduct(product: PedidoProductOption) {
    setLineItems((prev) => [
      ...prev,
      {
        productId: product.id,
        name: product.name,
        supplier_code: product.supplier_code,
        imageUrl: product.imageUrl,
        cost_usd: product.cost_usd,
        quantity: String(suggestedQuantity(product)),
      },
    ])
    setQuery('')
  }

  function updateQuantity(productId: string, quantity: string) {
    setLineItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  function removeLine(productId: string) {
    setLineItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(copyText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  async function handleSave() {
    setError('')
    if (lineItems.length === 0) {
      setError('Agregá al menos un producto.')
      return
    }
    for (const item of lineItems) {
      if ((parseInt(item.quantity) || 0) <= 0) {
        setError(`Cantidad inválida para "${item.name}".`)
        return
      }
    }

    setSaving(true)
    try {
      const savedId = await savePurchaseOrder({
        orderId,
        notes: notes.trim() || null,
        estimatedArrivalDate: estimatedArrivalDate || null,
        items: lineItems.map((item) => ({ productId: item.productId, quantity: parseInt(item.quantity) || 0 })),
      })
      if (!orderId) router.push(`/admin/pedidos/${savedId}`)
      else router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el pedido')
    } finally {
      setSaving(false)
    }
  }

  async function handleStatusChange(nextStatus: PurchaseOrderStatus) {
    if (!orderId) return
    if (nextStatus === 'recibido') {
      const ok = confirm(
        'Al marcarlo como recibido se va a sumar la cantidad de cada producto al stock automáticamente, y el pedido queda bloqueado para editar. ¿Confirmás?'
      )
      if (!ok) return
    }
    if (nextStatus === 'en_camino' && !estimatedArrivalDate) {
      setArrivalPrompt({ nextStatus, date: '' })
      return
    }
    await applyStatusChange(nextStatus)
  }

  async function applyStatusChange(nextStatus: PurchaseOrderStatus, dateOverride?: string) {
    if (!orderId) return
    setError('')
    setChangingStatus(true)
    try {
      await updatePurchaseOrderStatus(orderId, nextStatus, dateOverride || undefined)
      setStatus(nextStatus)
      if (dateOverride) setEstimatedArrivalDate(dateOverride)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar el estado')
    } finally {
      setChangingStatus(false)
    }
  }

  async function confirmArrivalPrompt() {
    if (!arrivalPrompt) return
    if (!arrivalPrompt.date) return
    const { nextStatus, date } = arrivalPrompt
    setArrivalPrompt(null)
    await applyStatusChange(nextStatus, date)
  }

  async function handleDelete() {
    if (!orderId) return
    if (!confirm('¿Eliminar este pedido? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    try {
      await deletePurchaseOrder(orderId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el pedido')
      setDeleting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          {isLocked && (
            <div className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              Este pedido ya fue recibido — el stock se actualizó y quedó bloqueado para editar.
            </div>
          )}

          {!isLocked && (
            <>
              <label className="mb-1 block text-sm font-medium text-slate-700">Agregar producto</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nombre del producto..."
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              {matches.length > 0 && (
                <div className="mt-2 divide-y divide-slate-100 rounded-lg border border-slate-200">
                  {matches.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => addProduct(product)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-slate-50"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Thumbnail imageUrl={product.imageUrl} name={product.name} />
                        <span className="truncate font-medium text-slate-800">{product.name}</span>
                      </span>
                      <span className="flex flex-shrink-0 items-center gap-3 text-xs text-slate-500">
                        <span>Stock: {product.stock_total}</span>
                        <span className="font-semibold text-slate-700">USD {product.cost_usd.toFixed(2)}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="mt-5">
            {lineItems.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 py-8 text-center text-sm text-slate-400">
                Todavía no agregaste productos.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-left">
                    <tr>
                      <th className="px-3 py-2 font-semibold text-slate-600">Producto</th>
                      <th className="px-3 py-2 font-semibold text-slate-600">Proveedor</th>
                      <th className="px-3 py-2 font-semibold text-slate-600">Cant.</th>
                      <th className="px-3 py-2 font-semibold text-slate-600">Costo unit.</th>
                      <th className="px-3 py-2 font-semibold text-slate-600">Subtotal</th>
                      <th className="px-3 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lineItems.map((item) => {
                      const qty = parseInt(item.quantity) || 0
                      const subtotal = item.cost_usd * qty
                      return (
                        <tr key={item.productId}>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2.5">
                              <Thumbnail imageUrl={item.imageUrl} name={item.name} />
                              <span className="font-medium text-slate-800">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-slate-500">
                            {item.supplier_code || <span className="italic text-slate-300">sin código</span>}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              disabled={isLocked}
                              onChange={(e) => updateQuantity(item.productId, e.target.value)}
                              className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm focus:border-amber-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                            />
                          </td>
                          <td className="px-3 py-2 text-slate-500">USD {item.cost_usd.toFixed(2)}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">USD {subtotal.toFixed(2)}</td>
                          <td className="px-3 py-2">
                            {!isLocked && (
                              <button
                                type="button"
                                onClick={() => removeLine(item.productId)}
                                className="text-slate-400 hover:text-red-600"
                                aria-label={`Quitar ${item.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {lineItems.length > 0 && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Texto para el proveedor</h2>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <textarea
              readOnly
              rows={Math.min(lineItems.length, 10)}
              value={copyText}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700"
            />
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-slate-900">Resumen</h2>

          <div className="space-y-3">
            {orderId && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Estado</label>
                <select
                  value={status}
                  disabled={isLocked || changingStatus}
                  onChange={(e) => handleStatusChange(e.target.value as PurchaseOrderStatus)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none disabled:bg-slate-50"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_OPTIONS.find((o) => o.value === status)?.badgeClass}`}>
                  {STATUS_OPTIONS.find((o) => o.value === status)?.label}
                </span>
              </div>
            )}

            {orderId && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Fecha estimada de llegada</label>
                <input
                  type="date"
                  value={estimatedArrivalDate}
                  disabled={isLocked}
                  onChange={(e) => setEstimatedArrivalDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Notas</label>
              <textarea
                rows={3}
                value={notes}
                disabled={isLocked}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notas internas del pedido..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>

            <div className="flex justify-between border-t border-slate-100 pt-3 text-lg font-bold text-slate-900">
              <span>Total estimado</span>
              <span>USD {total.toFixed(2)}</span>
            </div>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            {!isLocked && (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || lineItems.length === 0}
                className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
              >
                {saving ? 'Guardando...' : orderId ? 'Guardar cambios' : 'Crear pedido'}
              </button>
            )}

            {orderId && !isLocked && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="w-full rounded-lg border border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                {deleting ? 'Eliminando...' : 'Eliminar pedido'}
              </button>
            )}
          </div>
        </div>
      </div>

      {arrivalPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-base font-bold text-slate-900">Fecha estimada de llegada</h3>
            <p className="mb-4 text-sm text-slate-500">
              Antes de marcarlo &ldquo;En camino&rdquo;, indicá cuándo esperás que llegue el pedido.
            </p>
            <input
              type="date"
              autoFocus
              value={arrivalPrompt.date}
              onChange={(e) => setArrivalPrompt({ ...arrivalPrompt, date: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
            />
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setArrivalPrompt(null)}
                className="flex-1 rounded-lg border border-slate-300 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmArrivalPrompt}
                disabled={!arrivalPrompt.date}
                className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
