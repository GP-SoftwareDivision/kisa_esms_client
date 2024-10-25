import { Select } from 'antd'
import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'
import styled from '@emotion/styled'

interface InputProps {
  label?: string
  options: {
    value: string
    label: string
  }[]
  onchange?: () => void
}

const CustomSelect = (props: InputProps) => {
  const { options, label, onchange } = props

  return (
    <SelectBox>
      <SelectLabel>{label}</SelectLabel>
      <StyledSelect
        labelInValue
        defaultValue={{ value: '전체', label: '전체' }}
        style={{ width: '100%' }}
        onChange={onchange}
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
