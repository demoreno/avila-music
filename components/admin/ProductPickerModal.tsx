'use client'

import { useState } from 'react'
import { X, Search, Music } from 'lucide-react'

export interface PickerProduct {
  id: string
  name: string
  subcategory_name: string
  imageUrl: string | null
}

interface ProductPickerModalProps {
  products: PickerProduct[]
  initialSelected: string[]
  onClose: () => void
  onConfirm: (ids: string[]) => void
}

export default function ProductPickerModal({ products, initialSelected, onClose, onConfirm }: ProductPickerModalProps) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected))

  const filtered = search.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          p.subcategory_name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : products

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="flex max-h-[80vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-base font-bold text-slate-800">Elegir productos relacionados</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-slate-200 px-5 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o categoría..."
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Sin resultados.</p>
          ) : (
            filtered.map((product) => (
              <label
                key={product.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={selected.has(product.id)}
                  onChange={() => toggle(product.id)}
                  className="h-4 w-4 flex-shrink-0 rounded border-slate-300 text-[#1e4d6b] focus:ring-amber-400"
                />
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- small thumbnail in an admin picker list, next/image overhead isn't worth it here
                    <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Music className="h-4 w-4 text-slate-300" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">{product.name}</p>
                  <p className="truncate text-xs text-slate-400">{product.subcategory_name}</p>
                </div>
              </label>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <span className="text-sm text-slate-500">{selected.size} seleccionado{selected.size === 1 ? '' : 's'}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onConfirm(Array.from(selected))}
              className="rounded-lg bg-[#1e4d6b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#153a52]"
            >
              Listo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
