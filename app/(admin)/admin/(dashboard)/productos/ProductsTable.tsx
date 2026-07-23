'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { updateProduct, createProduct, uploadProductImages, deleteProductImage } from './actions'
import { getPublicImageUrl } from '@/lib/catalog/image-url'
import type { Product, CategoryTree, ProductImage } from '@/types/index'

interface ProductWithCategory extends Product {
  subcategory_name: string
  category_name: string
}

interface ProductsTableProps {
  products: ProductWithCategory[]
  subcategories: CategoryTree[]
  imagesByProduct: Record<string, ProductImage[]>
}

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
      <span>
        <span className="block text-sm font-medium text-slate-700">{label}</span>
        {description && <span className="block text-xs text-slate-400">{description}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
          checked ? 'bg-amber-500' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  )
}

interface FormData {
  name: string
  subcategory_id: string
  price_usd: string
  price_ml_usd: string
  cost_usd: string
  stock_total: string
  stock_minimum: string
  notes: string
  description: string
  is_active: boolean
  featured: boolean
  new_arrival: boolean
  supplier_code: string
}

const emptyForm: FormData = {
  name: '',
  subcategory_id: '',
  price_usd: '',
  price_ml_usd: '0',
  cost_usd: '',
  stock_total: '0',
  stock_minimum: '0',
  notes: '',
  description: '',
  is_active: true,
  featured: false,
  new_arrival: false,
  supplier_code: '',
}

