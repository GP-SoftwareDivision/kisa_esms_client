import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notify } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface GroupMutationType {
  groupname: string
  comment: string
}

interface RequestType extends GroupMutationType {
  kakaoflag: string
  emailflag: string
  autosendflag: string
  useflag: string
}

export const useGroupAddMutation = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  const [kakaoFlag, setKakaoFlag] = useState<string>('')
  const [emailFlag, setEmailFlag] = useState<string>('')
  const [autoSendFlag, setAutoSendFlag] = useState<string>('')
  const [useFlag, setUseFlag] = useState<string>('')

  // 그룹 추가 API
  const insertGroup = useMutation({
    mutationKey: ['checkAuth'],
    mutationFn: async (data: GroupMutationType) => {
      const request: RequestType = {
        groupname: data.groupname,
        kakaoflag: kakaoFlag,
        emailflag: emailFlag,
        autosendflag: autoSendFlag,
        comment: data.comment,
        useflag: useFlag,
      }
      const response = await instance.post('/api/manage/groupInsert', request)
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
    onSuccess: () => {
      notify('추가되었습니다.')

      closeModal('insert_group')
      queryClient?.invalidateQueries({ queryKey: ['groupList'] })
    },
  })

  // 그룹 추가 => 모달 열림
  const handleOnAddGroup = () => {
    openModal('insert_group')
  }

  // 그룹 추가 취소 => 모달 닫힘
  const handleOnAddGroupCancel = () => {
    closeModal('insert_group')
  }

  return {
    insertGroup,
    handleOnAddGroup,
    handleOnAddGroupCancel,
    insertGroupOpen: isOpen('insert_group'),
    setAutoSendFlag,
    setUseFlag,
    setEmailFlag,
    setKakaoFlag,
  }
}
