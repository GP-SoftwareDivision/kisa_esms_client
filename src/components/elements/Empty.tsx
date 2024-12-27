import { EmptyState } from '@/components/ui/empty-state'
import { GiEmptyChessboard } from 'react-icons/gi'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

const EmptyBox = styled(Box)`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
`
const Empty = () => {
  return (
    <EmptyBox>
      <EmptyState
        icon={<GiEmptyChessboard />}
        title='데이터가 존재하지 않습니다.'
        description='검색 조건을 다시 설정해주세요.'
      />
    </EmptyBox>
  )
}
export default Empty
