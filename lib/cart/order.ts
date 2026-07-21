/**
 * Local-only order number, shown to the customer and included in the WhatsApp
 * message so both sides can reference the same order. Once orders are persisted
 * in Supabase, replace this with the real inserted row's id/sequence.
 */
export function generateOrderNumber(): string {
  return Date.now().toString(36).toUpperCase()
}
