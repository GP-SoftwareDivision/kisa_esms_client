import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import instance from '@/apis/instance.ts'
import useModal from '@/hooks/common/useModal.tsx'

interface SearchSaveMutationType {
  type: string
  searchlog: string
  title: string
}

export const useSearchSaveMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  const SaveSearch = useMutation({
    mutationKey: ['SaveSearch'],
    mutationFn: async (data: SearchSaveMutationType) => {
      const response = await instance.post(
        '/api/manage/search/history/insert',
        data
      )
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 401:
            notifyError(
              `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
            )
            setTimeout(() => {
              navigate('/login')
            }, 2000)
            break
          case 409:
            notifyError(`이미 존재하는 조건입니다.`)
            break
          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: () => {
      notifySuccess('저장되었습니다.')
      queryClient?.invalidateQueries({ queryKey: ['searchHistoryList'] })
    },
  })

  // 유저 추가 => 모달 열림
  const handleOnAddSearch = () => {
    openModal('insert_search')
  }

  // 유저 추가 취소 => 모달 닫힘
  const handleOnAddSearchCancel = () => {
    closeModal('insert_search')
  }
  return {
    SaveSearch,
    handleOnAddSearch,
    handleOnAddSearchCancel,
    insertSearchOpen: isOpen('insert_search'),
  }
}
