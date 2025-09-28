import ErrorBoundary from '@renderer/components/hocs/ErrorBoundary'
import Providers from '@renderer/providers/Providers'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <Providers>
    <Outlet />
    <TanStackRouterDevtools />
  </Providers>
)

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: ({ error, reset }) => <ErrorBoundary error={error} reset={reset} />
})
