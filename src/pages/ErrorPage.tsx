import styled from '@emotion/styled'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

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
const Title = styled.h2`
  ${({ theme }) => theme.typography.h2};
`

const Content = styled.span`
  ${({ theme }) => theme.typography.body};
  text-align: center;
`
const ErrorStatus = styled.p`
  position: absolute;
  //left: 40%;
  //top: 35%;
  font-size: 22rem;
  color: rgba(211, 211, 211, 0.2);
`
const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <LoginContainer>
      <LoginContent>
        <ErrorStatus>500</ErrorStatus>
        <Title>서비스에 접속할 수 없습니다</Title>
        <Content>
          서비스 이용에 불편을 드려 죄송합니다.
          <br /> 시스템 에러가 발생하여 현재 해당 서비스를 이용할 수 없습니다.
          <br />
          관리자에게 문의하시거나 잠시 후 다시 시도해주세요.
        </Content>
        <Button
          width={'full'}
          background={'#061f5c'}
          onClick={() => navigate('/main/dashboard')}
        >
          다시 접속하기
        </Button>
      </LoginContent>
    </LoginContainer>
  )
}
export default ErrorPage
