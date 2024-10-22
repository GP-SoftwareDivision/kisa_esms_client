import { ReactNode } from 'react'
import styled from '@emotion/styled'
import Header from '@/layouts/Header.tsx'
import { mq } from '@/utils/mediaQueries.ts'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BodyContainer>
      <Header />
      <MainContainer>{children}</MainContainer>
    </BodyContainer>
  )
}
export default Wrapper

const MainContainer = styled.div`
  margin: 10rem 1rem 1rem 1rem;
`

const BodyContainer = styled.div`
  max-width: 1240px;
  height: 100%;
  margin: 0 auto;

  ${mq.xxl} {
    max-width: 1400px;
  }

  ${mq.lg} {
    max-width: 960px;
  }

  ${mq.md} {
    max-width: 720px;
  }
`
