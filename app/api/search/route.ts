import { NextResponse } from 'next/server'
import { catalog } from '@/lib/catalog'
import { canShowPrices, withPriceVisibility } from '@/lib/geo'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''

  if (!q.trim()) {
    return NextResponse.json({ results: [] })
  }

  const [matches, showPrices] = await Promise.all([catalog.searchProducts(q, 6), canShowPrices()])

  const results = matches.map((product) => {
    const priced = withPriceVisibility(product, showPrices)
    const primaryImage = priced.images.find((img) => img.is_primary) ?? priced.images[0]
    return {
      slug: priced.slug,
      name: priced.name,
      price_usd: priced.price_usd,
      imageUrl: primaryImage ? catalog.getProductImageUrl(primaryImage.storage_path) : null,
    }
  })

  return NextResponse.json({ results })
}
