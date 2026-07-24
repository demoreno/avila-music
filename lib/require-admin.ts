import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase-server'

/**
 * Checking `auth.getUser()` alone is NOT enough — that only proves someone is
 * logged in, and customer accounts are logged-in Supabase users too. This also
 * verifies role='admin' via `profiles` (RLS-scoped to the caller's own row).
 */
export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') throw new Error('No autorizado')
  return user
}
