import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import { hasEmptyValue } from '@/utils/hasEmptyValue.ts'

interface KeywordMutationType {
  keyword: string
  apitype: string
}

export const useKeywordAddMutation = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  // 키워드 추가 API
  const insertKeyword = useMutation({
    mutationKey: ['insertKeyword'],
    mutationFn: async (data: KeywordMutationType) => {
      const isRequestValid = hasEmptyValue(data)
      if (isRequestValid) {
        notifyError('모든 항목을 전부 입력해주세요.')
        throw new Error()
      }
      const response = await instance.post('/api/manage/keyword/insert', data)
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 400:
            notifyError(`중복된 키워드명입니다. \n다시 입력해주세요.`)
            break
          case 401:
            notifyError(
              `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
            )
            setTimeout(() => {
              navigate('/login')
            }, 2000)
            break
          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: () => {
      notifySuccess('추가되었습니다.')

      closeModal('insert_keyword')
      queryClient?.invalidateQueries({ queryKey: ['keywordList'] })
    },
  })

  // 키워드 추가 => 모달 열림
  const openInsertKeyword = () => {
    openModal('insert_keyword')
  }

  // 키워드 추가 취소 => 모달 닫힘
  const closeInsertKeyword = () => {
    closeModal('insert_keyword')
  }

  return {
    insertKeyword,
    openInsertKeyword,
    closeInsertKeyword,
    insertKeywordOpen: isOpen('insert_keyword'),
  }
}
