
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'

import { useAuthMutation } from './useAuthMutation'
import instance from '@/apis/instance.ts'
import { notifyError } from '@/utils/notify.ts'

interface LoginMutationType {
  id: string
  password: string
}

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const [phoneNum, setPhoneNum] = useState<string>('')
  const { checkAuth } = useAuthMutation()

  // 로그인 취소
  const handleOnCancel = () => {
    setPhoneNum('')
  }

  // 로그인 API 통신
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginMutationType) => {
      const response = await instance.post('/api/login/selectMember', data)
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 401:
            notifyError('아이디나 비밀번호가 일치하지 않습니다.')
            break
          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: (response) => {
      const { phonenum, code } = response.data
      checkAuth.mutate({ phonenum: phonenum, authnum: code }) // 인증번호 체크
    },
  })
  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await instance.delete('/auth')
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        notifyError(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
      }
    },
    onSuccess: () => {
      navigate('/login')
    },
  })
  return {
    login,
    phoneNum,
    handleOnCancel,
    logout,
  }
}
