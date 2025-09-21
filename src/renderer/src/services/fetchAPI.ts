import { toast } from 'react-toastify'

import ElectronStorage from './electron-storage'

function jsonToFormData(
  json: any,
  formData: FormData = new FormData(),
  parentKey: string | null = null
): FormData {
  if (json && typeof json === 'object' && !(json instanceof File)) {
    Object.keys(json).forEach((key) => {
      const value = json[key]
      const newKey = parentKey ? `${parentKey}` : key

      jsonToFormData(value, formData, newKey)
    })
  } else {
    if (parentKey !== null) {
      formData.append(parentKey, json)
    }
  }

  return formData
}

export interface IRequestInit extends RequestInit {
  QParams?: any
  next?: any // Removed NextFetchRequestConfig as it's Next.js specific
  isList?: boolean
}

export async function sendRequest(
  url: string,
  method: string,
  data: any,
  config?: IRequestInit,
  isFormData?: boolean,
  baseUrl?: string
): Promise<any> {
  // Get base URL from environment or use default
  const base_url = baseUrl || process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
  const accessToken = ElectronStorage.getAccessToken()
  const headers: any = { ...(config?.headers || {}) }

  if (accessToken) {
    headers.Authorization = `${accessToken}`
  }

  const body: RequestInit['body'] = isFormData ? jsonToFormData(data) : JSON.stringify(data)

  try {
    const response = await fetch(`${base_url}${url}`, {
      ...config,
      method,
      headers: {
        Accept: 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers
      },
      body: body
    })

    const json = await response.json()

    if (response.status === 401) {
      toast.error(json?.error || 'Unauthorized. Please login again.')
    }

    if (json?.error === 'Session expired. Please login again.') {
      if (!config?.isList) {
        setTimeout(() => ElectronStorage.clearAuthData(), 5000)
      }
    }

    if (response.ok) {
      return json
    } else {
      throw json
    }
  } catch (error) {
    console.error('Network request failed:', error)
    throw error
  }
}
