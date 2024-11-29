import { Editable } from '@chakra-ui/react'
import styled from '@emotion/styled'

const CustomTextarea = () => {
  return (
    <StyledTextarea autoResize={false}>
      <Editable.Preview minH='200px' alignItems='flex-start' width='full' />
      <Editable.Textarea />
    </StyledTextarea>
  )
}
export default CustomTextarea

const StyledTextarea = styled(Editable.Root)`
  ${({ theme }) => theme.typography.body3};

  & textarea:focus {
    outline: none;
  }
  & [data-focus] {
    box-shadow: none;
  }
`
