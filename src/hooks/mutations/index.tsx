import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import instance from '@/apis/instance.ts'
import { notify } from '@/utils/notify.ts'

type ApiMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

interface UseApiRequestParams {
  method: ApiMethod
  url: string
  data?: object
}

export const useMutationHandler = (requestId: string) => {
  const navigate = useNavigate()
  return useMutation<any, Error, UseApiRequestParams>({
    mutationKey: [requestId],
    mutationFn: async ({ method, url, data }: UseApiRequestParams) => {
      const response = await instance({
        method,
        url,
        data: data ?? data,
      })
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 401:
            notify(
              `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
            )
            setTimeout(() => {
              navigate('/login')
            }, 3000)
            break

          default:
            notify(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
        }
      }
    },
  })
}
