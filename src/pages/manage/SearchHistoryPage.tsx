import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'

const SearchHistoryPage = () => {
  const deleteSearchHistory = () => {}

  // const SearchHistoryColumns = [
  //   {
  //     header: '',
  //     accessorKey: '',
  //     id: 'delete',
  //     cell: () => (
  //       <TableButtonWrapper>
  //         <Checkbox />
  //       </TableButtonWrapper>
  //     ),
  //   },
  //   {
  //     header: '작성자명',
  //     accessorKey: 'groupname',
  //   },
  //   {
  //     header: '수집대상',
  //     accessorKey: 'comment',
  //   },
  //   {
  //     header: '저장일시',
  //     accessorKey: 'alram',
  //   },
  //   {
  //     header: '',
  //     accessorKey: '',
  //     id: 'update',
  //     cell: () => (
  //       <TableButtonWrapper>
  //         <Button type={'secondary'} text={'수정'} onClick={() => {}} />
  //       </TableButtonWrapper>
  //     ),
  //   },
  // ]
  return (
    <ContentContainer>
      <PageTitle
        text={'검색 기록 관리'}
        children={
          <Button
            type={'primary'}
            onClick={deleteSearchHistory}
            text={'삭제'}
          />
        }
      />
    </ContentContainer>
  )
}
export default SearchHistoryPage
