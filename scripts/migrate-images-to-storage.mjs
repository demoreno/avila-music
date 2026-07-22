// One-off script: uploads local product images (public/images/products/<asset_id>/)
// to the Supabase "products" storage bucket and populates product_images.
// Run: node --env-file=.env.local scripts/migrate-images-to-storage.mjs
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import products from '../data/products.json' with { type: 'json' }

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing SUPABASE_URL / SUPABASE_SERVICE_KEY in env')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const BUCKET = 'products'
const ASSETS_ROOT = path.join(process.cwd(), 'public', 'images', 'products')
const IMAGE_EXTENSIONS = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
}

async function main() {
  const { data: dbProducts, error } = await supabase.from('products').select('id, slug')
  if (error) throw error
  const idBySlug = new Map(dbProducts.map((p) => [p.slug, p.id]))

  let uploaded = 0
  let skippedProducts = []

  for (const product of products) {
    if (!product.is_active) continue

    const productId = idBySlug.get(product.slug)
    if (!productId) {
      skippedProducts.push(product.slug)
      continue
    }

    const dir = path.join(ASSETS_ROOT, product.asset_id)
    let files
    try {
      files = fs.readdirSync(dir)
    } catch {
      skippedProducts.push(product.slug)
      continue
    }

    const filenames = files
      .filter((f) => IMAGE_EXTENSIONS[path.extname(f).toLowerCase()])
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    if (filenames.length === 0) {
      skippedProducts.push(product.slug)
      continue
    }

    // Clear any previous rows for this product so reruns don't duplicate.
    const { error: deleteError } = await supabase.from('product_images').delete().eq('product_id', productId)
    if (deleteError) throw deleteError

    const rows = []
    for (const [index, filename] of filenames.entries()) {
      const filePath = path.join(dir, filename)
      const buffer = fs.readFileSync(filePath)
      const contentType = IMAGE_EXTENSIONS[path.extname(filename).toLowerCase()]
      const storagePath = `${BUCKET}/${product.asset_id}/${filename}`
      const objectPath = `${product.asset_id}/${filename}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        // Long cacheControl is safe: reruns overwrite these exact paths deliberately (upsert).
        .upload(objectPath, buffer, { contentType, upsert: true, cacheControl: '31536000' })
      if (uploadError) throw new Error(`Upload failed for ${storagePath}: ${uploadError.message}`)

      rows.push({
        product_id: productId,
        storage_path: storagePath,
        sort_order: index,
        is_primary: index === 0,
      })
      uploaded++
    }

    const { error: insertError } = await supabase.from('product_images').insert(rows)
    if (insertError) throw insertError

    console.log(`✓ ${product.slug} — ${filenames.length} image(s)`)
  }

  console.log(`\nDone. ${uploaded} images uploaded.`)
  if (skippedProducts.length > 0) {
    console.log(`Skipped (no DB match or no local images): ${skippedProducts.join(', ')}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
