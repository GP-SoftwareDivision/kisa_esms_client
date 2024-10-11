import { ReactNode } from 'react'
import styled from '@emotion/styled'

import Header from '@/layouts/Header.tsx'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BodyContainer>
      {/*<Aside />*/}
      <Header />
      <MainContainer>{children}</MainContainer>
    </BodyContainer>
  )
}
export default Wrapper

const BodyContainer = styled.div`
  height: 100%;
  max-width: 1240px;
  margin: 0 auto;
`

const MainContainer = styled.div`
  margin: 10rem 1rem 1rem 1rem;
`
