import React, { FormEvent } from 'react'
import styled from '@emotion/styled'

import { useLoginMutation } from '@/hooks/mutations/useLoginMutation.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'

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
  background: #061f5c;
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
  ${({ theme }) => theme.typography.body2};
`

const LoginPage = () => {
  const { login } = useLoginMutation()
  const { fields, warning, handleOnChange, validateForm } = useForm({
    id: '',
    password: '',
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
    </LoginContainer>
  )
}

export default LoginPage
