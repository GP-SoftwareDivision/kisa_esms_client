import styled from '@emotion/styled'

interface ButtonType {
  text: string
  type: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  onClick: () => void
  disabled?: boolean
}

const CustomButton = ({ text, type, disabled, onClick }: ButtonType) => {
  return (
    <StyledButton $type={type} onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  )
}
export default CustomButton

const getButtonColor = (type: string) => {
  switch (type) {
    case 'secondary':
      return '#36a210'
    case 'outline':
      return '#ffffff'
    case 'ghost':
      return '#d9d9d9'
    case 'danger':
      return '#f65655'
    default:
      return '#061f5c'
  }
}

const StyledButton = styled.button<{
  $type: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
}>`
  background: ${(props) => getButtonColor(props.$type)};
  border: ${(props) =>
    props.$type === 'outline' ? '1px solid #c7c7c7' : 'none'};
  color: ${(props) => (props.$type === 'outline' ? '#000' : '#fff')};
  ${({ theme }) => theme.typography.body3};
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
`
