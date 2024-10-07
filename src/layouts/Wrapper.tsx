import { ReactNode } from 'react'
import styled from '@emotion/styled'

import Header from '@/layouts/Header.tsx'
import Aside from '@/layouts/Aside.tsx'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Aside />
      <Header />
      <MainContainer>{children}</MainContainer>
    </>
  )
}
export default Wrapper

const MainContainer = styled.div`
  margin: 9rem 0 0 13rem;
`
