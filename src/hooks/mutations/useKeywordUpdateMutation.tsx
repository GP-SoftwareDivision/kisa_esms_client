import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 테이블 개별 리스트 타입
interface KeywordRowType {
  apitype: string
  seqidx: number
  useflag: string
  keyword: string
}

export const useKeywordUpdateMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  const [updateData, setUpdateData] = useState<KeywordRowType>({
    apitype: '',
    seqidx: 0,
    useflag: '',
    keyword: '',
  })

  // 키워드 수정 API
  const updateKeyword = useMutation({
    mutationKey: ['updateKeyword'],
    mutationFn: async () => {
      const response = await instance.post(
        '/api/manage/keyword/update',
        updateData
      )
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
    onSuccess: async () => {
      notifySuccess('수정되었습니다.')
      closeModal('update_keyword')
      await queryClient?.invalidateQueries({ queryKey: ['keywordList'] })
    },
  })

  // 키워드 삭제 API
  const deleteKeyword = useMutation({
    mutationKey: ['deleteKeyword'],
    mutationFn: async (request: { items: number[] }) => {
      const isConfirm = confirm('삭제하시겠습니까?')
      if (!isConfirm) throw new Error()

      const response = await instance.post('/api/manage/keyword/delete', {
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

      closeModal('update_user')
      queryClient?.invalidateQueries({ queryKey: ['keywordList'] })
    },
  })

  // 키워드 수정 => 모달 열림
  const openUpdateKeyword = () => {
    openModal('update_keyword')
  }

  // 키워드 수정 취소 => 모달 닫힘
  const closeUpdateKeyword = () => {
    closeModal('update_keyword')
  }

  // selectBox 업데이트
  const handleUpdateOption = (field: keyof KeywordRowType, value: string) => {
    setUpdateData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // textBox 업데이트
  const handleOnUpdateText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setUpdateData((prev) => ({ ...prev, keyword: value }))
    },
    []
  )

  return {
    updateKeyword,
    deleteKeyword,
    openUpdateKeyword,
    closeUpdateKeyword,
    updateKeywordOpen: isOpen('update_keyword'),
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  }
}
