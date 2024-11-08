import styled from '@emotion/styled'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueryHandler } from '@/hooks/useQueryHandler.tsx'

interface UserListType {
  seqidx: number
  email: string
  usertype: string
  name: string
  phonenum: string
  groupcode: string
  groupname: string
}

const User = () => {
  const userList = useQueryHandler<{ data: UserListType[] }>({
    method: 'POST',
    url: '/api/manage/userList',
  })

  const columns = [
    {
      header: '그룹명',
      accessorKey: 'groupname',
    },
    {
      header: '이름',
      accessorKey: 'name',
    },
    {
      header: '번호',
      accessorKey: 'phonenum',
    },
    {
      header: '이메일',
      accessorKey: 'email',
    },
    {
      header: '다운로드',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <TableButtonWrapper>
          <Button
            type={'download'}
            text={'수정'}
            onClick={() => console.log(row.original.seqidx)}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'유저 관리'} />
      <ButtonWrapper>
        <Button
          type={'download'}
          onClick={handleOnSelectChange}
          text={'추가'}
        />
      </ButtonWrapper>
      <ContentBox>
        {userList.isSuccess && (
          <CustomTable
            loading={userList.isLoading}
            data={userList.data.data}
            columns={columns}
            pagination={true}
          />
        )}
      </ContentBox>
    </ContentContainer>
  )
}
export default User

const TableButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`
