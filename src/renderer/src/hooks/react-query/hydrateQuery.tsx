import { cache } from 'react'

import { dehydrate } from '@tanstack/react-query'

import type { METHOD } from './useReactQuery'
import { makeRequest } from './useReactQuery'

import { queryClient } from './client'
import { toQueryParams } from '@renderer/lib/object'
import { type IRequestConfig } from '@renderer/services/fetchAPI'

const getQueryClient = cache(() => queryClient)

type apiListType = {
  endpoint: string
  method?: METHOD
  data?: any
  dependency?: any[]
  config?: IRequestConfig
  isFormData?: boolean
  queryParams?: object
  disable?: boolean
}[]

export const getHydratedState = async (apiList: apiListType) => {
  const queryClient = getQueryClient()

  const promiseList: Array<any> = []

  apiList
    .filter((item) => !item.disable)
    .forEach((item) => {
      const { endpoint, method = 'GET', data, isFormData, config, queryParams, dependency } = item

      promiseList.push(
        queryClient.prefetchQuery({
          queryKey: [endpoint, ...(dependency || [])],
          queryFn: async () =>
            await makeRequest(
              `${endpoint}${toQueryParams(queryParams || {})}`,
              method,
              data,
              config,
              isFormData
            )
        })
      )
    })
  await Promise.all(promiseList)

  return dehydrate(queryClient)
}
