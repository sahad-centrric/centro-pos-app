
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI, LoginCredentials, FrappeLoginResponse } from '../api/auth'

interface User {
  id: string | null
  name: string
  email: string
  role: string
}

interface AuthStore {
  // State
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  setLoading: (loading: boolean) => void
  validateSession: () => Promise<boolean> // ✅ Add this
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      validateSession: async () => {
        try {
          // Try to get current user info
          const response = await authAPI.getCurrentUser()

          if (response && response.message === 'Logged In') {
            // Session is valid, update user data
            const userData = {
              id: 'administrator',
              name: response.full_name || 'Administrator',
              email: 'administrator',
              role: 'Administrator'
            }

            set({
              user: userData,
              isAuthenticated: true,
              error: null
            })

            return true
          } else {
            // Session invalid
            get().logout()
            return false
          }
        } catch (error) {
          // Session expired or invalid
          console.log('Session validation failed:', error)
          get().logout()
          return false
        }
      },

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })

        try {
          const response: FrappeLoginResponse = await authAPI.login(credentials)

          if (response.message === 'Logged In') {
            const userData = {
              id: 'administrator',
              name: response.full_name || 'Administrator',
              email: 'administrator',
              role: 'Administrator'
            }

            localStorage.setItem('userData', JSON.stringify(userData))

            set({
              user: userData,
              token: null,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
          } else {
            throw new Error('Login failed')
          }
        } catch (error: any) {
          let errorMessage = 'Login failed. Please try again.'

          if (error.response?.data?.exc_type === 'AuthenticationError') {
            errorMessage = 'Invalid username or password'
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message
          } else if (error.message === 'Network Error') {
            errorMessage = 'Network error. Please check your connection.'
          }

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage
          })
          throw error
        }
      },

      // Logout action
      logout: () => {
        // Clear stored data
        localStorage.removeItem('userData')

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Set loading state
      setLoading: (loading: boolean) => set({ isLoading: loading })
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user
      })
    }
  )
)

export default useAuthStore
