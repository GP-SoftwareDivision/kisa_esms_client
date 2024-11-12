import { FormEvent } from 'react'
import { Flex, Box, Grid } from '@chakra-ui/react'
import styled from '@emotion/styled'

import CustomModal from '@/components/elements/Modal.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useLogin } from '@/hooks/useLogin.tsx'
import { useForm } from '@/hooks/useForm.tsx'
import { formatTimer } from '@/utils/formatTimer.ts'

const LoginPage = () => {
  const { login, phoneNum, timeLeft, isOpen, handleOnCancel } = useLogin()
  const { checkAuth, authNum, setAuthNum } = useAuth()
  const { fields, warning, handleOnChange, validateForm } = useForm({
    id: 'gpadmin',
    password: '1234',
  })

  // 로그인
  const handleLoginAction = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if ('preventDefault' in event) {
      event.preventDefault()
    }

    const { id, password } = fields

    if (validateForm()) {
      login.mutate({ id, password })
    }
  }

  // 인증 번호 체크
  const handleAuthAction = () => {
    checkAuth.mutate({ phoneNum })
  }

  return (
    <LoginContainer>
      <LoginContent>
        <LoginLogo src='/logo_login.png' alt='logo' />
        <StyledForm onSubmit={handleLoginAction}>
          <StyledInput
            id='id'
            value={fields.id}
            placeholder='사용자ID'
            onChange={handleOnChange}
            variant={warning.id ? 'warning' : 'default'}
          />
          <StyledInput
            id='password'
            value={fields.password}
            placeholder='비밀번호'
            onChange={handleOnChange}
            type={'password'}
            variant={warning.password ? 'warning' : 'default'}
          />
          <StyledButton type='submit' onClick={handleLoginAction}>
            로그인
          </StyledButton>
        </StyledForm>
      </LoginContent>
      <CustomModal
        isOpen={isOpen}
        title='사용자 인증'
        onCancel={handleOnCancel}
        content={
          <ModalContents>
            <ModalDescription>
              번호가 변경되었을 경우 관리자에게 문의해주세요 (관리자 : 박현진)
            </ModalDescription>
            <Flex direction='column' gap={4} padding={4}>
              <Grid
                templateColumns={{ base: '1fr', md: '1fr 2fr' }}
                alignItems='center'
              >
                <Box fontSize={'sm'}>핸드폰 번호</Box>
                <Box fontSize={'sm'}>{phoneNum ? phoneNum : ''}</Box>
              </Grid>
              <Grid
                templateColumns={{ base: '1fr', md: '1fr 2fr' }}
                alignItems='center'
              >
                <Box fontSize={'sm'}>인증 번호 입력</Box>
                <Box fontSize={'sm'}>
                  <VerificationBox>
                    <VerificationInput
                      type='number'
                      value={authNum}
                      onChange={(e) => setAuthNum(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuthAction}
                    />
                    <span>{formatTimer(timeLeft)}</span>
                    <VerificationButton onClick={handleLoginAction}>
                      재전송
                    </VerificationButton>
                  </VerificationBox>
                </Box>
              </Grid>
            </Flex>
            <ModalDescription>
              전송 받으신 인증번호를 빈칸에 기입하신 후, [확인] 버튼을 누르시면
              다음으로 진행됩니다.
              <br />
              [재전송]을 클릭하여도 인증번호가 핸드폰으로 수신되지 않으면
              관리자에게 문의하세요.
            </ModalDescription>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnCancel}
              />
              <CustomButton
                type='primary'
                text='확인'
                onClick={handleAuthAction}
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
  ${({ theme }) => theme.typography.body2};
`

const StyledButton = styled.button`
  height: 40px;
  border-radius: 2px;
  border: none;
  background: #004c9f;
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
  ${({ theme }) => theme.typography.body2};
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
  padding-left: 4px;
`

const VerificationButton = styled.button`
  background-color: #004d9f;
  color: #fff;
  border: none;
  margin-left: 15px;
  border-radius: 2px;
  font-size: 0.725rem;
  cursor: pointer;
  padding: 4px;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`
