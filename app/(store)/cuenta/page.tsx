import { redirect } from 'next/navigation'
import { User } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AccountLogout from '@/components/store/AccountLogout'
import OrdersList from '@/components/store/OrdersList'
import type { Order, OrderItem } from '@/types/index'

export default async function CuentaPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/cuenta/login')

  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from('profiles').select('full_name, email').eq('id', user.id).single(),
    supabase.from('orders').select('*').eq('customer_id', user.id).order('created_at', { ascending: false }),
  ])

  const orderIds = (orders ?? []).map((o) => o.id)
  const { data: items } = orderIds.length
    ? await supabase.from('order_items').select('*').in('order_id', orderIds)
    : { data: [] as OrderItem[] }

  const itemsByOrder = (items ?? []).reduce<Record<string, OrderItem[]>>((acc, item) => {
    ;(acc[item.order_id] ??= []).push(item)
    return acc
  }, {})

  // payment-proofs is a private bucket — resolve to a short-lived signed URL
  // server-side rather than exposing the raw storage path to the client.
  const proofPaths = (orders ?? []).map((o) => o.payment_proof_path).filter((p): p is string => !!p)
  const signedUrlByPath = new Map<string, string>()
  if (proofPaths.length > 0) {
    const { data: signedUrls } = await supabase.storage
      .from('payment-proofs')
      .createSignedUrls(proofPaths, 60 * 10)
    for (const entry of signedUrls ?? []) {
      if (entry.path && entry.signedUrl) signedUrlByPath.set(entry.path, entry.signedUrl)
    }
  }

  const ordersWithItems = (orders as Order[] ?? []).map((order) => ({
    ...order,
    items: itemsByOrder[order.id] ?? [],
    paymentProofUrl: order.payment_proof_path ? signedUrlByPath.get(order.payment_proof_path) ?? null : null,
  }))

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1e4d6b]/10">
          <User className="h-7 w-7 text-[#1e4d6b]" />
        </div>
        <div>
          <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">
            {profile?.full_name || 'Mi cuenta'}
          </h1>
          <p className="text-sm text-text-muted">{profile?.email ?? user.email}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-800">Mis pedidos</h2>
        <OrdersList orders={ordersWithItems} />
      </div>

      <div className="mt-6">
        <AccountLogout />
      </div>
    </div>
  )
}
