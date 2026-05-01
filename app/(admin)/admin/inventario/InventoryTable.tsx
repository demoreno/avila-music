'use client'

import { useState } from 'react'
import type { Product } from '@/types/index'

interface InventoryProduct extends Pick<Product, 'id' | 'name' | 'stock_total' | 'stock_minimum'> {
  subcategory_name: string
}

interface InventoryTableProps {
  products: InventoryProduct[]
}

type Filter = 'todos' | 'critico' | 'ok'

async function saveStock(id: string, stock: number) {
  const response = await fetch('/api/admin/stock', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, stock_total: stock }),
  })
  if (!response.ok) throw new Error('Error al actualizar stock')
}

export default function InventoryTable({ products }: InventoryTableProps) {
  const [filter, setFilter] = useState<Filter>('todos')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [localProducts, setLocalProducts] = useState(products)

  const filtered = localProducts.filter((p) => {
    if (filter === 'critico') return p.stock_total <= p.stock_minimum
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

  const criticalCount = localProducts.filter((p) => p.stock_total <= p.stock_minimum).length

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden">
          {(['todos', 'critico', 'ok'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f === 'todos' && `Todos (${localProducts.length})`}
              {f === 'critico' && `Stock crítico (${criticalCount})`}
              {f === 'ok' && `OK (${localProducts.length - criticalCount})`}
            </button>
          ))}
        </div>
        <button
          onClick={exportCsv}
          className="ml-auto rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Exportar CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left">
            <tr>
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

              return (
                <tr key={p.id} className={`hover:bg-slate-50 ${isEmpty ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
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
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
