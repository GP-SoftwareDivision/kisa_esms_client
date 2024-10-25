import styled from '@emotion/styled'

interface ButtonType {
  text: string
  type: 'primary' | 'outline' | 'download'
  onClick?: () => void
}

const CustomButton = (props: ButtonType) => {
  const { text, type, onClick } = props
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  )
}
export default CustomButton

const getButtonColor = (type: string) => {
  switch (type) {
    case 'outline':
      return '#ffffff'
    case 'download':
      return '#36A210'
    default:
      return '#061f5c'
  }
}

const StyledButton = styled.div<{ type: 'primary' | 'outline' | 'download' }>`
  background: ${(props) => getButtonColor(props.type)};
  border: ${(props) =>
    props.type === 'outline' ? '1px solid #c7c7c7' : 'none'};
  color: ${(props) => (props.type === 'outline' ? '#000' : '#fff')};
  ${({ theme }) => theme.typography.body2};
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
`
