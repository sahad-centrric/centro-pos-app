import { ElectronAPI } from '@electron-toolkit/preload'

interface CustomElectronAPI {
  auth: {
    storeAuthData: (data: any) => Promise<boolean>
    getAuthData: () => Promise<any>
    clearAuthData: () => Promise<boolean>
    setSessionCookie: (cookieDetails: {
      name: string
      value: string
      domain: string
      httpOnly?: boolean
      secure?: boolean
    }) => Promise<boolean>
    clearSessionCookies: () => Promise<boolean>
    storeUserPreferences: (preferences: any) => Promise<boolean>
    getUserPreferences: () => Promise<any>
    clearUserPreferences: () => Promise<boolean>
  }
  app: {
    getVersion: () => Promise<string>
    getUserDataPath: () => Promise<string>
  }
  events: {
    onRedirectToLogin: (callback: () => void) => void
    removeAllListeners: (channel: string) => void
    onThemeChanged: (callback: (theme: string) => void) => void
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    electronAPI?: CustomElectronAPI // Your custom API

  }
}
