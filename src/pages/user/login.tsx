import React, { useCallback, useEffect, useState } from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import useModal from '@/hooks/useModal.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import useTimer from '@/hooks/useTimer.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { useMutationHandler } from '@/hooks/useMutationHandler.tsx'
import { notify } from '@/utils/notify.ts'

interface WarningType {
  id: boolean
  password: boolean
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [id, setId] = useState<string>('gpadmin')
  const [password, setPassword] = useState<string>('1234')
  const [phoneNum, setPhoneNum] = useState<string>('')
  const [authNum, setAuthNum] = useState<string>('')

  const [warning, setWarning] = useState<WarningType>({
    id: false,
    password: false,
  })

  const { openModal, closeModal, isOpen } = useModal()
  const { timeLeft, startTimer, resetTimer } = useTimer(180) // 3분(180초) 타이머
  const loginMutation = useMutationHandler('login')
  const authCheckMutation = useMutationHandler('authCheck')

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  // 인증번호 입력 팝업 open
  const handleOnLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateForm()) {
      loginMutation.mutate({
        method: 'POST',
        url: '/api/login/selectMember',
        data: { id, password },
      })
    }
  }

  // 인증번호 확인
  const handleOnAuthCheck = async () => {
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

  // 재전송
  const reAuthCheck = () => {
    resetTimer()
    loginMutation.mutate({
      method: 'POST',
      url: '/api/login/selectMember',
      data: { id, password },
    })
  }

  const items: DescriptionsProps['items'] = [
    {
      label: '핸드폰 번호',
      children: phoneNum,
    },
    {
      label: '인증번호 입력',
      children: (
        <VerificationBox>
          <VerificationInput
            type='number'
            value={authNum}
            onChange={(e) => setAuthNum(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleOnAuthCheck()}
          />
          <span>{formatTime(timeLeft)}</span>
          <VerificationButton onClick={reAuthCheck}>재전송</VerificationButton>
        </VerificationBox>
      ),
    },
  ]

  // 유효성 검사
  const validateForm = (): boolean => {
    const newWarning = {
      id: id.trim() === '',
      password: password.trim() === '',
    }

    setWarning(newWarning)
    return !newWarning.id && !newWarning.password
  }

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      if (id === 'id' || id === 'password') {
        const setter = id === 'id' ? setId : setPassword
        setter(value)

        if (value.trim()) {
          setWarning((prev) => ({ ...prev, [id]: false }))
        }
      }
    },
    []
  )

  // 인증 번호 성공 시
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

  // 로그인 성공 실패 여부
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

  // 타이머가 변할 때마다 렌더링 트리거
  useEffect(() => {
    if (timeLeft === 0) {
      notify('인증번호 시간이 만료되었습니다. 재전송버튼을 눌러주세요.')
    }
  }, [timeLeft])

  // 인증번호 취소
  const cancelAuth = () => {
    closeModal('login')
    resetTimer()
    setAuthNum('')
  }

  return (
    <LoginContainer>
      <LoginContent>
        <LoginLogo src='/logo_login.png' alt='logo' />
        <StyledForm onSubmit={(e) => handleOnLogin(e)}>
          <StyledInput
            id='id'
            value={id}
            placeholder='사용자ID'
            onChange={(e) => handleOnChange(e)}
            variant={warning.id ? 'warning' : 'default'}
          />
          <StyledInput
            id='password'
            value={password}
            placeholder='비밀번호'
            onChange={(e) => handleOnChange(e)}
            type={'password'}
            variant={warning.password ? 'warning' : 'default'}
          />
          <StyledButton type='submit' onClick={() => handleOnLogin}>
            로그인
          </StyledButton>
        </StyledForm>
      </LoginContent>

      <CustomModal
        isOpen={isOpen('login')}
        title='사용자 인증'
        onCancel={cancelAuth}
        content={
          <ModalContents>
            <ModalDescription>
              번호가 변경되었을 경우 관리자에게 문의해주세요 (관리자 : 박현진)
            </ModalDescription>
            <Descriptions
              bordered
              column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
              items={items}
            />
            <ModalDescription>
              전송 받으신 인증번호를 빈칸에 기입하신 후, [확인] 버튼을 누르시면
              다음으로 진행됩니다.
              <br />
              [재전송]을 클릭하여도 인증번호가 핸드폰으로 수신되지 않으면
              관리자에게 문의하세요.
            </ModalDescription>
            <ButtonWrapper>
              <CustomButton type='outline' text='취소' onClick={cancelAuth} />
              <CustomButton
                type='primary'
                text='확인'
                onClick={() => handleOnAuthCheck()}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </LoginContainer>
  )
}

export default LoginPage

const LoginContainer = styled.div`
  background-image: url('/background.png');
  background-size: cover;
  width: 100vw;
  height: 100vh;
`

const LoginContent = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

const LoginLogo = styled.img`
  width: 200px;
  height: auto;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 24rem;
`

const StyledInput = styled.input<{ variant: 'default' | 'warning' }>`
  height: 40px;
  border-radius: 4px;
  border: ${(props) =>
    props.variant === 'default' ? '1px solid #c7c7c7' : '1px solid #ef4444'};
  outline: none;
  padding-left: 10px;
`

const StyledButton = styled.button`
  height: 40px;
  border-radius: 2px;
  border: none;
  background: #004c9f;
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
`

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ModalDescription = styled.p`
  font-size: 0.825rem;
  padding: 0 8px;
`

const VerificationBox = styled.div`
  display: flex;
  gap: 5px;
`

const VerificationInput = styled.input`
  outline: none;
  max-width: 100px;
  border: 1px solid #c7c7c7;
`

const VerificationButton = styled.button`
  background-color: #004d9f;
  color: #fff;
  border: none;
  margin-left: 15px;
  border-radius: 2px;
  font-size: 0.725rem;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`
