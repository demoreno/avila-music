'use client'

import { useMemo, useState } from 'react'
import { Search, Trash2, Receipt } from 'lucide-react'
import { matchesSearch } from '@/lib/search'
import { createManualSale, type SaleChannel } from './actions'
import Thumbnail from '@/components/admin/Thumbnail'
import type { PaymentMethod } from '@/types/index'

interface ProductOption {
  id: string
  name: string
  price_usd: number
  price_ml_usd: number
  stock_total: number
  imageUrl: string | null
}

interface LineItem {
  productId: string
  name: string
  imageUrl: string | null
  stockAvailable: number
  unitPrice: string
  quantity: string
}

interface FacturacionClientProps {
  products: ProductOption[]
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const emptyNotes = ''

type ShippingTypeOption = 'gratis_ml' | 'cobro_destino' | 'otro'

export default function FacturacionClient({ products }: FacturacionClientProps) {
  const [query, setQuery] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [discountUsd, setDiscountUsd] = useState('0')
  const [channel, setChannel] = useState<SaleChannel | ''>('mercadolibre')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('efectivo_bs')
  const [shippingType, setShippingType] = useState<ShippingTypeOption | ''>('gratis_ml')
  const [shippingTypeOther, setShippingTypeOther] = useState('')
  const [saleDate, setSaleDate] = useState(todayIso())
  const [notes, setNotes] = useState(emptyNotes)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{
    itemCount: number
    totalRevenue: number
    totalGrossProfit: number
    totalShippingCost: number
  } | null>(null)

  const matches = useMemo(() => {
    if (!query.trim()) return []
    return products
      .filter((p) => matchesSearch(p.name, query))
      .filter((p) => p.stock_total > 0)
      .slice(0, 8)
  }, [query, products])

  const subtotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + (parseFloat(item.unitPrice) || 0) * (parseInt(item.quantity) || 0), 0),
    [lineItems]
  )

  const discount = Math.min(Math.max(parseFloat(discountUsd) || 0, 0), subtotal)
  const total = subtotal - discount

  const totalQty = useMemo(
    () => lineItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0),
    [lineItems]
  )

  const mlCommission = channel === 'mercadolibre' ? subtotal * 0.11 : 0
  const mlShipping = channel === 'mercadolibre' && shippingType === 'gratis_ml' ? totalQty * 1.30 : 0
  const netEstimate = total - mlCommission - mlShipping

  function getPrice(product: ProductOption): number {
    if (channel === 'mercadolibre' && product.price_ml_usd > 0) return product.price_ml_usd
    return product.price_usd
  }

  function addProduct(product: ProductOption) {
    setSuccess(null)
    setLineItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id)
      if (existing) {
        const nextQty = Math.min((parseInt(existing.quantity) || 0) + 1, product.stock_total)
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: String(nextQty) } : item
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          stockAvailable: product.stock_total,
          unitPrice: String(getPrice(product)),
          quantity: '1',
        },
      ]
    })
    setQuery('')
  }

  function handleChannelChange(newChannel: SaleChannel) {
    setChannel(newChannel)
    // Update prices for all existing line items based on new channel
    setLineItems((prev) =>
      prev.map((item) => {
        const product = products.find((p) => p.id === item.productId)
        if (!product) return item
        const price = newChannel === 'mercadolibre' && product.price_ml_usd > 0
          ? product.price_ml_usd
          : product.price_usd
        return { ...item, unitPrice: String(price) }
      })
    )
  }

  function updateLine(productId: string, patch: Partial<Pick<LineItem, 'unitPrice' | 'quantity'>>) {
    setLineItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, ...patch } : item)))
  }

  function removeLine(productId: string) {
    setLineItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  function resetForm() {
    setLineItems([])
    setDiscountUsd('0')
    setChannel('mercadolibre')
    setPaymentMethod('efectivo_bs')
    setShippingType('gratis_ml')
    setShippingTypeOther('')
    setSaleDate(todayIso())
    setNotes(emptyNotes)
  }

  async function handleSubmit() {
    setError('')
    setSuccess(null)

    if (lineItems.length === 0) {
      setError('Agregá al menos un producto.')
      return
    }
    if (!channel) {
      setError('Seleccioná el canal de la venta.')
      return
    }
    if (!paymentMethod) {
      setError('Seleccioná el método de pago.')
      return
    }
    if (!shippingType) {
      setError('Seleccioná el tipo de envío.')
      return
    }
    if (shippingType === 'otro' && !shippingTypeOther.trim()) {
      setError('Especificá el tipo de envío en el campo de texto.')
      return
    }
    for (const item of lineItems) {
      const qty = parseInt(item.quantity) || 0
      if (qty <= 0) {
        setError(`Cantidad inválida para "${item.name}".`)
        return
      }
      if (qty > item.stockAvailable) {
        setError(`"${item.name}" no tiene stock suficiente (disponible: ${item.stockAvailable}).`)
        return
      }
    }

    setSaving(true)
    try {
      const result = await createManualSale({
        saleDate,
        channel,
        paymentMethod,
        shippingType: shippingType === 'otro' ? shippingTypeOther.trim() : shippingType,
        discountUsd: discount,
        notes: notes.trim() || null,
        items: lineItems.map((item) => ({
          productId: item.productId,
          quantity: parseInt(item.quantity) || 0,
          unitPriceUsd: parseFloat(item.unitPrice) || 0,
        })),
      })
      setSuccess(result)
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la venta')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="mb-1 block text-sm font-medium text-slate-700">Buscar producto</label>
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
                    <span className="font-semibold text-slate-700">USD {product.price_usd.toFixed(2)}</span>
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
                      <th className="px-3 py-2 font-semibold text-slate-600">Precio unit.</th>
                      <th className="px-3 py-2 font-semibold text-slate-600">Cant.</th>
                      <th className="px-3 py-2 font-semibold text-slate-600">Subtotal</th>
                      <th className="px-3 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lineItems.map((item) => {
                      const lineTotal = (parseFloat(item.unitPrice) || 0) * (parseInt(item.quantity) || 0)
                      const overStock = (parseInt(item.quantity) || 0) > item.stockAvailable
                      return (
                        <tr key={item.productId}>
                          <td className="px-3 py-2 align-top">
                            <div className="flex items-center gap-2.5">
                              <Thumbnail imageUrl={item.imageUrl} name={item.name} />
                              <div>
                                <p className="font-medium text-slate-800">{item.name}</p>
                                <p className="text-[11px] text-slate-400">Disponibles: {item.stockAvailable}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2 align-top">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) => updateLine(item.productId, { unitPrice: e.target.value })}
                              className="w-24 rounded-lg border border-slate-300 px-2 py-1 text-sm focus:border-amber-400 focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-2 align-top">
                            <input
                              type="number"
                              min="1"
                              max={item.stockAvailable}
                              value={item.quantity}
                              onChange={(e) => updateLine(item.productId, { quantity: e.target.value })}
                              className={`w-20 rounded-lg border px-2 py-1 text-sm focus:outline-none ${
                                overStock ? 'border-red-400 focus:border-red-400' : 'border-slate-300 focus:border-amber-400'
                              }`}
                            />
                          </td>
                          <td className="px-3 py-2 font-semibold text-slate-700">USD {lineTotal.toFixed(2)}</td>
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
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
            <Receipt className="h-5 w-5 text-amber-500" />
            Resumen
          </h2>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Fecha</label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Canal</label>
              <div className="flex gap-3">
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === 'directo'}
                    onChange={() => handleChannelChange('directo')}
                  />
                  Directo
                </label>
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === 'mercadolibre'}
                    onChange={() => handleChannelChange('mercadolibre')}
                  />
                  MercadoLibre
                </label>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Método de pago</label>
              <div className="flex gap-3">
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'efectivo_usd'}
                    onChange={() => setPaymentMethod('efectivo_usd')}
                  />
                  Dólares
                </label>
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'efectivo_bs'}
                    onChange={() => setPaymentMethod('efectivo_bs')}
                  />
                  Bolívares
                </label>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Tipo de envío</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="shipping_type"
                    checked={shippingType === 'gratis_ml'}
                    onChange={() => setShippingType('gratis_ml')}
                  />
                  Gratis ML
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="shipping_type"
                    checked={shippingType === 'cobro_destino'}
                    onChange={() => setShippingType('cobro_destino')}
                  />
                  Cobro destino / Delivery
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="shipping_type"
                    checked={shippingType === 'otro'}
                    onChange={() => setShippingType('otro')}
                  />
                  Otro
                </label>
                {shippingType === 'otro' && (
                  <input
                    type="text"
                    value={shippingTypeOther}
                    onChange={(e) => setShippingTypeOther(e.target.value)}
                    placeholder="Especificá el tipo de envío..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Descuento (USD)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={discountUsd}
                onChange={(e) => setDiscountUsd(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Notas</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1 border-t border-slate-100 pt-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>USD {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Descuento</span>
                <span>- USD {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>USD {total.toFixed(2)}</span>
              </div>
              {channel === 'mercadolibre' && (
                <div className="mt-2 space-y-1 border-t border-dashed border-slate-200 pt-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Costos ML estimados</p>
                  <div className="flex justify-between text-slate-500">
                    <span>Comisión (11%)</span>
                    <span>- USD {mlCommission.toFixed(2)}</span>
                  </div>
                  {shippingType === 'gratis_ml' && (
                    <div className="flex justify-between text-slate-500">
                      <span>Envío ({totalQty} × $1.30)</span>
                      <span>- USD {mlShipping.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>Ingreso neto estimado</span>
                    <span>USD {netEstimate.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            {success && (
              <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                Venta registrada — {success.itemCount} unidad(es), ingreso USD {success.totalRevenue.toFixed(2)}, ganancia
                bruta USD {success.totalGrossProfit.toFixed(2)}.
                {success.totalShippingCost > 0 && (
                  <> Costo de envío absorbido: USD {success.totalShippingCost.toFixed(2)}.</>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || lineItems.length === 0}
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
            >
              {saving ? 'Registrando...' : 'Registrar venta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
