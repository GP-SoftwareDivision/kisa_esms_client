import { Select } from 'antd'
import styled from '@emotion/styled'
import React, { Dispatch } from 'react'
import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'

interface InputProps {
  label?: string
  options: {
    value: string
    label: string
  }[]
  onchange?: () => void
  setState?: Dispatch<React.SetStateAction<string>>
}

const CustomSelect = (props: InputProps) => {
  const { options, label, setState } = props

  const handleOnChange = (selected: { value: string }) => {
    if (setState) setState(selected.value)
  }

  return (
    <SelectBox>
      <SelectLabel>{label}</SelectLabel>
      <StyledSelect
        labelInValue
        defaultValue={{ value: '전체', label: '전체' }}
        style={{ width: '100%' }}
        onChange={(value) =>
          handleOnChange(value as { value: string; label: string })
        }
        options={options}
      />
    </SelectBox>
  )
}
export default CustomSelect

const StyledSelect = styled(Select)`
  && span {
    ${({ theme }) => theme.typography.body2} !important;
  }
`
