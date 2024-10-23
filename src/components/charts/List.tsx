import styled from '@emotion/styled'
interface ListType {
  label: string
  value: string
}
const CustomList = (props: ListType) => {
  const { label, value } = props

  return (
    <StyledList>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>
        <span>{value} </span>건
      </StyledValue>
    </StyledList>
  )
}
export default CustomList

const StyledList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`
const StyledLabel = styled.div`
  display: flex;
  ${({ theme }) => theme.typography.body2};
`
const StyledValue = styled.div`
  display: flex;
  ${({ theme }) => theme.typography.body2};

  span {
    color: dodgerblue;
    font-weight: bold;
  }
`
