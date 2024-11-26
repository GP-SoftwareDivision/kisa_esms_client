import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notify } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 테이블 개별 리스트 타입
interface GroupRowType {
  groupcode: number
  groupname: string
  comment: string
  alram: string
  autosendflag: string
  kakaoflag: string
  emailflag: string
  useflag: string
  updatedate: string
}

export const useGroupUpdateMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  const [updateData, setUpdateData] = useState<GroupRowType>({
    groupcode: 0,
    groupname: '',
    comment: '',
    alram: '',
    autosendflag: '',
    kakaoflag: '',
    emailflag: '',
    useflag: '',
    updatedate: '',
  })

  // 그룹 수정 API
  const updateGroup = useMutation({
    mutationKey: ['checkAuth'],
    mutationFn: async () => {
      const response = await instance.post(
        '/api/manage/groupUpdate',
        updateData
      )
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
            }, 2000)
            break

          default:
            notify(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
        }
      }
    },
    onSuccess: () => {
      notify('수정되었습니다.')
      closeModal('update_group')
      queryClient?.invalidateQueries({ queryKey: ['groupList'] })
    },
  })

  // 그룹 수정 => 모달 열림
  const handleOnUpdateGroup = () => {
    openModal('update_group')
  }

  // 그룹 수정 취소 => 모달 닫힘
  const handleOnUpdateGroupCancel = () => {
    closeModal('update_group')
  }

  // selectBox 업데이트
  const handleUpdateFlag = (field: keyof GroupRowType, value: string) => {
    setUpdateData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // textBox 업데이트
  const handleOnUpdateText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      if (id === 'update_groupname')
        setUpdateData((prev) => ({ ...prev, groupname: value }))
      if (id === 'update_comment')
        setUpdateData((prev) => ({ ...prev, comment: value }))
    },
    []
  )

  return {
    updateGroup,
    handleOnUpdateGroup,
    handleOnUpdateGroupCancel,
    updateGroupOpen: isOpen('update_group'),
    updateData,
    setUpdateData,
    handleUpdateFlag,
    handleOnUpdateText,
  }
}
