import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import { hasEmptyValue } from '@/utils/hasEmptyValue.ts'

interface GroupMutationType {
  groupname: string
  comment?: string
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
    mutationKey: ['insertGroup'],
    mutationFn: async (data: GroupMutationType) => {
      const request: RequestType = {
        groupname: data.groupname,
        kakaoflag: kakaoFlag,
        emailflag: emailFlag,
        autosendflag: autoSendFlag,
        useflag: useFlag,
      }
      const isRequestValid = hasEmptyValue(request)
      if (isRequestValid) {
        notifyError('모든 항목을 전부 입력해주세요.')
        throw new Error()
      }
      const response = await instance.post('/api/manage/groupInsert', {
        ...request,
        comment: data.comment ? data.comment : '',
      })
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 400:
            notifyError(`중복된 그룹명입니다. \n다시 입력해주세요.`)
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