export default function ProductsTable({ products, subcategories, imagesByProduct }: ProductsTableProps) {
  const [editing, setEditing] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [existingImages, setExistingImages] = useState<ProductImage[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null)

  const newFilePreviews = useMemo(() => newFiles.map((file) => URL.createObjectURL(file)), [newFiles])

  useEffect(() => {
    return () => newFilePreviews.forEach((url) => URL.revokeObjectURL(url))
  }, [newFilePreviews])

  function removeNewFile(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function startEdit(product: ProductWithCategory) {
    setEditing(product.id)
    setFormData({
      name: product.name,
      subcategory_id: product.subcategory_id,
      price_usd: String(product.price_usd),
      price_ml_usd: String(product.price_ml_usd),
      cost_usd: String(product.cost_usd),
      stock_total: String(product.stock_total),
      stock_minimum: String(product.stock_minimum),
      notes: product.notes ?? '',
      description: product.description ?? '',
      is_active: product.is_active,
      featured: product.featured,
      new_arrival: product.new_arrival,
      supplier_code: product.supplier_code ?? '',
    })
    setExistingImages(imagesByProduct[product.id] ?? [])
    setNewFiles([])
    setError('')
  }

  function startCreate() {
    setCreating(true)
    setFormData(emptyForm)
    setExistingImages([])
    setNewFiles([])
    setError('')
  }

  async function startCreateSimilar(product: ProductWithCategory) {
    setCreating(true)
    setEditing(null)
    setFormData({
      name: `${product.name} (copia)`,
      subcategory_id: product.subcategory_id,
      price_usd: String(product.price_usd),
      price_ml_usd: String(product.price_ml_usd),
      cost_usd: String(product.cost_usd),
      stock_total: String(product.stock_total),
      stock_minimum: String(product.stock_minimum),
      notes: product.notes ?? '',
      description: product.description ?? '',
      is_active: product.is_active,
      featured: product.featured,
      new_arrival: product.new_arrival,
      supplier_code: product.supplier_code ?? '',
    })
    setExistingImages([])
    setNewFiles([])
    setError('')

    const sourceImages = imagesByProduct[product.id] ?? []
    if (sourceImages.length === 0) return

    try {
      const files = await Promise.all(
        sourceImages.map(async (img, index) => {
          const response = await fetch(getPublicImageUrl(img.storage_path))
          const blob = await response.blob()
          const ext = img.storage_path.split('.').pop() ?? 'jpg'
          return new File([blob], `imagen-${index + 1}.${ext}`, { type: blob.type })
        })
      )
      setNewFiles(files)
    } catch {
      // Imágenes originales no se pudieron copiar — el admin puede subirlas de nuevo a mano.
    }
  }

  async function handleDeleteImage(imageId: string) {
    setDeletingImageId(imageId)
    setError('')
    try {
      await deleteProductImage(imageId)
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la imagen')
    } finally {
      setDeletingImageId(null)
    }
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const data = {
        name: formData.name,
        price_usd: parseFloat(formData.price_usd),
        price_ml_usd: parseFloat(formData.price_ml_usd) || 0,
        cost_usd: parseFloat(formData.cost_usd),
        stock_total: parseInt(formData.stock_total),
        stock_minimum: parseInt(formData.stock_minimum),
        notes: formData.notes.trim() || null,
        description: formData.description.trim() || null,
        is_active: formData.is_active,
        featured: formData.featured,
        new_arrival: formData.new_arrival,
        supplier_code: formData.supplier_code.trim() || null,
      }

      let productId: string
      if (editing) {
        await updateProduct(editing, data)
        productId = editing
      } else {
        productId = await createProduct({ ...data, subcategory_id: formData.subcategory_id })
      }

      if (newFiles.length > 0) {
        const uploadData = new FormData()
        for (const file of newFiles) uploadData.append('images', file)
        await uploadProductImages(productId, uploadData)
      }

      setEditing(null)
      setCreating(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const showModal = editing !== null || creating

  function closeModal() {
    setEditing(null)
    setCreating(false)
  }

  useEffect(() => {
    if (!showModal) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault()
        handleSave()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

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
              <th className="px-4 py-3 font-semibold text-slate-600">Precio ML</th>
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
                <td className="px-4 py-3 text-slate-700">{Number(p.price_ml_usd) > 0 ? `USD ${Number(p.price_ml_usd).toFixed(2)}` : <span className="text-slate-400">—</span>}</td>
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
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-amber-600 hover:text-amber-700 text-xs font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => startCreateSimilar(p)}
                      className="text-slate-500 hover:text-slate-700 text-xs font-medium"
                    >
                      Crear similar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-xl">
            <h2 className="border-b border-slate-100 px-6 py-4 text-lg font-bold text-slate-900">
              {editing ? 'Editar producto' : 'Nuevo producto'}
            </h2>

            <div className="overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {creating && (
                  <div className="md:col-span-2">
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

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Precio USD (página)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_usd}
                    onChange={(e) => setFormData({ ...formData, price_usd: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Precio ML (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_ml_usd}
                    onChange={(e) => setFormData({ ...formData, price_ml_usd: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {formData.price_usd && parseFloat(formData.price_usd) > 0 && (
                    <p className="mt-1 text-xs text-slate-400">
                      Sugerido: USD {((parseFloat(formData.price_usd) + 1.30) / (1 - 0.11)).toFixed(2)}
                    </p>
                  )}
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
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Código/nombre proveedor</label>
                  <input
                    type="text"
                    value={formData.supplier_code}
                    onChange={(e) => setFormData({ ...formData, supplier_code: e.target.value })}
                    placeholder="Como lo identifica el proveedor"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Notas internas</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Imágenes</label>

                  {existingImages.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-3">
                      {existingImages.map((img) => (
                        <div key={img.id} className="relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200">
                          <Image
                            src={getPublicImageUrl(img.storage_path)}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                          {img.is_primary && (
                            <span className="absolute left-0 top-0 rounded-br bg-amber-500 px-1 text-[10px] font-semibold text-white">
                              Principal
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(img.id)}
                            disabled={deletingImageId === img.id}
                            className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-bl bg-red-600 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-60"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setNewFiles(Array.from(e.target.files ?? []))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {newFiles.length > 0 && (
                    <>
                      <p className="mb-2 mt-2 text-xs text-slate-500">
                        Se subirán al guardar — haz clic en la × para sacar alguna antes:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {newFilePreviews.map((url, index) => (
                          <div key={url} className="relative h-20 w-20 overflow-hidden rounded-lg border border-dashed border-amber-400">
                            {/* eslint-disable-next-line @next/next/no-img-element -- local blob: URL, next/image can't optimize it */}
                            <img src={url} alt="" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeNewFile(index)}
                              className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-bl bg-red-600 text-xs font-bold text-white hover:bg-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <Toggle
                  label="Producto activo"
                  description="Visible en la tienda"
                  checked={formData.is_active}
                  onChange={(v) => setFormData({ ...formData, is_active: v })}
                />
                <Toggle
                  label="Destacado"
                  description="Aparece en productos destacados"
                  checked={formData.featured}
                  onChange={(v) => setFormData({ ...formData, featured: v })}
                />
                <Toggle
                  label="Nuevo"
                  description="Marca como recién llegado"
                  checked={formData.new_arrival}
                  onChange={(v) => setFormData({ ...formData, new_arrival: v })}
                />
              </div>

              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
              <button
                onClick={closeModal}
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
