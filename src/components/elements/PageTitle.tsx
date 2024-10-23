import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface PageTitleType {
  text: string
  children?: ReactNode
}

const PageTitle = (props: PageTitleType) => {
  const { text, children } = props
  return (
    <TitleContainer>
      <StyledTitle>{text}</StyledTitle>
      {children}
    </TitleContainer>
  )
}

export default PageTitle

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  margin: 1.5rem 0 0.5rem 0;
`

const StyledTitle = styled.h4`
  padding: 0 0 0.5rem 0.5rem;
  margin: 0;
  ${({ theme }) => theme.typography.title}
`
