import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 테이블 개별 리스트 타입
export interface DamageTargetRowType {
  incidentId: string
  institution: string
  issueIdx: number
  reason: string
  reason_etc: string
  registrationDate: string
  reportFlag: string
  seqidx: number
  supportFlag: string
  targetType: string
}

export const useDamageTargetUpdateMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  const [updateData, setUpdateData] = useState<DamageTargetRowType>({
    incidentId: '',
    institution: '',
    issueIdx: 0,
    reason: '',
    reason_etc: '',
    registrationDate: '',
    reportFlag: '',
    seqidx: 0,
    supportFlag: '',
    targetType: '',
  })

  // 피해 대상 수정 API
  const updateDamageTarget = useMutation({
    mutationKey: ['updateDamageTarget'],
    mutationFn: async () => {
      const { reason_etc, ...req } = updateData
      req.reason = reason_etc ? `${req.reason}:${reason_etc}` : req.reason
      req.supportFlag = req.supportFlag ?? ''

      const response = await instance.post('/api/issue/victims/update', req)
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
          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: async () => {
      notifySuccess('수정되었습니다.')
      closeModal('update_damageTarget')
      await queryClient?.invalidateQueries({ queryKey: ['damageTargetList'] })
    },
  })

  // 피해 대상 수정 => 모달 열림
  const openUpdateDamageTarget = () => {
    openModal('update_damageTarget')
  }

  // 피해 대상 수정 취소 => 모달 닫힘
  const closeUpdateDamageTarget = () => {
    closeModal('update_damageTarget')
  }

  // selectBox 업데이트
  const handleUpdateOption = (
    field: keyof DamageTargetRowType,
    value: string
  ) => {
    setUpdateData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // textBox 업데이트
  const handleOnUpdateText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      if (id === 'update_institution')
        setUpdateData((prev) => ({ ...prev, institution: value }))
      if (id === 'update_incidentId')
        setUpdateData((prev) => ({ ...prev, incidentId: value }))
      if (id === 'update_reason_etc')
        setUpdateData((prev) => ({ ...prev, reason_etc: value }))
    },
    []
  )

  return {
    updateDamageTarget,
    openUpdateDamageTarget,
    closeUpdateDamageTarget,
    updateDamageTargetOpen: isOpen('update_damageTarget'),
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  }
}
