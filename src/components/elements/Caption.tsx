import styled from '@emotion/styled'

export const Caption = (props: { text: string; type: string }) => {
  const { text, type } = props
  return <StyledCaption type={type}>{text}</StyledCaption>
}

const getCaptionColor = (color: string) => {
  switch (color) {
    case 'blue':
      return '#3366D6'
    case 'red':
      return '#ED1A3B'
    case 'gray':
      return '#A9A9A9'
    case 'black':
      return '#000000'
  }
}
const StyledCaption = styled.span<{ type: string }>`
  ${({ theme }) => theme.typography.body2};
  color: ${(props) => getCaptionColor(props.type)};
`
