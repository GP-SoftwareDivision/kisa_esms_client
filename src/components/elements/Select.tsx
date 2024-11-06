import { Select } from 'antd'
import styled from '@emotion/styled'
import React, { Dispatch, memo } from 'react'
import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'

interface SelectProps {
  label?: string
  options: {
    value: string
    label: string
  }[]
  onchange?: () => void
  setState?: Dispatch<React.SetStateAction<string>>
}

const CustomSelect = memo((props: SelectProps) => {
  const { options, label, setState } = props

  const handleOnChange = (selected: { value: string }) => {
    if (setState) setState(selected.value)
  }
  const addAllOption = {
    value: '전체',
    label: '전체',
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
        options={options ? [addAllOption, ...options] : [addAllOption]}
      />
    </SelectBox>
  )
})

CustomSelect.displayName = 'CustomSelect'

export default CustomSelect

const StyledSelect = styled(Select)`
  && span {
    ${({ theme }) => theme.typography.body2} !important;
  }
`
