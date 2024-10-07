import styled from '@emotion/styled'

interface ButtonType {
  text: string
  type: 'primary' | 'secondary'
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

const StyledButton = styled.div<{ type: 'primary' | 'secondary' }>`
  background: ${(props) => (props.type === 'primary' ? '#061f5c' : '#fff')};
  border: ${(props) =>
    props.type === 'primary' ? 'none' : '1px solid #c7c7c7'};
  color: ${(props) => (props.type === 'primary' ? '#fff' : '#000')};
  font-size: 0.857rem;
  padding: 8px 20px;
  border-radius: 2px;
  cursor: pointer;
`
