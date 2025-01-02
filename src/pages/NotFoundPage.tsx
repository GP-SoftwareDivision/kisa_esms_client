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
const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <LoginContainer>
      <LoginContent>
        <ErrorStatus>404</ErrorStatus>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Content>
          페이지의 주소가 잘못 입력되었거나,
          <br />
          주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </Content>
        <Button
          width={'full'}
          background={'#061f5c'}
          onClick={() => navigate('/main/dashboard')}
        >
          메인으로
        </Button>
      </LoginContent>
    </LoginContainer>
  )
}
export default NotFoundPage
