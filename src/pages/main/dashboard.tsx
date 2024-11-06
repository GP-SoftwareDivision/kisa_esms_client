import dayjs from 'dayjs'
import { Col, Row } from 'antd'
import styled from '@emotion/styled'

import PageTitle from '@/components/elements/PageTitle.tsx'
import Bar from '@/components/charts/Bar.tsx'
import Pie from '@/components/charts/Pie.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomList from '@/components/charts/List.tsx'
import { dashBoardcolumns } from '@/data/columns/dashboard.ts'

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
  const today = dayjs()
  const oneWeekAgo = today.subtract(1, 'month').format('YYYY-MM-DD')

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

  return (
    <>
      <StyledMainPage gutter={[16, 16]}>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <StyledContainer>
            <PageTitle
              text={'이슈 모니터링'}
              children={
                <TitleCaption>
                  {oneWeekAgo} ~ {today.format('YYYY-MM-DD')}
                </TitleCaption>
              }
            />
            <ContentsContainer gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Bar />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Pie />
              </Col>
            </ContentsContainer>
          </StyledContainer>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <StyledContainer>
            <PageTitle text={'금주 이슈 내역'} />
            <StyledBox>
              <ListSubTitle>해킹 탐지 건수</ListSubTitle>
              <CustomList label={'금일'} value={'1'} />
              <CustomList label={'금주'} value={'10'} />
              <CustomList label={'금월'} value={'30'} />
              <ListSubTitle>대응 완료 건수</ListSubTitle>
              <CustomList label={'금일'} value={'1'} />
              <CustomList label={'금주'} value={'10'} />
              <CustomList label={'금월'} value={'30'} />
            </StyledBox>
          </StyledContainer>
        </Col>
      </StyledMainPage>
      <StyledContainer>
        <PageTitle text={'해킹 데이터 현황'} />
        <StyledBox>
          <CustomTable
            data={data}
            columns={dashBoardcolumns}
            pagination={false}
          />
        </StyledBox>
      </StyledContainer>
    </>
  )
}
export default MainPage

const StyledMainPage = styled(Row)`
  //display: grid;
  //grid-template-columns: 1fr 0.3fr;
  //gap: 2rem;
`

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const StyledBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 4px;
  padding: 1rem;
`

const ContentsContainer = styled(Row)`
  //display: grid;
  //grid-template-columns: 1fr 1fr;
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 4px;
  padding: 1rem;
  height: 100%;
`

const ListSubTitle = styled.p`
  padding: 0.5em 0.3rem;
  ${({ theme }) => theme.typography.subtitle};
`
const TitleCaption = styled.span`
  ${({ theme }) => theme.typography.caption1};
`
