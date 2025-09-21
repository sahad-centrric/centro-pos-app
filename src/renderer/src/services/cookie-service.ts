// main/cookies.ts
import { session } from 'electron'

export class ElectronCookies {
  private static get defaultSession() {
    return session.defaultSession.cookies
  }

  // Get a specific cookie by name
  static async getCookie(name: string, url = 'http://localhost') {
    const cookies = await this.defaultSession.get({ name, url })
    return cookies.length ? cookies[0].value : null
  }

  // Set a cookie
  static async setCookie(
    name: string,
    value: string,
    maxAgeSeconds = 3600,
    url = 'http://localhost'
  ) {
    const expiration = Math.floor(Date.now() / 1000) + maxAgeSeconds

    await this.defaultSession.set({
      url,
      name,
      value,
      path: '/',
      expirationDate: expiration,
      secure: false, // change to true for HTTPS in production
      httpOnly: true
    })
  }

  // Delete a specific cookie
  static async deleteCookie(name: string, url = 'http://localhost') {
    await this.defaultSession.remove(url, name)
  }

  // Delete all cookies
  static async clearAllCookies() {
    await this.defaultSession.flushStore()
    await session.defaultSession.clearStorageData({ storages: ['cookies'] })
  }
}
