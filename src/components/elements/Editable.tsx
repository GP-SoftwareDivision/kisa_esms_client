import React, { Dispatch, memo } from 'react'
import styled from '@emotion/styled'
import { Editable } from '@chakra-ui/react'

interface EditableProps {
  id: string
  value: string
  setValue?: Dispatch<React.SetStateAction<string>>
  disabled?: boolean
}
const CustomEditable = memo((props: EditableProps) => {
  const { id, value, setValue, disabled } = props

  const handleOnValueChange = (value: string) => {
    if (setValue) setValue(value)
  }

  return (
    <StyledEditable
      id={id}
      value={value}
      onValueChange={(e) => handleOnValueChange(e.value)}
      placeholder='내용을 입력하세요'
      disabled={disabled}
    >
      {disabled ? (
        <Editable.Preview opacity={0.5} cursor='not-allowed' />
      ) : (
        <Editable.Preview />
      )}
      <Editable.Input />
    </StyledEditable>
  )
})

export default CustomEditable

const StyledEditable = styled(Editable.Root)`
  width: 100%; /* Use a percentage or 'auto' for dynamic sizes instead of !important */
  ${({ theme }) => theme.typography.body3};

  & input:focus {
    outline: none;
  }

  & [data-focus] {
    box-shadow: none;
  }
`
