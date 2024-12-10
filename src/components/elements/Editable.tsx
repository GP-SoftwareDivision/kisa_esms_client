import { useState } from 'react'
import styled from '@emotion/styled'
import { Editable } from '@chakra-ui/react'

interface EditableProps {
  disabled?: boolean
}
const CustomEditable = (props: EditableProps) => {
  const { disabled } = props
  const [name, setName] = useState('')
  return (
    <StyledEditable
      value={name}
      onValueChange={(e) => setName(e.value)}
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
}

export default CustomEditable

const StyledEditable = styled(Editable.Root)`
  width: -webkit-fill-available !important;
  ${({ theme }) => theme.typography.body3};
  width: auto;

  & input:focus {
    outline: none;
  }
  & [data-focus] {
    box-shadow: none;
  }
`
