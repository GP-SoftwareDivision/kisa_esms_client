import { AxiosError } from 'axios'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import { hasEmptyValue } from '@/utils/hasEmptyValue.ts'
import { isValidEmail } from '@/utils/regexChecks.ts'

interface UserRowType {
  seqidx: number
  name: string
  email: string
  password: string
  phonenum: string
  usertype: string
  groupcode: string
  useflag: string
}

export const useUserUpdateMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [updateData, setUpdateData] = useState<UserRowType>({
    seqidx: 0,
    name: '',
    email: '',
    password: '',
    phonenum: '',
    usertype: '',
    groupcode: '',
    useflag: '',
  })
  const { openModal, closeModal, isOpen } = useModal()

  // 유저 수정 API
  const updateUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async () => {
      const request = {
        seqidx: updateData.seqidx,
        groupcode: updateData.groupcode,
        email: updateData.email,
        name: updateData.name,
        phonenum: updateData.phonenum,
        usertype: updateData.usertype,
        useflag: updateData.useflag,
      }
      const isRequestValid = hasEmptyValue(request)
      if (isRequestValid) {
        notifyError('모든 항목을 전부 입력해주세요.')
        throw new Error()
      }
      if (!isValidEmail(request.email)) {
        notifyError('이메일 형식이 맞지 않습니다.')
        throw new Error()
      }
      const response = await instance.post('/api/setting/user/update', request)
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
      notifySuccess('수정되었습니다.')

      closeModal('update_user')
      queryClient?.invalidateQueries({ queryKey: ['userList'] })
    },
  })

  // 유저 수정 API
  const deleteUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (request: { items: number[] }) => {
      const isConfirm = confirm('삭제하시겠습니까?')
      if (!isConfirm) throw new Error()
      const response = await instance.post('/api/setting/user/delete', {
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
      queryClient?.invalidateQueries({ queryKey: ['userList'] })
    },
  })

  // 유저 추가 => 모달 열림
  const handleOnUpdateUser = () => {
    openModal('update_user')
  }

  // 유저 추가 취소 => 모달 닫힘
  const handleOnUpdateUserCancel = () => {
    closeModal('update_user')
  }

  // selectBox 업데이트
  const handleUpdateOption = (field: keyof UserRowType, value: string) => {
    setUpdateData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // textBox 업데이트
  const handleOnUpdateText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      if (id === 'update_name')
        setUpdateData((prev) => ({ ...prev, name: value }))
      if (id === 'update_id') setUpdateData((prev) => ({ ...prev, id: value }))
      if (id === 'update_email')
        setUpdateData((prev) => ({ ...prev, email: value }))
      if (id === 'update_password')
        setUpdateData((prev) => ({ ...prev, password: value }))
      if (id === 'update_phonenum')
        setUpdateData((prev) => ({ ...prev, phonenum: value }))
    },
    []
  )

  return {
    updateUser,
    deleteUser,
    updateData,
    setUpdateData,
    handleOnUpdateUser,
    handleOnUpdateUserCancel,
    updateUserOpen: isOpen('update_user'),
    handleUpdateOption,
    handleOnUpdateText,
  }
}
