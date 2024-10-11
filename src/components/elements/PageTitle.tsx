import styled from '@emotion/styled'

interface PageTitleType {
  text: string
}

const PageTitle = (props: PageTitleType) => {
  const { text } = props

  return <StyledTitle>{text}</StyledTitle>
}

export default PageTitle

const StyledTitle = styled.h3`
  padding-left: 0.5rem;
  margin: 0 0 1rem 0;
`
