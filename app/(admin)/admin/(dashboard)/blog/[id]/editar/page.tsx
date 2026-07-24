import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import BlogPostForm from '@/components/admin/BlogPostForm'
import type { BlogPost } from '@/types/index'

export default async function EditarBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const [{ data: post }, { data: products }] = await Promise.all([
    supabase.from('blog_posts').select('*').eq('id', id).single(),
    supabase.from('products').select('id, name').eq('is_active', true).order('name'),
  ])

  if (!post) notFound()

  return (
    <div>
      <div className="mb-6">
        <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">Editar artículo</h1>
      </div>
      <BlogPostForm post={post as BlogPost} products={products ?? []} />
    </div>
  )
}
