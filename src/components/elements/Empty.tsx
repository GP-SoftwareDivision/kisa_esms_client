import { EmptyState } from '@/components/ui/empty-state'
import { GiEmptyChessboard } from 'react-icons/gi'

const Empty = () => {
  return (
    <EmptyState
      icon={<GiEmptyChessboard />}
      title='데이터가 존재하지 않습니다.'
      description='검색 조건을 다시 설정해주세요.'
    />
  )
}
export default Empty
