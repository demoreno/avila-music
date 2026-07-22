'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Trash2, Copy, Check } from 'lucide-react'
import { matchesSearch } from '@/lib/search'
import Thumbnail from '@/components/admin/Thumbnail'
import { savePurchaseOrder, deletePurchaseOrder } from '@/app/(admin)/admin/(dashboard)/pedidos/actions'

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
  orderId?: string
}

/** For now: minimum stock × 2. Placeholder until real sales-velocity forecasting exists. */
export function suggestedQuantity(product: Pick<PedidoProductOption, 'stock_minimum'>): number {
  return Math.max(product.stock_minimum * 2, 1)
}

export default function PedidoBuilder({ products, initialItems, initialNotes, orderId }: PedidoBuilderProps) {
  const router = useRouter()
  const productById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products])

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
                              onChange={(e) => updateQuantity(item.productId, e.target.value)}
                              className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm focus:border-amber-400 focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-2 text-slate-500">USD {item.cost_usd.toFixed(2)}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">USD {subtotal.toFixed(2)}</td>
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              onClick={() => removeLine(item.productId)}
                              className="text-slate-400 hover:text-red-600"
                              aria-label={`Quitar ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
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
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Notas</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notas internas del pedido..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-between border-t border-slate-100 pt-3 text-lg font-bold text-slate-900">
              <span>Total estimado</span>
              <span>USD {total.toFixed(2)}</span>
            </div>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || lineItems.length === 0}
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
            >
              {saving ? 'Guardando...' : orderId ? 'Guardar cambios' : 'Crear pedido'}
            </button>

            {orderId && (
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
    </div>
  )
}
