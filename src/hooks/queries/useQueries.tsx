import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import instance from '@/apis/instance.ts'
import { notifyError } from '@/utils/notify.ts'

interface QueryConfig {
  queryKey: string
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: object
  gcTime?: number
  enabled?: boolean
}

export function useQueries<TData>({
  queryKey,
  url,
  method,
  gcTime,
  body,
  enabled,
}: QueryConfig) {
  const navigate = useNavigate()

  return useQuery<TData, AxiosError>({
    queryKey: [queryKey, url, body],
    queryFn: async () => {
      try {
        const response = await instance({
          url,
          method,
          data: body || undefined,
        })
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          switch (status) {
            case 400:
              notifyError(`검색 결과가 없습니다.`)
              break
            case 401:
              notifyError(`세션이 만료되었습니다. 다시 로그인 후 이용해주세요.`)
              setTimeout(() => {
                navigate('/login')
              }, 2000)
              break
            case 403:
              notifyError('페이지에 접근 권한이 없습니다.')
              setTimeout(() => {
                navigate(-1)
              }, 2000)
              break
            default:
              notifyError(
                `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
              )
            // navigate('/error')
          }
        }
        throw new AxiosError()
      }
    },
    retry: 0,
    gcTime: gcTime ? gcTime : 10 * 60000,
    enabled: !!queryKey && !!url && !!method && (enabled ?? true), // 기본값 true
  })
}
