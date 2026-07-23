'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { deletePurchaseOrder } from '@/app/(admin)/admin/(dashboard)/pedidos/actions'

export default function DeletePedidoButton({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('¿Eliminar este pedido? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    try {
      await deletePurchaseOrder(orderId)
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar el pedido')
      setDeleting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      title="Eliminar pedido"
      aria-label="Eliminar pedido"
      className="flex-shrink-0 rounded-full p-1 text-slate-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  )
}
