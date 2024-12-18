import styled from '@emotion/styled'
import { Dispatch, SetStateAction } from 'react'

interface TextareaProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  disabled?: boolean
}

const CustomTextarea = (props: TextareaProps) => {
  const { setValue, value, disabled } = props
  return (
    <StyledTextarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    />
  )
}
export default CustomTextarea

const StyledTextarea = styled.textarea`
  min-height: 100px;
  align-items: flex-start;
  width: 100%;
  outline: none;
  ${({ theme }) => theme.typography.body3};

  & textarea:focus {
    outline: none;
    resize: none;
  }
  & [data-focus] {
    box-shadow: none;
  }
`
