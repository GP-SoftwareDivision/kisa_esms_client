import { useState } from 'react'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import useModal from '@/hooks/useModal.tsx'
import useTimer from '@/hooks/useTimer.tsx'
import { notify } from '@/utils/notify.ts'

interface useLoginProps {
  id: string
  password: string
}

export const useLogin = () => {
  const [phoneNum, setPhoneNum] = useState<string>('')
  const { timeLeft, startTimer, resetTimer } = useTimer(180)
  const { openModal, closeModal, isOpen } = useModal()

  // 로그인 취소
  const handleOnCancel = () => {
    closeModal('login')
    setPhoneNum('')
    resetTimer()
  }

  // 로그인 API 통신
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: useLoginProps) => {
      resetTimer()
      const response = await instance.post('/api/login/selectMember', data)
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        notify(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
      }
    },
    onSuccess: (response) => {
      const { message, data } = response
      switch (message) {
        case 'success':
          setPhoneNum(data.phonenum)
          openModal('login')
          startTimer()
          break
        case undefined:
          notify('아이디나 비밀번호가 일치하지 않습니다.')
          break
        default:
          console.warn(`Unexpected message: ${message}`)
          notify('잠시 후 다시 시도해주세요.')
      }
    },
  })
  return { login, phoneNum, timeLeft, isOpen: isOpen('login'), handleOnCancel }
}
