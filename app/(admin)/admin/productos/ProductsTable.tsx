'use client'

import { useState } from 'react'
import { updateProduct, createProduct } from './actions'
import type { Product, CategoryTree } from '@/types/index'

interface ProductWithCategory extends Product {
  subcategory_name: string
  category_name: string
}

interface ProductsTableProps {
  products: ProductWithCategory[]
  subcategories: CategoryTree[]
}

interface FormData {
  name: string
  subcategory_id: string
  price_usd: string
  cost_usd: string
  stock_total: string
  stock_minimum: string
  notes: string
  is_active: boolean
}

const emptyForm: FormData = {
  name: '',
  subcategory_id: '',
  price_usd: '',
  cost_usd: '',
  stock_total: '0',
  stock_minimum: '0',
  notes: '',
  is_active: true,
}

export default function ProductsTable({ products, subcategories }: ProductsTableProps) {
  const [editing, setEditing] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function startEdit(product: ProductWithCategory) {
    setEditing(product.id)
    setFormData({
      name: product.name,
      subcategory_id: product.subcategory_id,
      price_usd: String(product.price_usd),
      cost_usd: String(product.cost_usd),
      stock_total: String(product.stock_total),
      stock_minimum: String(product.stock_minimum),
      notes: product.notes ?? '',
      is_active: product.is_active,
    })
    setError('')
  }

  function startCreate() {
    setCreating(true)
    setFormData(emptyForm)
    setError('')
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const data = {
        name: formData.name,
        price_usd: parseFloat(formData.price_usd),
        cost_usd: parseFloat(formData.cost_usd),
        stock_total: parseInt(formData.stock_total),
        stock_minimum: parseInt(formData.stock_minimum),
        notes: formData.notes.trim() || null,
        is_active: formData.is_active,
      }
      if (editing) {
        await updateProduct(editing, data)
        setEditing(null)
      } else {
        await createProduct({ ...data, subcategory_id: formData.subcategory_id })
        setCreating(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const showModal = editing !== null || creating

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={startCreate}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          + Nuevo producto
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-600">Nombre</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Categoría</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Precio</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Costo</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Stock</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="max-w-[200px] truncate px-4 py-3 font-medium text-slate-800">
                  {p.name}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  <span className="text-xs">{p.category_name}</span>
                  <br />
                  <span>{p.subcategory_name}</span>
                </td>
                <td className="px-4 py-3 text-slate-700">USD {Number(p.price_usd).toFixed(2)}</td>
                <td className="px-4 py-3 text-slate-500">USD {Number(p.cost_usd).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold ${
                      p.stock_total === 0
                        ? 'text-red-600'
                        : p.stock_total <= p.stock_minimum
                        ? 'text-amber-600'
                        : 'text-slate-700'
                    }`}
                  >
                    {p.stock_total}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {p.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-amber-600 hover:text-amber-700 text-xs font-medium"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
              {editing ? 'Editar producto' : 'Nuevo producto'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              {creating && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Subcategoría</label>
                  <select
                    value={formData.subcategory_id}
                    onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  >
                    <option value="">Seleccionar subcategoría</option>
                    {subcategories.map((sub) => (
                      <option key={sub.subcategory_id} value={sub.subcategory_id}>
                        {sub.category_name} → {sub.subcategory_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Precio USD</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_usd}
                    onChange={(e) => setFormData({ ...formData, price_usd: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Costo USD</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost_usd}
                    onChange={(e) => setFormData({ ...formData, cost_usd: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Stock total</label>
                  <input
                    type="number"
                    value={formData.stock_total}
                    onChange={(e) => setFormData({ ...formData, stock_total: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Stock mínimo</label>
                  <input
                    type="number"
                    value={formData.stock_minimum}
                    onChange={(e) => setFormData({ ...formData, stock_minimum: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Notas</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded"
                />
                Producto activo (visible en tienda)
              </label>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setEditing(null)
                  setCreating(false)
                }}
                className="flex-1 rounded-lg border border-slate-300 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
