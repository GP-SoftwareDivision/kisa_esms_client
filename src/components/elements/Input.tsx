import styled from '@emotion/styled'
import React from 'react'
import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'

interface InputProps {
  label?: string
  value: string
  placeholder?: string
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = (props: InputProps) => {
  const { value, label, placeholder, onchange } = props

  return (
    <SelectBox>
      <SelectLabel>{label}</SelectLabel>
      <StyledInput
        id='password'
        value={value}
        placeholder={placeholder}
        onChange={onchange}
      />
    </SelectBox>
  )
}
export default CustomInput

const StyledInput = styled.input`
  height: 28px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  outline: none;
  padding-left: 10px;
  width: 100%;
  ${({ theme }) => theme.typography.body2};
`
