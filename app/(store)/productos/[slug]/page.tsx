import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Tag, Info, ArrowRight, XCircle, AlertTriangle, CheckCircle2, Truck, ShieldCheck, MessageCircle, Lock } from 'lucide-react'
import { catalog } from '@/lib/catalog'
import { whatsappProductLink } from '@/lib/whatsapp'
import ImageGallery from './ImageGallery'
import ProductCard from '@/components/store/ProductCard'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

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

  const [categoryInfo, relatedProducts] = await Promise.all([
    catalog.getCategoryBySubcategoryId(product.subcategory_id),
    catalog.getRelatedProducts(product.subcategory_id, product.id),
  ])

  const waLink = whatsappProductLink(product.name, product.price_usd)

  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0]
  const ogImageUrl = primaryImage ? catalog.getProductImageUrl(primaryImage.storage_path) : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || undefined,
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
      ? { label: 'Últimas unidades', color: 'badge-low-stock', icon: AlertTriangle }
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
          <div className="flex flex-col gap-6">
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
            <h1 className="heading-serif text-4xl sm:text-5xl font-bold text-[#1e4d6b] leading-tight">
              {product.name}
            </h1>

            {/* Price and Stock */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-5xl font-bold gradient-text">
                USD {Number(product.price_usd).toFixed(2)}
              </span>
              <span className={`badge ${stockStatus.color} shadow-lg`}>
                <stockStatus.icon className="h-3.5 w-3.5" />
                {stockStatus.label}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-semibold text-[#1e4d6b] mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Descripción
                </h3>
                <p className="text-text-muted leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-glow justify-center py-4"
              >
                <WhatsAppIcon className="h-6 w-6" />
                Pedir por WhatsApp
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              {[
                { icon: Truck, text: 'Envío seguro' },
                { icon: ShieldCheck, text: 'Garantía incluida' },
                { icon: MessageCircle, text: 'Soporte rápido' },
                { icon: Lock, text: 'Pago protegido' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 text-sm text-text-muted">
                  <feature.icon className="h-5 w-5 text-[#1e4d6b]" />
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
