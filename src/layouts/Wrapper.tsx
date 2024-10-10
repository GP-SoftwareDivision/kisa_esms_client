import { ReactNode } from 'react'
import styled from '@emotion/styled'

import Header from '@/layouts/Header.tsx'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/*<Aside />*/}
      <Header />
      <MainContainer>{children}</MainContainer>
    </>
  )
}
export default Wrapper

const MainContainer = styled.div`
  margin: 9rem 1rem 1rem 1rem;
`
