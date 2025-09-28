import { ReactNode } from 'react'
import { Toaster } from '@renderer/components/ui/sonner'
import QueryProvider from '@renderer/hooks/react-query/queryClientProvider'
import { MountPoint } from '@renderer/components/ui/react-confirm/mounter'

type Props = {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      {children}
      <MountPoint />
      <Toaster />
    </QueryProvider>
  )
}

export default Providers
