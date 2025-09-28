import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import type { UseMutationOptions, UseQueryOptions, UseMutateFunction } from '@tanstack/react-query'
import { toast } from 'sonner'

import { sendRequest, type IRequestConfig } from '@renderer/services/fetchAPI'
import { StringReplaceWithObject, toQueryParams } from '@renderer/lib/object'
import { COMMON_ERROR_MESSAGE } from '@renderer/data/messages'

export type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface UseCustomQueryOptions extends Omit<UseQueryOptions, 'queryKey'> {
  queryKey?: string[]
  enabled?: boolean
}

interface DataStructure {
  params: any
  data: any
}

export interface IGetQuery {
  endPoint: string
  queryParams?: object
  data?: any
  method?: METHOD
  enabled?: any
  dependency?: Array<any>
  options?: UseCustomQueryOptions
  config?: IRequestConfig | undefined
  select?: (data: any) => void
  replaceObjectWithEndpoint?: { [x: string]: string }
}

interface IMutateQueryType {
  endPoint: string
  dependency?: Array<any>
  method?: METHOD
  options?: UseMutationOptions<unknown, Error, DataStructure, unknown>
  config?: IRequestConfig | undefined
  isFormData?: boolean
  disableDefaultError?: boolean
  baseUrl?: string
  replaceObjectWithEndpoint?: { [x: string]: string }
  queryParams?: Record<string, any>
}

export type MutateFunction = UseMutateFunction<
  any,
  Error,
  {
    data: any | undefined
    params: any | undefined
    method?: METHOD | undefined
    endpoint?: string | undefined
    replace?: { [x: string]: string }
  },
  unknown
>

export const makeRequest = async (
  url: string,
  method: METHOD,
  data: any,
  config?: IRequestConfig,
  isFormData?: boolean,
  base_url?: string
): Promise<any> => {
  return await sendRequest(url, method, data, config, isFormData, base_url)
}

export function useGetQuery(props: IGetQuery) {
  const {
    endPoint,
    method = 'GET',
    data = undefined,
    queryParams = {},
    dependency = [],
    select,
    enabled,
    config,
    options,
    replaceObjectWithEndpoint
  } = props

  const {
    data: resData,
    refetch,
    ...restProps
  } = useQuery({
    queryKey: [endPoint, ...dependency],
    retry: false,
    enabled,
    select,
    queryFn: () =>
      makeRequest(
        `${StringReplaceWithObject(endPoint, replaceObjectWithEndpoint || {})}${toQueryParams(queryParams || {})}`,
        method,
        data,
        config,
        false
      ),
    ...options
  })

  const refreshWithToast = (message: string) => refetch().then(() => toast.success(message))

  return {
    ...restProps,
    refreshWithToast: refreshWithToast,
    refetch,
    data: resData as any
  }
}

export function useMutationQuery(props: IMutateQueryType) {
  const {
    dependency = [],
    endPoint,
    method = 'POST',
    options,
    config,
    isFormData,
    disableDefaultError,
    baseUrl,
    replaceObjectWithEndpoint,
    queryParams
  } = props

  const { data, error, mutate, ...restProps } = useMutation({
    mutationKey: [endPoint, ...dependency],
    mutationFn: (body: {
      data?: any
      params?: any
      method?: METHOD
      endpoint?: string
      replace?: { [x: string]: string }
    }) => {
      const { data, params, method: mutateMethod, endpoint: mutateEndpoint, replace } = body

      return makeRequest(
        `${StringReplaceWithObject(
          mutateEndpoint ?? endPoint,
          replace || replaceObjectWithEndpoint || {}
        )}${toQueryParams(queryParams || params || {})}`,
        mutateMethod ?? method,
        data,
        config,
        isFormData,
        baseUrl
      )
    },
    ...(!disableDefaultError && {
      onError: (error: any) => {
        console.error(error)
        toast.error(
          (error?.error as string)?.replace?.('Error', '')?.replace?.('Error:', '') ||
            COMMON_ERROR_MESSAGE
        )
      }
    }),
    ...options
  })

  return {
    responseData: data as any,
    fullResponse: { ...(data as object), ...error } as any,
    errorMsg: (error as any)?.response?.data?.message || error?.message,
    mutate: mutate as MutateFunction,
    data: data as any,
    error,
    ...restProps
  }
}

export function useMediaMutationQuery(isMutliple?: boolean) {
  return useMutationQuery({
    endPoint: isMutliple ? '/bulk' : '/',
    method: 'POST',
    baseUrl: process.env.NEXT_PUBLIC_MEDIA_URL,
    isFormData: true
  })
}

export function useGetQueries(queries: IGetQuery[]) {
  const results = useQueries({
    queries: queries.map((query) => {
      const {
        endPoint,
        method = 'GET',
        data = undefined,
        queryParams = {},
        dependency = [],
        select,
        enabled,
        config,
        options
      } = query

      return {
        queryKey: [endPoint, ...dependency],
        retry: false,
        enabled,
        select,
        queryFn: () =>
          makeRequest(
            `${endPoint}${toQueryParams(queryParams || {})}`,
            method,
            data,
            config,
            false
          ),
        ...options
      }
    })
  })

  return results
}
