'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ClipboardList, PackageCheck } from 'lucide-react'
import type { Product } from '@/types/index'
import PedidoBuilder, { suggestedQuantity, type PedidoProductOption } from '@/components/admin/PedidoBuilder'
import ReorderTab, { type ReorderRow } from './ReorderTab'

interface InventoryProduct
  extends Pick<Product, 'id' | 'name' | 'stock_total' | 'stock_minimum' | 'cost_usd' | 'supplier_code'> {
  subcategory_name: string
  imageUrl: string | null
  pendingOrder: { qty: number; orderIds: string[] } | null
}

interface InventoryTableProps {
  products: InventoryProduct[]
  reorderData: ReorderRow[]
}

type Filter = 'todos' | 'agotado' | 'critico' | 'ok' | 'reposicion'

async function saveStock(id: string, stock: number) {
  const response = await fetch('/api/admin/stock', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, stock_total: stock }),
  })
  if (!response.ok) throw new Error('Error al actualizar stock')
}

export default function InventoryTable({ products, reorderData }: InventoryTableProps) {
  const [filter, setFilter] = useState<Filter>('todos')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [localProducts, setLocalProducts] = useState(products)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = localProducts.filter((p) => {
    if (filter === 'agotado') return p.stock_total === 0
    if (filter === 'critico') return p.stock_total > 0 && p.stock_total <= p.stock_minimum
    if (filter === 'ok') return p.stock_total > p.stock_minimum
    return true
  })

  function startEdit(p: InventoryProduct) {
    setEditingId(p.id)
    setEditValue(String(p.stock_total))
  }

  async function commitEdit(id: string) {
    const newStock = parseInt(editValue)
    if (isNaN(newStock) || newStock < 0) {
      setEditingId(null)
      return
    }
    setSaving(true)
    try {
      await saveStock(id, newStock)
      setLocalProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock_total: newStock } : p))
      )
    } catch {
      alert('Error al guardar el stock')
    } finally {
      setSaving(false)
      setEditingId(null)
    }
  }

  function exportCsv() {
    const headers = ['Nombre', 'Subcategoría', 'Stock', 'Mínimo', 'Estado']
    const rows = filtered.map((p) => [
      `"${p.name}"`,
      `"${p.subcategory_name}"`,
      p.stock_total,
      p.stock_minimum,
      p.stock_total === 0 ? 'Sin stock' : p.stock_total <= p.stock_minimum ? 'Crítico' : 'OK',
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inventario-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAllFiltered() {
    const allSelected = filtered.every((p) => selected.has(p.id))
    setSelected((prev) => {
      const next = new Set(prev)
      if (allSelected) filtered.forEach((p) => next.delete(p.id))
      else filtered.forEach((p) => next.add(p.id))
      return next
    })
  }

  const agotadoCount = localProducts.filter((p) => p.stock_total === 0).length
  const criticalCount = localProducts.filter((p) => p.stock_total > 0 && p.stock_total <= p.stock_minimum).length
  const okCount = localProducts.length - agotadoCount - criticalCount
  // Igual que ReorderTab.isUrgent: bajo de stock Y todavía sin cubrir con un pedido en camino.
  const reorderNeedCount = reorderData.filter(
    (r) =>
      (r.urgency === 'sin_stock_vende' || r.urgency === 'critico' || r.urgency === 'pedir_pronto') &&
      r.suggested_order_qty > 0
  ).length
  const productById = new Map(localProducts.map((p) => [p.id, p]))
  const pedidoProducts: PedidoProductOption[] = localProducts.map((p) => ({
    id: p.id,
    name: p.name,
    cost_usd: p.cost_usd,
    supplier_code: p.supplier_code,
    stock_total: p.stock_total,
    stock_minimum: p.stock_minimum,
    imageUrl: p.imageUrl,
  }))
  const initialItems = Array.from(selected)
    .map((id) => productById.get(id))
    .filter((p): p is InventoryProduct => p !== undefined)
    .map((p) => ({ productId: p.id, quantity: suggestedQuantity(p) }))

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden">
          {(['todos', 'agotado', 'critico', 'ok', 'reposicion'] as Filter[]).map((f) => {
            const activeClass =
              f === 'agotado'
                ? 'bg-red-500 text-white'
                : f === 'critico'
                ? 'bg-amber-500 text-white'
                : f === 'ok'
                ? 'bg-green-500 text-white'
                : f === 'reposicion'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-white'
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f ? activeClass : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f === 'todos' && `Todos (${localProducts.length})`}
                {f === 'agotado' && `Agotado (${agotadoCount})`}
                {f === 'critico' && `Stock crítico (${criticalCount})`}
                {f === 'ok' && `OK (${okCount})`}
                {f === 'reposicion' && `Reposición (${reorderNeedCount})`}
              </button>
            )
          })}
        </div>
        {filter !== 'reposicion' && (
          <button
            onClick={exportCsv}
            className="ml-auto rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Exportar CSV
          </button>
        )}
      </div>

      {filter === 'reposicion' ? (
        <ReorderTab data={reorderData} pedidoProducts={pedidoProducts} />
      ) : (
      <>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && filtered.every((p) => selected.has(p.id))}
                  onChange={toggleSelectAllFiltered}
                  className="rounded"
                  aria-label="Seleccionar todos"
                />
              </th>
              <th className="px-4 py-3 font-semibold text-slate-600">Producto</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Subcategoría</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Stock</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Mínimo</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => {
              const isCritical = p.stock_total <= p.stock_minimum && p.stock_total > 0
              const isEmpty = p.stock_total === 0
              // "OK" pero a menos de 50% por encima del mínimo — un aviso temprano
              // antes de que caiga a Crítico, para no descubrirlo tarde.
              const isApproachingMin = !isEmpty && !isCritical && p.stock_minimum > 0 && p.stock_total <= p.stock_minimum * 1.5

              return (
                <tr key={p.id} className={`hover:bg-slate-50 ${isEmpty ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggleSelected(p.id)}
                      className="rounded"
                      aria-label={`Seleccionar ${p.name}`}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    <div className="flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.pendingOrder && (
                        <Link
                          href={
                            p.pendingOrder.orderIds.length === 1
                              ? `/admin/pedidos/${p.pendingOrder.orderIds[0]}`
                              : '/admin/pedidos'
                          }
                          title={`Ya incluido en ${p.pendingOrder.orderIds.length} pedido(s) — ${p.pendingOrder.qty} unidad(es) en camino`}
                          className="flex flex-shrink-0 items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700 hover:bg-blue-200"
                        >
                          <PackageCheck className="h-3 w-3" />
                          En pedido ({p.pendingOrder.qty})
                        </Link>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.subcategory_name}</td>
                  <td className="px-4 py-3">
                    {editingId === p.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitEdit(p.id)
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                          autoFocus
                          className="w-20 rounded border border-amber-400 px-2 py-1 text-sm focus:outline-none"
                        />
                        <button
                          onClick={() => commitEdit(p.id)}
                          disabled={saving}
                          className="text-green-600 hover:text-green-700 text-xs font-medium"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(p)}
                        className={`font-semibold hover:underline ${
                          isEmpty
                            ? 'text-red-600'
                            : isCritical
                            ? 'text-amber-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {p.stock_total}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.stock_minimum}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isEmpty
                          ? 'bg-red-100 text-red-700'
                          : isCritical
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {isEmpty ? 'Sin stock' : isCritical ? 'Crítico' : 'OK'}
                    </span>
                    {isApproachingMin && (
                      <span
                        title="Todavía OK, pero se está acercando al stock mínimo"
                        className="ml-1.5 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600"
                      >
                        Acercándose al mínimo
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selected.size > 0 && (
        <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
          <div className="flex items-center gap-4 rounded-full bg-slate-900 px-6 py-3 shadow-2xl">
            <span className="text-sm font-medium text-white">
              {selected.size} producto{selected.size === 1 ? '' : 's'} seleccionado{selected.size === 1 ? '' : 's'}
            </span>
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-600"
            >
              <ClipboardList className="h-4 w-4" />
              Crear pedido
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-slate-400 hover:text-white"
              aria-label="Cancelar selección"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl bg-slate-50 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="heading-serif text-xl font-bold text-slate-900">Nuevo pedido</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-700"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <PedidoBuilder products={pedidoProducts} initialItems={initialItems} />
          </div>
        </div>
      )}
      </>
      )}
    </div>
  )
}
