import Link from 'next/link'
import { Plus, FileText, Eye, EyeOff } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { BlogPost } from '@/types/index'

async function getPosts(): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  return (data as BlogPost[]) ?? []
}

export default async function BlogAdminPage() {
  const posts = await getPosts()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">Blog</h1>
          <p className="text-sm text-slate-500">Artículos para atraer tráfico orgánico por SEO</p>
        </div>
        <Link
          href="/admin/blog/nuevo"
          className="flex items-center gap-2 rounded-lg bg-[#1e4d6b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#153a52] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo artículo
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <FileText className="h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">Todavía no hay artículos. Creá el primero.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Publicado</th>
                <th className="px-4 py-3">Actualizado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blog/${post.id}/editar`}
                      className="font-medium text-slate-800 hover:text-[#1e4d6b]"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-slate-400">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    {post.is_published ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        <Eye className="h-3 w-3" />
                        Publicado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                        <EyeOff className="h-3 w-3" />
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString('es-VE') : '—'}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(post.updated_at).toLocaleDateString('es-VE')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
