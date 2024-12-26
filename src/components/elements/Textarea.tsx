import styled from '@emotion/styled'

interface TextareaProps {
  value: string
  onChange: (e: any) => void
  disabled?: boolean
}

const CustomTextarea = (props: TextareaProps) => {
  const { onChange, value, disabled } = props
  return (
    <StyledTextarea value={value} onChange={onChange} disabled={disabled} />
  )
}
export default CustomTextarea

const StyledTextarea = styled.textarea`
  min-height: 100px;
  align-items: flex-start;
  width: 100%;
  outline: none;
  padding: 4px;
  ${({ theme }) => theme.typography.body3};

  & textarea:focus {
    outline: none;
    resize: none;
  }
  & [data-focus] {
    box-shadow: none;
  }
`
