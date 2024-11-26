import { useState } from 'react'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notify } from '@/utils/notify.ts'

interface AuthMutationType {
  phoneNum: string
}

export const useAuthMutation = () => {
  const navigate = useNavigate()
  const [authNum, setAuthNum] = useState<string>('')

  // 인번호 체크 API 통신
  const checkAuth = useMutation({
    mutationKey: ['checkAuth'],
    mutationFn: async (data: AuthMutationType) => {
      if (!authNum) {
        notify('인증번호를 입력해주세요.')
        return
      }
      const response = await instance.post('/auth', {
        phonenum: data.phoneNum,
        authnum: authNum,
      })
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        notify(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
      }
    },
    onSuccess: (response) => {
      const { message } = response
      switch (message) {
        case 'success':
          navigate('/main/dashboard')
          break
        case 'timeout':
          notify('인증 시간이 지났습니다. 재전송을 눌러주세요.')
          break
        case 'fail':
          notify('인증번호가 일치하지 않습니다.')
          break
        default:
          console.warn(`Unexpected message: ${message}`)
          notify('잠시 후 다시 시도해주세요.')
      }
    },
  })
  return { checkAuth, authNum, setAuthNum }
}
