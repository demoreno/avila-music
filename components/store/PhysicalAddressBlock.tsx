import { showPhysicalAddress } from '@/lib/geo'

export default async function PhysicalAddressBlock() {
  const showAddress = await showPhysicalAddress()

  if (showAddress) {
    return (
      <p>Oficina Comercial (Previa Cita) — Av. Urdaneta, Torre Alfa, Of. 8A, Caracas, Distrito Capital, Venezuela</p>
    )
  }

  return (
    <p>Venta online con envíos a todo el país</p>
  )
}
