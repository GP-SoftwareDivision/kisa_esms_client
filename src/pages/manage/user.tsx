import { TableColumnsType } from 'antd'
import CustomTable from '@/components/charts/Table.tsx'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import styled from '@emotion/styled'
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

  const columns: TableColumnsType = [
    {
      title: '그룹명',
      dataIndex: 'groupname',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '번호',
      dataIndex: 'phonenum',
      align: 'center',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '',
      dataIndex: '',
      align: 'center',
      width: '10%',
      render: (_: any, record: any) => (
        <TableButtonWrapper>
          <Button
            type={'download'}
            text={'수정'}
            onClick={() => console.log(record)}
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
