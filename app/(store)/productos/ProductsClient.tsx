'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/store/ProductCard'
import type { PublicProduct } from '@/lib/catalog'
import type { CategoryTree } from '@/types/index'

interface ProductWithMeta extends Omit<PublicProduct, 'price_usd'> {
  price_usd: number | null
  subcategory_name: string
  subcategory_slug: string
  category_name: string
  category_slug: string
  category_id: string
  subcategory_id: string
}

interface ProductsClientProps {
  products: ProductWithMeta[]
  categoryTree: CategoryTree[]
  initialCategory?: string
  title?: string
  description?: string
  showPrices: boolean
}

type SortOption = 'precio-asc' | 'precio-desc' | 'mas-vendido'

export default function ProductsClient({
  products,
  categoryTree,
  initialCategory,
  title = 'Productos',
  description,
  showPrices,
}: ProductsClientProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? '')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [sort, setSort] = useState<SortOption>('mas-vendido')

  const rootCategories = useMemo(() => {
    const seen = new Set<string>()
    return categoryTree.filter((row) => {
      if (seen.has(row.category_id)) return false
      seen.add(row.category_id)
      return true
    })
  }, [categoryTree])

  const subcategories = useMemo(() => {
    if (!selectedCategory) return []
    return categoryTree.filter((row) => row.category_slug === selectedCategory)
  }, [categoryTree, selectedCategory])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory_name.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q)
      )
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category_slug === selectedCategory)
    }

    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategory_slug === selectedSubcategory)
    }

    if (showPrices && sort === 'precio-asc') result.sort((a, b) => (a.price_usd ?? 0) - (b.price_usd ?? 0))
    else if (showPrices && sort === 'precio-desc') result.sort((a, b) => (b.price_usd ?? 0) - (a.price_usd ?? 0))

    return result
  }, [products, search, selectedCategory, selectedSubcategory, sort, showPrices])

  function handleCategoryChange(slug: string) {
    setSelectedCategory(slug)
    setSelectedSubcategory('')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className={`heading-serif text-3xl font-bold text-slate-900 ${description ? 'mb-2' : 'mb-6'}`}>
        {title}
      </h1>
      {description && <p className="mb-6 text-slate-500 max-w-2xl">{description}</p>}

      {/* Filters bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
        >
          <option value="">Todas las categorías</option>
          {rootCategories.map((cat) => (
            <option key={cat.category_id} value={cat.category_slug}>
              {cat.category_name}
            </option>
          ))}
        </select>
        {subcategories.length > 0 && (
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
          >
            <option value="">Todas las subcategorías</option>
            {subcategories.map((sub) => (
              <option key={sub.subcategory_id} value={sub.subcategory_slug}>
                {sub.subcategory_name}
              </option>
            ))}
          </select>
        )}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
        >
          <option value="mas-vendido">Más vendido</option>
          {showPrices && <option value="precio-asc">Precio: menor a mayor</option>}
          {showPrices && <option value="precio-desc">Precio: mayor a menor</option>}
        </select>
      </div>

      <p className="mb-4 text-sm text-slate-500">
        {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          <p className="text-lg">No se encontraron productos</p>
          <button
            onClick={() => {
              setSearch('')
              setSelectedCategory('')
              setSelectedSubcategory('')
            }}
            className="mt-3 text-sm text-amber-600 underline hover:text-amber-700"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
