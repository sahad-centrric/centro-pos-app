import { UserType } from '@renderer/config/auth'
import { ipcRenderer } from 'electron'

// Storage keys enum
export enum StorageKey {
  ACCESS_TOKEN = 'access_token',
  USER_DATA = 'user_data',
  REFRESH_TOKEN = 'refresh_token'
}

interface IUser {
  full_name: string
  email: string
  avatar: string
  user_type: UserType
  email_verified?: boolean
  [x: string]: unknown
}

class ElectronStorage {
  // Access token methods
  static getAccessToken(): string | null {
    try {
      return ipcRenderer.sendSync('storage-get', StorageKey.ACCESS_TOKEN)
    } catch (error) {
      console.error('Failed to get access token:', error)
      return null
    }
  }

  static setAccessToken(value: string, maxAge?: number): void {
    try {
      const data = {
        value,
        expires: maxAge ? Date.now() + maxAge * 1000 : null
      }
      ipcRenderer.send('storage-set', StorageKey.ACCESS_TOKEN, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to set access token:', error)
    }
  }

  // User data methods
  static getUserData(): IUser | null {
    try {
      const userData = ipcRenderer.sendSync('storage-get', StorageKey.USER_DATA)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Failed to get user data:', error)
      return null
    }
  }

  static setUserData(userData: IUser): void {
    try {
      ipcRenderer.send('storage-set', StorageKey.USER_DATA, JSON.stringify(userData))
    } catch (error) {
      console.error('Failed to set user data:', error)
    }
  }

  // Generic storage methods
  static setItem(key: string, value: unknown, maxAge?: number): void {
    try {
      const data = {
        value: typeof value === 'string' ? value : JSON.stringify(value),
        expires: maxAge ? Date.now() + maxAge * 1000 : null
      }
      ipcRenderer.send('storage-set', key, JSON.stringify(data))
    } catch (error) {
      console.error(`Failed to set item ${key}:`, error)
    }
  }

  static getItem(key: string): unknown {
    try {
      const rawData = ipcRenderer.sendSync('storage-get', key)
      if (!rawData) return null

      const data = JSON.parse(rawData)

      // Check if item has expired
      if (data.expires && Date.now() > data.expires) {
        this.removeItem(key)
        return null
      }

      return data.value
    } catch (error) {
      console.error(`Failed to get item ${key}:`, error)
      return null
    }
  }

  static removeItem(key: string): void {
    try {
      ipcRenderer.send('storage-remove', key)
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error)
    }
  }

  // Clear all authentication data
  static clearAuthData(): void {
    try {
      this.removeItem(StorageKey.ACCESS_TOKEN)
      this.removeItem(StorageKey.USER_DATA)
      this.removeItem(StorageKey.REFRESH_TOKEN)
    } catch (error) {
      console.error('Failed to clear auth data:', error)
    }
  }

  // Clear all storage
  static clearAll(): void {
    try {
      ipcRenderer.send('storage-clear')
    } catch (error) {
      console.error('Failed to clear all storage:', error)
    }
  }
}

export default ElectronStorage
