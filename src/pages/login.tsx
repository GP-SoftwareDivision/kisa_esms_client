import { Descriptions, DescriptionsProps } from 'antd'
import styled from '@emotion/styled'
import useModal from '@/hooks/useModal'
import CustomModal from '@/components/Modal'
import useTimer from '@/hooks/useTimer'
import { useEffect } from 'react'

const LoginPage = () => {
  const { openModal, closeModal, isOpen } = useModal()
  const { timeLeft, isRunning, startTimer, resetTimer } = useTimer(180) // 3분(180초) 타이머

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  const items: DescriptionsProps['items'] = [
    {
      label: '핸드폰 번호',
      children: '010-0000-0000',
    },
    {
      label: '인증번호 입력',
      children: (
        <div>
          <input />
          <span>{formatTime(timeLeft)}</span>
          <button onClick={startTimer}>재전송</button>{' '}
        </div>
      ),
    },
  ]

  // 로그인 API 연결
  const useLogin = () => {}

  // 인증번호 입력 팝업 open
  const handleOnOpenModal = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault()
    openModal('login')
    startTimer() // 모달이 열릴 때 타이머 시작
  }

  // 타이머가 변할 때마다 렌더링 트리거
  useEffect(() => {
    if (timeLeft === 0) {
      console.log('타임 오버!')
    }
  }, [timeLeft]) // timeLeft를 의존성 배열에 추가

  return (
    <LoginContainer>
      <LoginContent>
        <LoginLogo src='/logo_login.png' alt='logo' />
        <StyledForm>
          <StyledInput placeholder='사용자ID' />
          <StyledInput placeholder='비밀번호' />
          <StyledButton type='submit' onClick={(e) => handleOnOpenModal(e)}>
            로그인
          </StyledButton>
        </StyledForm>
      </LoginContent>
      <CustomModal
        isOpen={isOpen('login') ? true : false}
        title='사용자 인증'
        onOk={useLogin}
        onCancel={() => closeModal('login')}
        content={
          <Descriptions
            bordered
            column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
            items={items}
          />
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

const StyledInput = styled.input`
  height: 40px;
  border-radius: 2px;
  border: 1px solid #c7c7c7;
  padding-left: 10px;
  outline: none;
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
