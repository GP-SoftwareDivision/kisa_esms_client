import styled from '@emotion/styled'
import React, { memo } from 'react'
import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'

interface InputProps {
  id: string
  label?: string
  value: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = memo(
  ({ id, value, label, placeholder, onChange }: InputProps) => {
    return (
      <SelectBox>
        <SelectLabel>{label}</SelectLabel>
        <StyledInput
          id={id}
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
        />
      </SelectBox>
    )
  }
)
export default CustomInput

const StyledInput = styled.input`
  height: 30px;
  border-radius: 0.25rem;
  border: 1px solid #d9d9d9;
  outline: none;
  padding-left: 10px;
  width: 100%;
  ${({ theme }) => theme.typography.body3};
`
