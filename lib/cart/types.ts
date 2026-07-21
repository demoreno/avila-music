/**
 * Field names mirror the future `sale_items` table (unit_price_usd, quantity, product_id)
 * so migrating the checkout flow to persist real orders in Supabase later is additive,
 * not a rewrite. unitPriceUsd is a frozen snapshot taken at add-to-cart time — same
 * "write-once" rule CLAUDE.md defines for sale_items.unit_price_usd.
 */
export interface CartItem {
  productId: string
  slug: string
  name: string
  imageUrl: string | null
  /** Snapshot at add-to-cart time. Null when the visitor couldn't see the price (geo-hidden). */
  unitPriceUsd: number | null
  stockTotal: number
  quantity: number
}
