import { memo } from 'react'
import styled from '@emotion/styled'
import { Editable } from '@chakra-ui/react'

interface EditableProps {
  id: string
  value: string
  onChange: (e: { value: string }) => void
  disabled?: boolean
}
const CustomEditable = memo((props: EditableProps) => {
  const { id, value, onChange, disabled } = props

  return (
    <StyledEditable
      id={id}
      value={value}
      onValueChange={onChange}
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

  & span {
    width: 100%;
  }
`
