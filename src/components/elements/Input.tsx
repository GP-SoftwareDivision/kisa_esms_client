import styled from '@emotion/styled'
import React, { memo } from 'react'
import { FaCircleQuestion } from 'react-icons/fa6'

import { Input } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import { Tooltip } from '@/components/ui/tooltip'

interface InputProps {
  id: string
  value: string
  label: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  tooltip?: string
}

const CustomInput = memo(
  ({
    id,
    value,
    label,
    placeholder,
    onChange,
    required,
    disabled,
    tooltip,
  }: InputProps) => {
    return (
      <StyledField
        label={
          <LabelContainer>
            {label}
            {tooltip && (
              <Tooltip
                content={tooltip}
                positioning={{ placement: 'right-end' }}
              >
                <StyledTooltip />
              </Tooltip>
            )}
          </LabelContainer>
        }
        required={required}
        disabled={disabled}
      >
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

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const StyledTooltip = styled(FaCircleQuestion)`
  color: ${({ theme }) => theme.color.gray600};
  cursor: pointer;
`
