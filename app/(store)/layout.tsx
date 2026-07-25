import StoreShell from './StoreShell'
import PhysicalAddressBlock from '@/components/store/PhysicalAddressBlock'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreShell footerAddressSlot={<PhysicalAddressBlock />}>
      {children}
    </StoreShell>
  )
}
