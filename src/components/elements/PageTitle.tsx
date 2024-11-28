import styled from '@emotion/styled'
import { ReactNode, memo } from 'react'

interface PageTitleType {
  text: string
  children?: ReactNode
}

const PageTitle = memo(({ text, children }: PageTitleType) => {
  return (
    <TitleContainer>
      <StyledTitle>{text}</StyledTitle>
      {children}
    </TitleContainer>
  )
})

export default PageTitle

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  margin: 1rem 0;
  padding-bottom: 0.5rem;
  button {
    min-width: 120px !important;
    height: 30px;
  }
`

const StyledTitle = styled.h4`
  ${({ theme }) => theme.typography.title}
  margin: 0;
`
