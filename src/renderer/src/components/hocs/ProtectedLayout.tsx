import { ReactNode } from 'react'
import AuthGuard from '@renderer/components/hocs/AuthGuard'

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>
}

export default ProtectedLayout
