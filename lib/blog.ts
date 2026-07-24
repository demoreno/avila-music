import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { BlogPost } from '@/types/index'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (data as BlogPost[]) ?? []
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  return (data as BlogPost | null) ?? null
}
