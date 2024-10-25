import type { TableColumnsType } from 'antd'
import CustomTable from '@/components/charts/Table.tsx'
import data from '@/data/dark.json'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'

const DarkWeb = () => {
  const columns: TableColumnsType = [
    {
      title: '카테고리',
      dataIndex: 'target',
      align: 'center',
      width: 5,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'center',
      width: 20,
    },
    {
      title: '작성자',
      dataIndex: 'writer',
      align: 'center',
      width: 5,
    },
    {
      title: '작성일시',
      dataIndex: 'writetime',
      align: 'center',
      width: 10,
    },
    {
      title: '제목',
      dataIndex: 'title',
      align: 'center',
      width: 20,
    },
    {
      title: '분석',
      dataIndex: 'analysisflag',
      align: 'center',
      width: 5,
    },
    {
      title: '해킹',
      dataIndex: 'threatflag',
      align: 'center',
      width: 5,
    },
    {
      title: '대응',
      dataIndex: 'issueresponseflag',
      align: 'center',
      width: 5,
    },
    {
      title: '수집일시',
      dataIndex: 'regdate',
      align: 'center',
      width: 5,
    },
  ]

  return (
    <ContentContainer>
      <PageTitle text={'다크웹 데이터'} />
      <ContentBox>
        <CustomTable data={data} columns={columns} pagination={true} />
      </ContentBox>
    </ContentContainer>
  )
}
export default DarkWeb
