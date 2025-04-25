
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notifyError } from '@/utils/notify.ts'

interface AuthMutationType {
  phonenum: string
  authnum: string
}

export const useAuthMutation = () => {
  const navigate = useNavigate()

  // 인번호 체크 API 통신
  const checkAuth = useMutation({
    mutationKey: ['checkAuth'],
    mutationFn: async (data: AuthMutationType) => {
      const response = await instance.post('/auth', {
        phonenum: data.phonenum,
        authnum: data.authnum,
      })
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 400:
            notifyError(`인증번호가 일치하지 않습니다.`)
            break
          case 503:
            notifyError(
              `인증번호 발송에 실패했습니다. 재전송을 눌러주세요. \n계속 실패할 시 관리자에게 문의하세요.`
            )
            break
          case 504:
            notifyError(`인증 시간이 지났습니다. 재전송을 눌러주세요.`)
            break
          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: () => {
      console.log('인증번호 체크 성공')
      navigate('/main/dashboard')
    },
  })
  return { checkAuth }
}
