import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutationHandler } from '@/hooks/useMutationHandler'
import { notify } from '@/utils/notify'

export const useAuth = (phoneNum: string) => {
  const navigate = useNavigate()
  const authCheckMutation = useMutationHandler('authCheck')

  const [authNum, setAuthNum] = useState<string>('')

  const handleOnAuthCheck = () => {
    if (!authNum) {
      notify('인증번호를 입력해주세요.')
      return
    }

    authCheckMutation.mutate({
      method: 'POST',
      url: '/auth',
      data: { phonenum: phoneNum, authnum: authNum },
    })
  }

  useEffect(() => {
    if (authCheckMutation.isError) {
      notify('인증번호가 일치하지 않습니다.')
      return
    }
    if (authCheckMutation.isSuccess && authCheckMutation.data) {
      const { message } = authCheckMutation.data
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
    }
  }, [authCheckMutation.isSuccess, authCheckMutation.isError])

  return {
    authNum,
    setAuthNum,
    handleOnAuthCheck,
    authCheckMutation,
  }
}
