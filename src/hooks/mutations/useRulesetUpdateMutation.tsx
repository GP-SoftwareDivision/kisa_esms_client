import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hasEmptyValue } from '@/utils/hasEmptyValue.ts'

// 테이블 개별 리스트 타입
interface RulesetRowType {
  seqidx: number
  type: string
  rule: string
  useflag: string
  hackingflag: string
}

export const useRulesetUpdateMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  const [updateData, setUpdateData] = useState<RulesetRowType>({
    seqidx: 0,
    type: '',
    rule: '',
    useflag: '',
    hackingflag: '',
  })

  // 키워드 수정 API
  const updateRuleset = useMutation({
    mutationKey: ['updateRuleset'],
    mutationFn: async () => {
      const isRequestValid = hasEmptyValue(updateData)
      if (isRequestValid) {
        notifyError('모든 항목을 전부 입력해주세요.')
        throw new Error()
      }
      const { type, ...rest } = updateData
      const request = { apitype: type, ...rest }

      const response = await instance.post('/api/manage/rule/update', request)
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
      closeModal('update_ruleset')
      await queryClient?.invalidateQueries({ queryKey: ['ruleList'] })
    },
  })

  // 키워드 삭제 API
  const deleteRuleset = useMutation({
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
            closeModal('insert_ruleset')
        }
      }
    },
    onSuccess: () => {
      notifySuccess('삭제되었습니다.')

      closeModal('update_user')
      queryClient?.invalidateQueries({ queryKey: ['ruleList'] })
    },
  })

  // 키워드 수정 => 모달 열림
  const openUpdateRuleset = () => {
    openModal('update_ruleset')
  }

  // 키워드 수정 취소 => 모달 닫힘
  const closeUpdateRuleset = () => {
    closeModal('update_ruleset')
  }

  // selectBox 업데이트
  const handleUpdateOption = (field: keyof RulesetRowType, value: string) => {
    setUpdateData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // textBox 업데이트
  const handleOnUpdateText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setUpdateData((prev) => ({ ...prev, rule: value }))
    },
    []
  )

  return {
    updateRuleset,
    deleteRuleset,
    openUpdateRuleset,
    closeUpdateRuleset,
    updateRulesetOpen: isOpen('update_ruleset'),
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  }
}
