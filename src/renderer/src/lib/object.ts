export function toQueryParams(object: any): string {
  const params = object as Record<string, any>
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v))
    } else {
      searchParams.append(key, value)
    }
  })

  const queryString = searchParams.toString()

  return queryString ? `?${queryString}` : ''
}

export function StringReplaceWithObject(text: string, params: { [key: string]: string }): string {
  const regex = /:(\w+)/g

  return text?.replace(regex, (match, paramName) => {
    return params[paramName] !== undefined ? params[paramName] : match
  })
}

export function updateQueryParamsWithReplaceState(
  params: Record<string, string | number | boolean | (string | number | boolean)[]>
): void {
  const url = new URL(window.location.href)
  const searchParams = new URLSearchParams(url.search)

  // Loop through the object and set the parameters
  Object.keys(params).forEach((key) => {
    const value = params[key]

    if (value == undefined || value === '' || value == null) {
      searchParams.delete(key)
    } else if (Array.isArray(value)) {
      searchParams.delete(key) // Delete existing key to prevent duplicates
      value.forEach((item) => {
        searchParams.append(key, String(item))
      })
    } else {
      searchParams.set(key, String(value))
    }
  })

  // Update the URL with new query parameters
  url.search = searchParams.toString()

  // Use replaceState to update the URL without reloading the page
  window.history.replaceState({}, '', url.toString())
}

export const removeNoneKeys = (obj: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== 'none'))
}

export function omitObject<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const newObj = { ...obj }

  for (const key of keys) {
    delete newObj[key]
  }

  return newObj
}

export const isEmptyObject = (obj: any) =>
  obj && typeof obj === 'object' && Object.keys(obj).length === 0

export function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj)
}

type DataObject = {
  [key: string]: any
}

export function filterValues(
  data: DataObject,
  searchValue: string,
  keysToSearch: string[]
): DataObject | undefined {
  const result: DataObject = {}
  let hasMatch = false

  for (const key of keysToSearch) {
    if (data[key] && data[key].toString().toLowerCase().includes(searchValue.toLowerCase())) {
      result[key] = data[key]
      hasMatch = true
    }
  }

  return hasMatch ? result : undefined
}
