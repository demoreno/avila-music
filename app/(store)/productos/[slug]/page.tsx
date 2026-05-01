import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { whatsappProductLink } from '@/lib/whatsapp'
import ImageGallery from './ImageGallery'
import AddToCartButton from './AddToCartButton'
import ProductCard from '@/components/store/ProductCard'
import type { Product, ProductImage, CategoryTree } from '@/types/index'

export const revalidate = 60

async function getProduct(slug: string) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()
  return data as Product | null
}

async function getProductImages(productId: string) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('sort_order')
  return (data as ProductImage[]) ?? []
}

async function getCategoryInfo(subcategoryId: string) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('v_category_tree')
    .select('*')
    .eq('subcategory_id', subcategoryId)
    .maybeSingle()
  return data as CategoryTree | null
}

async function getRelatedProducts(subcategoryId: string, excludeId: string) {
  const supabase = await createSupabaseServerClient()
  const { data: subs } = await supabase
    .from('products')
    .select('*')
    .eq('subcategory_id', subcategoryId)
    .eq('is_active', true)
    .neq('id', excludeId)
    .limit(4)
  if (!subs) return []

  const { data: images } = await supabase
    .from('product_images')
    .select('*')
    .in('product_id', (subs as Product[]).map((p) => p.id))

  const imgMap = ((images as ProductImage[]) ?? []).reduce<Record<string, ProductImage[]>>(
    (acc, img) => {
      if (!acc[img.product_id]) acc[img.product_id] = []
      acc[img.product_id].push(img)
      return acc
    },
    {}
  )

  return (subs as Product[]).map((p) => ({ ...p, images: imgMap[p.id] ?? [] }))
}

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase.from('products').select('slug').eq('is_active', true)
  return (data as { slug: string }[] ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Producto no encontrado' }

  const images = await getProductImages(product.id)
  const primaryImage = images.find((i) => i.is_primary) ?? images[0]
  const ogImage = primaryImage
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${primaryImage.storage_path}`
    : undefined

  return {
    title: `${product.name} | Ávila Music`,
    description: product.notes ?? `${product.name} disponible en Ávila Music`,
    openGraph: {
      title: product.name,
      description: product.notes ?? undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const [images, categoryInfo, relatedProducts] = await Promise.all([
    getProductImages(product.id),
    getCategoryInfo(product.subcategory_id),
    getRelatedProducts(product.subcategory_id, product.id),
  ])

  const waLink = whatsappProductLink(product.name, product.price_usd)

  const primaryImage = images.find((i) => i.is_primary) ?? images[0]
  const ogImageUrl = primaryImage
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${primaryImage.storage_path}`
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.notes ?? undefined,
    image: ogImageUrl ?? undefined,
    offers: {
      '@type': 'Offer',
      price: product.price_usd,
      priceCurrency: 'USD',
      availability:
        product.stock_total > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  }

  const stockStatus =
    product.stock_total === 0
      ? { label: 'Sin stock', color: 'bg-red-100 text-red-700' }
      : product.stock_total <= product.stock_minimum
      ? { label: 'Últimas unidades', color: 'bg-amber-100 text-amber-700' }
      : { label: 'Disponible', color: 'bg-green-100 text-green-700' }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-amber-600">Productos</Link>
          {categoryInfo && (
            <>
              <span>/</span>
              <Link
                href={`/productos?categoria=${categoryInfo.category_slug}`}
                className="hover:text-amber-600"
              >
                {categoryInfo.category_name}
              </Link>
              <span>/</span>
              <Link
                href={`/productos?categoria=${categoryInfo.category_slug}`}
                className="hover:text-amber-600"
              >
                {categoryInfo.subcategory_name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="max-w-[200px] truncate font-medium text-slate-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ImageGallery images={images} productName={product.name} />

          <div className="flex flex-col gap-5">
            {categoryInfo && (
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                {categoryInfo.subcategory_name}
              </span>
            )}

            <h1 className="heading-serif text-3xl font-bold text-slate-900">{product.name}</h1>

            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-slate-900">
                USD {Number(product.price_usd).toFixed(2)}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
            </div>

            {product.notes && (
              <p className="text-sm leading-relaxed text-slate-600">{product.notes}</p>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <AddToCartButton product={{ ...product, images }} />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="heading-serif mb-6 text-2xl font-bold text-slate-900">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
