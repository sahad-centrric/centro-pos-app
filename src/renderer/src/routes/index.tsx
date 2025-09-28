import ProtectedLayout from '@renderer/components/hocs/ProtectedLayout'
import POSInterface from '@renderer/components/layout/pos-Interface'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <ProtectedLayout>
      <POSInterface />
    </ProtectedLayout>
  )
})