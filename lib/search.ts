/**
 * Plain string matching shared by the JSON catalog (server) and the product
 * listing's client-side filter — no server-only dependency, so both sides stay
 * in sync without duplicating the matching rule.
 */
export function tokenizeQuery(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean)
}

/** All query tokens must appear somewhere in the searchable text (order-independent). */
export function matchesSearch(searchableText: string, query: string): boolean {
  const tokens = tokenizeQuery(query)
  if (tokens.length === 0) return false
  const haystack = searchableText.toLowerCase()
  return tokens.every((token) => haystack.includes(token))
}
