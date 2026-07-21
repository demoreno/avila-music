import { headers } from 'next/headers'

/**
 * Master switch — geo-blocking is OFF by default. Set PRICE_GEOFENCE_ENABLED=true
 * (in Vercel's env vars) to turn it back on without touching any code.
 *
 * When enabled: Vercel's edge attaches the country header to every request before
 * our code runs — no extra network call, no added latency. Missing header (local
 * dev, non-Vercel preview) defaults to showing prices so development isn't broken.
 */
export async function canShowPrices(): Promise<boolean> {
  if (process.env.PRICE_GEOFENCE_ENABLED !== 'true') return true

  if (process.env.ALWAYS_SHOW_PRICES === 'true') return true

  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country')
  if (!country) return true
  return country === 'VE'
}

/** Redacts price server-side so it never reaches the client payload for hidden visitors. */
export function withPriceVisibility<T extends { price_usd: number }>(
  product: T,
  showPrices: boolean
): Omit<T, 'price_usd'> & { price_usd: number | null } {
  return { ...product, price_usd: showPrices ? product.price_usd : null }
}
