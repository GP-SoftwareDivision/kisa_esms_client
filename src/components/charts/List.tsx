import styled from '@emotion/styled'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'
interface ListType {
  label: string
  value: string | number
  loading?: boolean
}
const CustomList = (props: ListType) => {
  const { label, value, loading } = props

  return (
    <StyledList>
      {loading ? (
        <CustomSkeleton loading={loading} lines={1} height={5} />
      ) : (
        <>
          <StyledLabel>{label}</StyledLabel>
          <StyledValue>
            <span>{value.toLocaleString()}</span>
          </StyledValue>
        </>
      )}
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
