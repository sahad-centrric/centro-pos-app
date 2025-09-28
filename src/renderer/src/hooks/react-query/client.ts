import { QueryClient, type QueryClientConfig } from '@tanstack/react-query'

export const queryOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5000,
      refetchOnMount: true
    }
  }
}

export const queryClient = new QueryClient(queryOptions)
