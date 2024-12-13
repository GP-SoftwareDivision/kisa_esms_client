import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import { hasEmptyValue } from '@/utils/hasEmptyValue.ts'
import { isValidPassword } from '@/utils/regexChecks.ts'

interface PasswordRowType {
  seqidx: number
  updatePassword: string
  updatePasswordConfirm: string
}

export const usePasswordUpdateMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  // 유저 수정 API
  const updatePassword = useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: async (request: PasswordRowType) => {
      const isRequestValid = hasEmptyValue(request)

      if (isRequestValid) {
        notifyError('모든 항목을 전부 입력해주세요.')
        throw new Error()
      }

      if (!isValidPassword(request.updatePassword)) {
        notifyError(
          '영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.'
        )
        throw new Error()
      }

      if (request.updatePassword !== request.updatePasswordConfirm) {
        notifyError('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        throw new Error()
      }

      const response = await instance.post('/api/setting/user/PwUpdate', {
        seqidx: request.seqidx,
        password: request.updatePassword,
        passwordConfirm: request.updatePasswordConfirm,
      })
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

      closeModal('update_password')
      queryClient?.invalidateQueries({ queryKey: ['userList'] })
    },
  })

  // 유저 추가 => 모달 열림
  const OpenUpdatePassword = () => {
    openModal('update_password')
  }

  // 유저 추가 취소 => 모달 닫힘
  const CancelUpdatePassword = () => {
    closeModal('update_password')
  }

  return {
    updatePassword,
    OpenUpdatePassword,
    CancelUpdatePassword,
    isUpdatePasswordOpen: isOpen('update_password'),
  }
}
