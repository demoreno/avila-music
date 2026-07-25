export interface BcvRate {
  rate: number
  date: string
}

const BCV_URL = process.env.NEXT_PUBLIC_BCV_SUPABASE_URL
const BCV_ANON_KEY = process.env.NEXT_PUBLIC_BCV_SUPABASE_ANON_KEY

/**
 * Reads the latest USD rate from a separate Supabase project (ofertopoli_v2) that
 * scrapes the BCV daily — read-only via its public anon key, no write access needed
 * here. Cached for an hour since the source updates about once a day.
 */
export async function getBcvRate(): Promise<BcvRate | null> {
  if (!BCV_URL || !BCV_ANON_KEY) return null

  try {
    const res = await fetch(
      `${BCV_URL}/rest/v1/exchange_rate_history?select=rate,date&currency=eq.USD&order=recorded_at.desc&limit=1`,
      {
        headers: {
          apikey: BCV_ANON_KEY,
          Authorization: `Bearer ${BCV_ANON_KEY}`,
        },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null

    const rows = (await res.json()) as { rate: string; date: string }[]
    const row = rows[0]
    if (!row) return null

    return { rate: Number(row.rate), date: row.date }
  } catch {
    return null
  }
}
