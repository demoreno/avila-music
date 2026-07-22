/** Builds a public Supabase Storage URL from a bucket-relative storage_path. No 'server-only' — used by client components too. */
export function getPublicImageUrl(storagePath: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${storagePath}`
}
