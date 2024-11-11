import { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react'

import { useMutationHandler } from '@/hooks/useMutationHandler'
import { notify } from '@/utils/notify'
import useModal from '@/hooks/useModal.tsx'
import useTimer from '@/hooks/useTimer.tsx'

export const useLogin = () => {
  const { openModal, closeModal, isOpen } = useModal()
  const { timeLeft, startTimer, resetTimer } = useTimer(180)

  const [id, setId] = useState<string>('gpadmin')
  const [password, setPassword] = useState<string>('1234')
  const [warning, setWarning] = useState({ id: false, password: false })
  const [phoneNum, setPhoneNum] = useState<string>('')

  const loginMutation = useMutationHandler('login')

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    if (id === 'id' || id === 'password') {
      const setter = id === 'id' ? setId : setPassword
      setter(value)
      if (value.trim()) {
        setWarning((prev) => ({ ...prev, [id]: false }))
      }
    }
  }, [])

  // 로그인 유효성 검사
  const validateForm = (): boolean => {
    const newWarning = {
      id: id.trim() === '',
      password: password.trim() === '',
    }
    setWarning(newWarning)
    return !newWarning.id && !newWarning.password
  }

  // 로그인 버튼 클릭
  const handleOnLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateForm()) {
      loginMutation.mutate({
        method: 'POST',
        url: '/api/login/selectMember',
        data: { id, password },
      })
    }
  }

  // 인증 번호 재전송
  const reAuthCheck = () => {
    resetTimer()
    loginMutation.mutate({
      method: 'POST',
      url: '/api/login/selectMember',
      data: { id, password },
    })
  }

  // 인증 취소 - 모달 닫힘
  const cancelLogin = () => {
    closeModal('login')
    resetTimer()
  }

  useEffect(() => {
    if (!loginMutation.isSuccess || !loginMutation.data) return

    const { message, data } = loginMutation.data

    switch (message) {
      case 'success':
        openModal('login')
        startTimer()
        setPhoneNum(data.phonenum)
        break
      case undefined:
        notify('아이디나 비밀번호가 일치하지 않습니다.')
        break
      default:
        console.warn(`Unexpected message: ${message}`)
        notify('잠시 후 다시 시도해주세요.')
    }
  }, [loginMutation.isSuccess, loginMutation.data])

  return {
    id,
    password,
    phoneNum,
    warning,
    timeLeft,
    isOpen: isOpen('login'),
    cancelLogin,
    reAuthCheck,
    handleOnChange,
    handleOnLogin,
  }
}
