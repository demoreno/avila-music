import Link from 'next/link'
import type { Metadata } from 'next'
import { catalog } from '@/lib/catalog'
import CategoryIcon from '@/components/store/CategoryIcon'

export const metadata: Metadata = {
  title: 'Categorías | Accesorios Musicales en Caracas',
  description: 'Explorá el catálogo de Ávila Music por categoría: cuerdas, accesorios y repuestos para guitarra, bajo, violín, batería y electrónica. Comprá online con envíos a todo el país desde Caracas.',
  alternates: { canonical: '/productos/categoria' },
}

export default async function CategoriesIndexPage() {
  const categoryTree = await catalog.getCategoryTree()

  const categories = categoryTree.reduce<
    Record<string, { name: string; slug: string; sortOrder: number; productCount: number }>
  >((acc, row) => {
    if (!acc[row.category_slug]) {
      acc[row.category_slug] = {
        name: row.category_name,
        slug: row.category_slug,
        sortOrder: row.category_sort_order,
        productCount: 0,
      }
    }
    acc[row.category_slug].productCount += row.product_count
    return acc
  }, {})

  const sortedCategories = Object.values(categories).sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="heading-serif mb-2 text-3xl font-bold text-slate-900">Categorías</h1>
      <p className="mb-10 text-slate-500 max-w-2xl">
        Encontrá lo que buscás por instrumento: cuerdas, accesorios, cables y más.
      </p>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {sortedCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/productos/categoria/${cat.slug}`}
            className="group flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          >
            <CategoryIcon slug={cat.slug} size="lg" className="text-[#1e4d6b] group-hover:text-[#f59e0b] transition-colors duration-500" />
            <div>
              <div className="font-semibold text-text">{cat.name}</div>
              <div className="text-xs text-text-muted mt-1">
                {cat.productCount} {cat.productCount === 1 ? 'producto' : 'productos'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
