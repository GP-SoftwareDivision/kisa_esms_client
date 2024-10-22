import styled from '@emotion/styled'
import type { TableColumnsType } from 'antd'

import PageTitle from '@/components/elements/PageTitle.tsx'
import Bar from '@/components/charts/Bar.tsx'
import Pie from '@/components/charts/Pie.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomList from '@/components/charts/List.tsx'

interface DateSituationType {
  type: string
  category: string
  keyword: string
  url: string
  title: string
  content: string
  writeTime: string
}

const MainPage = () => {
  const data: DateSituationType[] = [
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
      content: 'Terminal High Altitude Al ',
      writeTime: '2021.11.3',
    },
    {
      type: '텔레그램',
      category: 'tourl',
      keyword: 'co.kr',
      url: 'http://3bbad7fauor/',
      title: 'Terminal High Altitude Al ',
      content: 'Terminal High Altitude Al ',
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
    <>
      <StyledMainPage>
        <StyledContainer>
          <PageTitle text={'이슈 모니터링'} />
          <ContentsContainer>
            <Bar />
            <Pie />
          </ContentsContainer>
        </StyledContainer>
        <StyledContainer>
          <PageTitle text={'금주 이슈 내역'} />
          <ListSubTitle>해킹 탐지 건수</ListSubTitle>
          <CustomList label={'금일'} value={'1'} />
          <CustomList label={'금주'} value={'10'} />
          <CustomList label={'금월'} value={'30'} />
          <ListSubTitle>대응 완료 건수</ListSubTitle>
          <CustomList label={'금일'} value={'1'} />
          <CustomList label={'금주'} value={'10'} />
          <CustomList label={'금월'} value={'30'} />
        </StyledContainer>
      </StyledMainPage>
      <StyledContainer>
        <PageTitle text={'해킹 데이터 현황'} />
        <CustomTable data={data} columns={columns} />
      </StyledContainer>
    </>
  )
}
export default MainPage

const StyledMainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 2rem;
`

const StyledContainer = styled.div`
  //display: flex;
`
const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const ListSubTitle = styled.p`
  padding: 0.5em 0.3rem;
  font-weight: bold;
`
