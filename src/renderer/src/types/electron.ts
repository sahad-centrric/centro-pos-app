export interface AuthData {
  user?: string
  sessionId?: string
  csrfToken?: string
  isAuthenticated: boolean
  userData?: any
}
