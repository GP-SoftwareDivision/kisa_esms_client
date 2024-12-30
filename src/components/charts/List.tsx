import styled from '@emotion/styled'
interface ListType {
  label: string
  value: number
  loading?: boolean
}
const CustomList = (props: ListType) => {
  const { label, value } = props

  return (
    <StyledList>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>
        <span>{value.toLocaleString()}</span>건
      </StyledValue>
    </StyledList>
  )
}
export default CustomList

const StyledList = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledLabel = styled.div`
  display: flex;
  ${({ theme }) => theme.typography.body3};
`
const StyledValue = styled.div`
  display: flex;
  ${({ theme }) => theme.typography.body3};

  span {
    color: dodgerblue;
    font-weight: bold;
  }
`
