// src/renderer/components/ErrorBoundary.tsx
import { Button } from '@renderer/components/ui/button'
import React from 'react'

interface ErrorBoundaryProps {
  error: Error
  reset: () => void
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ error, reset }) => {
  console.error(error)
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-6 w-screen h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>

      <p className="text-gray-700 mb-2">{error.message}</p>
      <p className="text-gray-500 mb-6">Please try again or refresh the page.</p>

      <div className="flex gap-4">
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={reset}>
          Try Again
        </Button>

        <Button
          className="bg-gray-300 hover:bg-gray-400 text-black"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>
      </div>
    </div>
  )
}

export default ErrorBoundary
