import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Tag, ArrowRight, XCircle, AlertTriangle, CheckCircle2, Truck, Smartphone, Landmark, Wallet, ShieldCheck, MessageCircle } from 'lucide-react'
import { catalog } from '@/lib/catalog'
import { canShowPrices, withPriceVisibility } from '@/lib/geo'
import ImageGallery from './ImageGallery'
import ProductCard from '@/components/store/ProductCard'
import ProductActions from '@/components/store/ProductActions'
import ProductSpecs from '@/components/store/ProductSpecs'

export async function generateStaticParams() {
  const products = await catalog.getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await catalog.getProductBySlug(slug)
  if (!product) return { title: 'Producto no encontrado' }

  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0]
  const ogImage = primaryImage ? catalog.getProductImageUrl(primaryImage.storage_path) : undefined

  return {
    title: product.name,
    description: product.description || `${product.name} disponible en Ávila Music`,
    alternates: { canonical: `/productos/${slug}` },
    openGraph: {
      title: product.name,
      description: product.description || undefined,
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
  const product = await catalog.getProductBySlug(slug)
  if (!product) notFound()

  const [categoryInfo, rawRelatedProducts, showPrices] = await Promise.all([
    catalog.getCategoryBySubcategoryId(product.subcategory_id),
    catalog.getRelatedProducts(product.subcategory_id, product.id),
    canShowPrices(),
  ])
  const relatedProducts = rawRelatedProducts.map((p) => withPriceVisibility(p, showPrices))

  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0]
  const ogImageUrl = primaryImage ? catalog.getProductImageUrl(primaryImage.storage_path) : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || undefined,
    image: ogImageUrl ?? undefined,
    ...(showPrices
      ? {
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
      : {}),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://avilamusic.shop' },
      { '@type': 'ListItem', position: 2, name: 'Productos', item: 'https://avilamusic.shop/productos' },
      ...(categoryInfo
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: categoryInfo.category_name,
              item: `https://avilamusic.shop/productos/categoria/${categoryInfo.category_slug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: categoryInfo ? 4 : 3,
        name: product.name,
        item: `https://avilamusic.shop/productos/${slug}`,
      },
    ],
  }

  const stockStatus =
    product.stock_total === 0
      ? { label: 'Sin stock', color: 'badge-out', icon: XCircle }
      : product.stock_total <= product.stock_minimum
      ? {
          label: product.stock_total <= 10 ? `Solo ${product.stock_total}` : `Últimas ${product.stock_total}`,
          color: 'badge-low-stock',
          icon: AlertTriangle,
        }
      : product.stock_total <= 15
      ? { label: `Quedan ${product.stock_total}`, color: 'badge-hot', icon: AlertTriangle }
      : { label: 'Disponible', color: 'badge-stock', icon: CheckCircle2 }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                href={`/productos/categoria/${categoryInfo.category_slug}`}
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
          <ImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Category Badge */}
            {categoryInfo && (
              <Link
                href={`/productos/categoria/${categoryInfo.category_slug}`}
                className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-wider text-[#1e4d6b] hover:text-[#0f7a5f] transition-colors"
              >
                <Tag className="h-4 w-4" />
                {categoryInfo.subcategory_name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1e4d6b] leading-tight">
              {product.name}
            </h1>

            {/* Price and Stock */}
            <div className="flex items-center gap-4 flex-wrap">
              {showPrices ? (
                <span className="text-5xl font-bold gradient-text">
                  USD {Number(product.price_usd).toFixed(2)}
                </span>
              ) : (
                <span className="text-2xl font-semibold gradient-text">
                  Consulta el precio por WhatsApp
                </span>
              )}
              <span className={`badge ${stockStatus.color} shadow-lg`}>
                <stockStatus.icon className="h-3.5 w-3.5" />
                {stockStatus.label}
              </span>
            </div>

            {/* Product Actions — quantity, add to cart, WhatsApp */}
            <ProductActions
              product={{
                productId: product.id,
                slug: product.slug,
                name: product.name,
                imageUrl: ogImageUrl,
                unitPriceUsd: showPrices ? product.price_usd : null,
                stockTotal: product.stock_total,
                stockMinimum: product.stock_minimum,
              }}
              showPrices={showPrices}
            />
          </div>
        </div>

        {/* Description — full width below the fold */}
        <div className="mt-12">
            <ProductSpecs
              description={product.description}
              notes={product.notes}
            />
        </div>

        {/* Payment methods + Shipping — 50/50 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Payment methods */}
          <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1e4d6b] to-[#0f7a5f]" />
            <div className="pl-6 sm:pl-8 pr-6 sm:pr-8 pt-5 sm:pt-6 pb-6 sm:pb-7">
              <h3 className="text-lg font-bold text-[#1e4d6b] flex items-center gap-2.5 tracking-tight">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1e4d6b]">
                  <Wallet className="h-3.5 w-3.5 text-white" />
                </div>
                Paga a tu manera
              </h3>
              <p className="text-xs text-text-muted mt-1 ml-9">
                Elige el método que más te acomode
              </p>

              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-white py-3 px-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                    <Smartphone className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text">Pago Móvil</p>
                    <p className="text-xs text-text-muted">Desde tu banco, al instante</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-white py-3 px-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
                    <Landmark className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text">Transferencia</p>
                    <p className="text-xs text-text-muted">Directa, sin comisiones</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-white py-3 px-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 border border-yellow-100">
                    <Wallet className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text">Binance USDT</p>
                    <p className="text-xs text-text-muted">Desde tu wallet, sin efectivo</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium text-text-muted">Garantía incluida</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-purple-500" />
                  <span className="text-xs font-medium text-text-muted">Soporte post-venta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping info */}
          <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f59e0b] to-[#fbbf24]" />
            <div className="pl-6 sm:pl-8 pr-6 sm:pr-8 pt-5 sm:pt-6 pb-6 sm:pb-7">
              <h3 className="text-lg font-bold text-[#1e4d6b] flex items-center gap-2.5 tracking-tight">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500">
                  <Truck className="h-3.5 w-3.5 text-white" />
                </div>
                Recibes rápido
              </h3>
              <p className="text-xs text-text-muted mt-1 ml-9">
                Hacemos envíos a todo Venezuela
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                    <span className="text-[10px] font-bold">24h</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Ciudades principales</p>
                    <p className="text-xs text-text-muted">Recibes en 24 a 48 horas hábiles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                    <span className="text-[10px] font-bold">5d</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Resto del país</p>
                    <p className="text-xs text-text-muted">Recibes en máximo 5 días hábiles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 mt-0.5">
                    <span className="text-[10px] font-bold">$</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Pagas al recibir</p>
                    <p className="text-xs text-text-muted">El envío se paga contra entrega (MRW o Zoom)</p>
                  </div>
                </div>
              </div>

              <Link
                href="/envios"
                className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#1e4d6b] hover:text-[#0f7a5f] transition-colors"
              >
                Más información sobre envíos
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
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
