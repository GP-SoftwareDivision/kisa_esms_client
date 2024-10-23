import { useMutation } from '@tanstack/react-query'
import instance from '../apis/instance.ts'

type ApiMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

interface UseApiRequestParams {
  method: ApiMethod
  url: string
  data: object
}

export const useApiHandler = (requestId: string) => {
  return useMutation<any, Error, UseApiRequestParams>({
    mutationKey: [requestId],
    mutationFn: async ({ method, url, data }: UseApiRequestParams) => {
      const res = await instance({
        method,
        url,
        data,
      })
      return JSON.parse(res.data)
    },
    onError: (error) => {
      console.error(`오류 발생 (${requestId}):`, error)
    },
  })
}
