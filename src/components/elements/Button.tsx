import styled from '@emotion/styled'

interface ButtonType {
  text: string
  type: 'primary' | 'outline' | 'download' | 'disabled'
  disabled?: boolean
  onClick?: () => void
}

const CustomButton = (props: ButtonType) => {
  const { text, type, disabled, onClick } = props
  return (
    <StyledButton $type={type} onClick={onClick} disabled={disabled}>
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
    case 'disabled':
      return '#D9D9D9'
    default:
      return '#061f5c'
  }
}

const StyledButton = styled.button<{
  $type: 'primary' | 'outline' | 'download' | 'disabled'
}>`
  background: ${(props) => getButtonColor(props.$type)};
  border: ${(props) =>
    props.$type === 'outline' ? '1px solid #c7c7c7' : 'none'};
  color: ${(props) => (props.$type === 'outline' ? '#000' : '#fff')};
  ${({ theme }) => theme.typography.body2};
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
`
