import type { PurchaseOrderStatus } from '@/types/index'

export const STATUS_OPTIONS: { value: PurchaseOrderStatus; label: string; badgeClass: string }[] = [
  { value: 'pendiente', label: 'Pendiente', badgeClass: 'bg-slate-100 text-slate-700' },
  { value: 'en_proceso', label: 'En proceso con proveedor', badgeClass: 'bg-blue-100 text-blue-700' },
  { value: 'procesado', label: 'Procesado', badgeClass: 'bg-purple-100 text-purple-700' },
  { value: 'en_camino', label: 'En camino', badgeClass: 'bg-amber-100 text-amber-700' },
  { value: 'recibido', label: 'Recibido', badgeClass: 'bg-green-100 text-green-700' },
  { value: 'cancelado', label: 'Cancelado', badgeClass: 'bg-red-100 text-red-700' },
]
