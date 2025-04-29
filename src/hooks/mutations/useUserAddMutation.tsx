import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import instance from '@/apis/instance.ts'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { hasEmptyValue } from '@/utils/hasEmptyValue.ts'
import { isValidEmail, isValidPassword } from '@/utils/regexChecks.ts'

interface UserMutationType {
  name: string
  email: string
  id: string
  password: string
  passwordConfirm: string
  phonenum: string
  usertype: string
  groupcode: string
}

export const useUserAddMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  // 그룹 수정 API
  const insertUser = useMutation({
    mutationKey: ['insertUser'],
    mutationFn: async (data: UserMutationType) => {
      const isRequestValid = hasEmptyValue(data)
      if (isRequestValid) {
        notifyError('모든 항목을 전부 입력해주세요.')
        throw new Error()
      }
      if (!isValidEmail(data.email)) {
        notifyError('이메일 형식이 맞지 않습니다.')
        throw new Error()
      }
      if (!isValidPassword(data.password)) {
        notifyError(
          '영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.'
        )
        throw new Error()
      }
      if (data.password !== data.passwordConfirm) {
        notifyError('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        throw new Error()
      }
      const response = await instance.post('/api/setting/user/insert', data)
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 409:
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
    onSuccess: async () => {
      notifySuccess('추가되었습니다.')

      closeModal('insert_user')
      await queryClient?.invalidateQueries({ queryKey: ['userList'] })
    },
  })

  // 유저 추가 => 모달 열림
  const handleOnAddUser = () => {
    openModal('insert_user')
  }

  // 유저 추가 취소 => 모달 닫힘
  const handleOnAddUserCancel = () => {
    closeModal('insert_user')
  }

  return {
    insertUser,
    handleOnAddUser,
    handleOnAddUserCancel,
    insertUserOpen: isOpen('insert_user'),
  }
}
