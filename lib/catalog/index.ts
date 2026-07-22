import { SupabaseCatalogProvider } from './supabase-provider'
import type { CatalogProvider } from './types'

/** Single switch point: swap the provider here when moving to a different data source. */
export const catalog: CatalogProvider = new SupabaseCatalogProvider()

export type { CatalogProvider, PublicProduct } from './types'
