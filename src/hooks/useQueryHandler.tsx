import { useQuery } from '@tanstack/react-query'
import instance from '../apis/instance.ts'

interface QueryConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: object
}

export function useQueryHandler<TData>({ url, method, body }: QueryConfig) {
  return useQuery<TData, Error>({
    queryKey: [url, method, body],
    queryFn: async () => {
      const response = await instance({
        url,
        method,
        data: body ?? body,
      })
      return response.data
    },
  })
}
