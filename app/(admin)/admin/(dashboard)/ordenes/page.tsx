import { createSupabaseServerClient } from '@/lib/supabase-server'
import OrdersTable from './OrdersTable'
import type { Order } from '@/types/index'

async function getOrders() {
  const supabase = await createSupabaseServerClient()
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  const customerIds = [...new Set((orders ?? []).map((o) => o.customer_id))]

  const { data: profiles } = customerIds.length
    ? await supabase.from('profiles').select('id, full_name, email').in('id', customerIds)
    : { data: [] }

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]))

  return (orders as Order[] ?? []).map((order) => ({
    ...order,
    customer: profileById.get(order.customer_id) ?? null,
  }))
}

export default async function OrdenesPage() {
  const orders = await getOrders()

  return (
    <div>
      <div className="mb-6">
        <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">Órdenes</h1>
        <p className="text-sm text-slate-500">Pedidos hechos por clientes desde la tienda online</p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  )
}
