import { JsonCatalogProvider } from './json-provider'
import type { CatalogProvider } from './types'

/** Single switch point: swap the provider here when moving to Supabase/DynamoDB/RDS. */
export const catalog: CatalogProvider = new JsonCatalogProvider()

export type { CatalogProvider, PublicProduct } from './types'
