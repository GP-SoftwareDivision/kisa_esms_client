import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import instance from '../apis/instance.ts'
import { notify } from '@/utils/notify.ts'

interface QueryConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: object
  options?: object
}

export function useQueryHandler<TData>({
  url,
  method = 'GET',
  body,
}: QueryConfig) {
  const navigate = useNavigate()
  return useQuery<TData, AxiosError>({
    queryKey: [url, method, body],
    queryFn: async () => {
      try {
        const response = await instance({
          url,
          method,
          data: body,
        })
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          switch (status) {
            case 400:
              notify(`검색 결과가 없습니다.`)
              break

            case 401:
              notify(
                `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
              )
              setTimeout(() => {
                navigate('/login')
              }, 3000)
              break

            case 403:
              notify('페이지에 접근 권한이 없습니다.')
              setTimeout(() => {
                navigate('/login')
              }, 3000)
              break

            default:
              notify(
                `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
              )
          }
        }
        return {} as TData
      }
    },
    staleTime: 300000,
  })
}
