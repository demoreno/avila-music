'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Trash2, Upload, X } from 'lucide-react'
import type { BlogPost } from '@/types/index'
import { createBlogPost, updateBlogPost, deleteBlogPost, uploadBlogCoverImage } from '@/app/(admin)/admin/(dashboard)/blog/actions'
import { extractYouTubeId } from '@/lib/youtube'
import YouTubeEmbed from '@/components/shared/YouTubeEmbed'

interface BlogPostFormProps {
  post?: BlogPost
  products: { id: string; name: string }[]
}

function MarkdownLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  const videoId = href ? extractYouTubeId(href) : null
  if (videoId) return <YouTubeEmbed videoId={videoId} />
  return <a href={href}>{children}</a>
}

// Same invalid-nesting fix as the public blog page: a YouTubeEmbed <div> can't sit inside
// the <p> react-markdown wraps a lone link in. react-markdown passes hast nodes here
// (type: 'element', tagName: 'a'), not mdast.
interface HastElementNode {
  children?: { type: string; tagName?: string; properties?: { href?: string } }[]
}
function MarkdownParagraph({ node, children }: { node?: HastElementNode; children?: React.ReactNode }) {
  const onlyChild = node?.children?.length === 1 ? node.children[0] : null
  const isVideoLink = onlyChild?.type === 'element' && onlyChild.tagName === 'a' && extractYouTubeId(onlyChild.properties?.href ?? '')
  if (isVideoLink) return <>{children}</>
  return <p>{children}</p>
}

// Google truncates around these lengths — kept as soft guidance, not hard limits.
const TITLE_SOFT_LIMIT = 60
const META_DESCRIPTION_SOFT_LIMIT = 160

function CharCounter({ value, limit }: { value: string; limit: number }) {
  const over = value.length > limit
  return (
    <span className={`text-xs ${over ? 'text-amber-600' : 'text-slate-400'}`}>
      {value.length} / {limit} caracteres{over ? ' — Google probablemente lo corte' : ''}
    </span>
  )
}

export default function BlogPostForm({ post, products }: BlogPostFormProps) {
  const router = useRouter()
  const isEditing = !!post

  const [title, setTitle] = useState(post?.title ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '')
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false)
  const [relatedProductIds, setRelatedProductIds] = useState<string[]>(post?.related_product_ids ?? [])
  const [productSearch, setProductSearch] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')

  const filteredProducts = productSearch.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(productSearch.trim().toLowerCase()))
    : products

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError('')
    try {
      const formData = new FormData()
      formData.set('image', file)
      const url = await uploadBlogCoverImage(formData)
      setCoverImageUrl(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo subir la imagen.')
    } finally {
      setUploadingImage(false)
      e.target.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Título, resumen y contenido son obligatorios.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        cover_image_url: coverImageUrl.trim() || null,
        meta_description: metaDescription.trim() || null,
        is_published: isPublished,
        related_product_ids: relatedProductIds,
      }

      if (isEditing) {
        await updateBlogPost(post.id, payload)
      } else {
        await createBlogPost(payload)
      }

      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el artículo.')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!post) return
    if (!confirm('¿Eliminar este artículo? Esta acción no se puede deshacer.')) return

    setSaving(true)
    try {
      await deleteBlogPost(post.id)
      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar el artículo.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              placeholder="Ej: Cómo elegir tus primeras cuerdas de guitarra acústica"
            />
            <div className="mt-1.5 flex items-center justify-between">
              <CharCounter value={title} limit={TITLE_SOFT_LIMIT} />
              {isEditing && <span className="text-xs text-slate-400">/blog/{post.slug}</span>}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Resumen</label>
            <p className="mb-2 text-xs text-slate-400">Se muestra en el listado del blog y como respaldo si no cargás una meta description.</p>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">Contenido (Markdown)</label>
              <button
                type="button"
                onClick={() => setShowPreview((v) => !v)}
                className="text-xs font-medium text-[#1e4d6b] hover:text-[#0f7a5f]"
              >
                {showPreview ? 'Ver editor' : 'Ver vista previa'}
              </button>
            </div>
            {showPreview ? (
              <div className="prose prose-sm max-w-none rounded-lg border border-slate-200 px-4 py-3 min-h-[320px]">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink, p: MarkdownParagraph }}>{content || '*Sin contenido todavía*'}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 font-mono text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                placeholder={'## Un subtítulo\n\nTexto en **negrita**, [enlaces](https://avilamusic.store), listas, etc.'}
              />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Publicación</h3>
            <label className="flex items-center gap-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#1e4d6b] focus:ring-amber-400"
              />
              Publicado (visible en /blog)
            </label>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-1 text-sm font-semibold text-slate-700">Productos relacionados</h3>
            <p className="mb-3 text-xs text-slate-400">Se muestran como carrusel al final del artículo. Si no elegís ninguno, esa sección no aparece.</p>
            {relatedProductIds.length > 0 && (
              <p className="mb-2 text-xs font-medium text-[#1e4d6b]">{relatedProductIds.length} seleccionado(s)</p>
            )}
            <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Buscar producto..."
              className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            {filteredProducts.length === 0 ? (
              <p className="text-xs text-slate-400">Sin resultados.</p>
            ) : (
              <div className="max-h-56 space-y-2 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <label key={product.id} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={relatedProductIds.includes(product.id)}
                      onChange={(e) =>
                        setRelatedProductIds((ids) =>
                          e.target.checked ? [...ids, product.id] : ids.filter((id) => id !== product.id)
                        )
                      }
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1e4d6b] focus:ring-amber-400"
                    />
                    {product.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Imagen de portada</h3>

            {coverImageUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded/pasted URL, not a known remotePattern */}
                <img
                  src={coverImageUrl}
                  alt="Vista previa"
                  className="aspect-video w-full rounded-lg object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setCoverImageUrl('')}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow hover:bg-white hover:text-red-600"
                  aria-label="Quitar imagen"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-amber-400 hover:text-amber-500 transition-colors">
                <Upload className="h-6 w-6" />
                <span className="text-xs font-medium">{uploadingImage ? 'Subiendo...' : 'Subir imagen'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            )}

            <label className="mt-3 block text-xs font-medium text-slate-500">O pega una URL directamente</label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              placeholder="https://..."
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-1 text-sm font-semibold text-slate-700">SEO — Meta description</h3>
            <p className="mb-2 text-xs text-slate-400">Si lo dejás vacío, se usa el resumen.</p>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <div className="mt-1.5">
              <CharCounter value={metaDescription || excerpt} limit={META_DESCRIPTION_SOFT_LIMIT} />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      <div className="flex items-center justify-between border-t border-slate-200 pt-5">
        <div>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#1e4d6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153a52] transition-colors disabled:opacity-60"
          >
            {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear artículo'}
          </button>
        </div>
      </div>
    </form>
  )
}
