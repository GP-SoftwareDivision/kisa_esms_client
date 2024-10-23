import PageTitle from '@/components/elements/PageTitle.tsx'
import styled from '@emotion/styled'
import CustomTable from '@/components/charts/Table.tsx'
import { TableColumnsType } from 'antd'

const Tracking = () => {
  const data = [
    {
      type: '다크웹',
      category: 'tourl',
      keyword: 'co.kr',
      url: 'http://3bbad7fauor/',
      title: 'Terminal High Altitude Al ',
      content: 'Terminal High Altitude Al ',
      writeTime: '2021.11.3',
    },
    {
      type: '다크웹',
      category: 'tourl',
      keyword: 'co.kr',
      url: 'http://3bbad7fauor/',
      title: 'Terminal High Altitude Al ',
      content: 'Terminal High Altitude Area Defense - The Hidden Wiki ',
      writeTime: '2021.11.3',
    },
    {
      type: '텔레그램',
      category: 'tourl',
      keyword: 'co.kr',
      url: 'http://3bbad7fauor/',
      title: 'Terminal High Altitude Al ',
      content: 'Terminal High Altitude Area Defense - The Hidden Wiki',
      writeTime: '2021.11.3',
    },
  ]

  const columns: TableColumnsType = [
    {
      title: '구분',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '카테고리',
      dataIndex: 'category',
      align: 'center',
    },
    {
      title: '키워드',
      dataIndex: 'keyword',
      align: 'center',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'center',
    },
    {
      title: '제목/채팅방명',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '내용',
      dataIndex: 'content',
      align: 'center',
    },
    {
      title: '작성일시',
      dataIndex: 'writeTime',
      align: 'center',
    },
  ]
  return (
    <StyledTracking>
      <PageTitle text={'이슈 대응 이력'} />
      <StyledBox>
        <CustomTable data={data} columns={columns} pagination={true} />
      </StyledBox>
    </StyledTracking>
  )
}
export default Tracking

const StyledTracking = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 4px;
  padding: 1rem;
`
