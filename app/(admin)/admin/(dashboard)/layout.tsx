import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { ADMIN_EMAIL } from '@/lib/require-admin'
import AdminShell from './AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  // A logged-in customer (not an admin) must NOT bounce back to /admin/login —
  // that page redirects any logged-in user straight back to /admin/dashboard,
  // which would land here again and loop forever. Send them home instead.
  // ADMIN_EMAIL check is a deliberate hardcoded belt-and-suspenders gate on top
  // of profiles.role — see lib/require-admin.ts.
  if (profile?.role !== 'admin' || user.email !== ADMIN_EMAIL) redirect('/')

  return <AdminShell userEmail={user.email}>{children}</AdminShell>
}
