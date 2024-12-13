import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notifyError, notifySuccess } from '@/utils/notify.ts'

export const useSearchHistoryDeleteMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteRuleset'],
    mutationFn: async (request: { items: number[] }) => {
      const isConfirm = confirm('삭제하시겠습니까?')
      if (!isConfirm) throw new Error()
      const response = await instance.post('/api/manage/rule/delete', {
        seqidx: request.items.join(','),
      })
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 400:
            notifyError(`중복된 계정입니다. 다시 입력해주세요.`)
            break
          case 401:
            notifyError(
              `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
            )
            setTimeout(() => {
              navigate('/login')
            }, 3000)
            break

          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: () => {
      notifySuccess('삭제되었습니다.')

      queryClient?.invalidateQueries({ queryKey: ['searchHistoryList'] })
    },
  })
}
