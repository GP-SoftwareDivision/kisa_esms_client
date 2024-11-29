import styled from '@emotion/styled'
import React, { memo } from 'react'
import { Input } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'

interface InputProps {
  id: string
  value: string
  label: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const CustomInput = memo(
  ({ id, value, label, placeholder, onChange, required }: InputProps) => {
    return (
      <StyledField label={label} required={required}>
        <Input
          id={id}
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
        />
      </StyledField>
    )
  }
)
export default CustomInput

const StyledField = styled(Field)`
  width: 100%;
  flex-direction: row;
  align-items: center;

  label {
    min-width: 60px;
    ${({ theme }) => theme.typography.body2};
  }

  input {
    height: 30px;
    outline: none;
    ${({ theme }) => theme.typography.body3};
    background-color: #fff;
  }
`
