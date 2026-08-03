import StoreShell from './StoreShell'
import PhysicalAddressBlock from '@/components/store/PhysicalAddressBlock'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  let fullName: string | null = null
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
    fullName = profile?.full_name ?? null
  }

  return (
    <StoreShell footerAddressSlot={<PhysicalAddressBlock />} initialUser={user ? { fullName } : null}>
      {children}
    </StoreShell>
  )
}
