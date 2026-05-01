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
      ? { label: 'Sin stock', color: 'badge-out', icon: '❌' }
      : product.stock_total <= product.stock_minimum
      ? { label: 'Últimas unidades', color: 'badge-low-stock', icon: '⚠️' }
      : { label: 'Disponible', color: 'badge-stock', icon: '✅' }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-[#1e4d6b] transition-colors">Inicio</Link>
          <span className="text-slate-300">/</span>
          <Link href="/productos" className="hover:text-[#1e4d6b] transition-colors">Productos</Link>
          {categoryInfo && (
            <>
              <span className="text-slate-300">/</span>
              <Link
                href={`/productos?categoria=${categoryInfo.category_slug}`}
                className="hover:text-[#1e4d6b] transition-colors"
              >
                {categoryInfo.category_name}
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-text">{categoryInfo.subcategory_name}</span>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ImageGallery images={images} productName={product.name} />

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Category Badge */}
            {categoryInfo && (
              <Link
                href={`/productos?categoria=${categoryInfo.category_slug}`}
                className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-wider text-[#1e4d6b] hover:text-[#0f7a5f] transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {categoryInfo.subcategory_name}
              </Link>
            )}

            {/* Title */}
            <h1 className="heading-serif text-4xl sm:text-5xl font-bold text-[#1e4d6b] leading-tight">
              {product.name}
            </h1>

            {/* Price and Stock */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-5xl font-bold gradient-text">
                USD {Number(product.price_usd).toFixed(2)}
              </span>
              <span className={`badge ${stockStatus.color} shadow-lg`}>
                <span>{stockStatus.icon}</span>
                {stockStatus.label}
              </span>
            </div>

            {/* Description */}
            {product.notes && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-semibold text-[#1e4d6b] mb-3 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Descripción
                </h3>
                <p className="text-text-muted leading-relaxed">{product.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
              <AddToCartButton product={{ ...product, images }} />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-glow justify-center py-4"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.886 14.553c-.17-.085-1.009-.499-1.165-.556-.156-.057-.27-.085-.4.114-.127.199-.497.626-.61.754-.114.128-.228.142-.398.057-.17-.085-.723-.298-1.374-.878-.508-.453-.851-1.019-.95-1.19-.099-.17-.01-.262.085-.355.077-.076.17-.199.255-.298.085-.1.128-.17.185-.284.057-.113.028-.213-.014-.298-.043-.085-.383-.922-.525-1.262-.138-.332-.28-.287-.383-.293-.099-.005-.213-.005-.327-.005-.113 0-.298.043-.454.213-.156.17-.596.582-.596 1.423 0 .841.611 1.654.696 1.768.085.114 1.202 1.838 2.913 2.575.408.176.728.282.976.361.41.13.782.111 1.076.067.327-.049 1.009-.412 1.151-.813.142-.4.142-.74.085-.84-.057-.1-.213-.156-.454-.276m-3.103 4.253h-.003a5.675 5.675 0 01-2.888-.793l-.207-.122-2.149.564.572-2.1a5.654 5.654 0 01-.867-3.018c.001-3.127 2.549-5.674 5.678-5.674 1.514 0 2.937.59 4.007 1.662a5.633 5.633 0 011.653 4.011c-.002 3.127-2.551 5.674-5.679 5.674m4.84-10.513a6.788 6.788 0 00-4.796-1.988c-3.763 0-6.823 3.06-6.825 6.825 0 1.202.314 2.375.912 3.413L.635 20.5l4.568-1.198a6.817 6.817 0 003.268.832h.003c3.76 0 6.82-3.06 6.823-6.825a6.793 6.793 0 00-2.003-4.824" />
                </svg>
                Pedir por WhatsApp
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              {[
                { icon: '🚚', text: 'Envío seguro' },
                { icon: '✅', text: 'Garantía incluida' },
                { icon: '💬', text: 'Soporte rápido' },
                { icon: '🔒', text: 'Pago protegido' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 text-sm text-text-muted">
                  <span className="text-xl">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-serif text-3xl font-bold gradient-text">
                  Productos relacionados
                </h2>
                <p className="text-text-muted mt-1">También te puede interesar</p>
              </div>
              <Link
                href="/productos"
                className="group flex items-center gap-2 text-[#1e4d6b] font-semibold hover:text-[#0f7a5f] transition-colors"
              >
                Ver todos
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
