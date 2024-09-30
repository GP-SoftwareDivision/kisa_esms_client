import { Descriptions, DescriptionsProps } from 'antd'
import styled from '@emotion/styled'
import useModal from '@/hooks/useModal'
import CustomModal from '@/components/Modal'
import useTimer from '@/hooks/useTimer'
import { useEffect } from 'react'
import CustomButton from '@/components/Button'

const LoginPage = () => {
  const { openModal, closeModal, isOpen } = useModal()
  const { timeLeft, startTimer, resetTimer } = useTimer(180) // 3분(180초) 타이머

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
        <VerificationBox>
          <VerificationInput type='number' />
          <span>{formatTime(timeLeft)}</span>
          <VerificationButton onClick={startTimer}>재전송</VerificationButton>
        </VerificationBox>
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

    // 모달이 열릴 때 타이머 시작
    startTimer()
  }

  // 타이머가 변할 때마다 렌더링 트리거
  useEffect(() => {
    if (timeLeft === 0) {
      // 인증번호 기입 시간 종료 알림
    }
  }, [timeLeft])

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
        onCancel={() => closeModal('login')}
        content={
          <ModalContents>
            <ModalDescription>
              번호가 변경되었을 경우 관리자에게 문의해주세요 (관리자 : 박현진)
            </ModalDescription>
            <Descriptions
              bordered
              column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
              items={items}
            />
            <ModalDescription>
              전송 받으신 인증번호를 빈칸에 기입하신 후, [확인]버튼을 누르시면
              다음으로 진행됩니다.
              <br />
              [재전송]을 클릭하여도 인증번호가 핸드폰으로 수신되지 않으면
              관리자에게 문의하세요
            </ModalDescription>
            <ButtonWrapper>
              <CustomButton type='primary' text='확인' onClick={useLogin} />
              <CustomButton
                type='secondary'
                text='취소'
                onClick={() => closeModal('login')}
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
