import { createSupabaseServerClient } from '@/lib/supabase-server'
import BlogPostForm from '@/components/admin/BlogPostForm'

export default async function NuevoBlogPostPage() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('id, name')
    .eq('is_active', true)
    .order('name')

  return (
    <div>
      <div className="mb-6">
        <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">Nuevo artículo</h1>
        <p className="text-sm text-slate-500">Se le asigna la URL apenas lo creás, así que no hace falta escribir el slug.</p>
      </div>
      <BlogPostForm products={products ?? []} />
    </div>
  )
}
