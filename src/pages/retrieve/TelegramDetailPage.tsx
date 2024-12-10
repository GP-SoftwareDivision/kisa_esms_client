import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { Box, Stack } from '@chakra-ui/react'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomEditable from '@/components/elements/Editable.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import CustomSwitch from '@/components/elements/Switch.tsx'

interface TelegramDetailType {
  seqidx: number
  keyword: string
  writetime: string
  channelurl: string
  username: string
  channel: string
  contents: string
  trancontents: string
  threatflag: string
  threatlog: string
  issueresponseflag: string
}

interface TelegramDetailHistory {
  contents: string
  contents2: string
  seqidx: number
  threatflag: string
}

const TelegramDetailPage = () => {
  // const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const id = urlParams.get('id')

  // 번역 여부
  const [isTranslation, setTranslation] = useState<boolean>(false)

  // 텔레그램 데이터 상세 조회 API
  const ttDetail = useQueries<{ data: TelegramDetailType[] }>({
    queryKey: `ttDetail`,
    method: 'POST',
    url: `/api/monitoring/ttDetail`,
    body: {
      seqidx: id,
    },
  })

  // 텔레그램 메시지 API
  const ttHistoryData = useQueries<{ data: TelegramDetailHistory[] }>({
    queryKey: `ttHistoryData`,
    method: 'POST',
    url: `/api/monitoring/ttHistoryData`,
    body: {
      seqidx: id,
      type: 'default',
    },
  })

  return (
    <ContentContainer>
      <PageTitle text={'텔레그램 데이터 상세 조회'} />
      <Table>
        {ttDetail.isSuccess && (
          <tbody key={ttDetail.data?.data[0].seqidx}>
            <tr>
              <LabelTd>채널명</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].channel}</Td>
              <LabelTd>URL</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].channelurl}</Td>
            </tr>
            <tr>
              <LabelTd>작성자</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].username}</Td>
              <LabelTd>작성시간</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].writetime}</Td>
            </tr>
            <tr>
              <LabelTd>해킹 여부</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].threatflag}</Td>
              <LabelTd>대응 여부</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].issueresponseflag}</Td>
            </tr>
            <tr>
              <LabelTd>수집 키워드</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].keyword}</Td>
              <LabelTd>핀단 키워드</LabelTd>
              <Td colSpan={2}>{ttDetail.data?.data[0].threatlog}</Td>
            </tr>
            <tr>
              <LabelTd>번역 보기</LabelTd>
              <Td colSpan={5}>
                <CustomSwitch
                  label={''}
                  checked={isTranslation}
                  setChecked={setTranslation}
                />
              </Td>
            </tr>
            <tr>
              <LabelTd>검색</LabelTd>
              <Td colSpan={5}>
                <SearchContainer>
                  <CustomEditable />
                  <Button
                    type={'primary'}
                    onClick={() => console.log('')}
                    text={'검색'}
                  />
                </SearchContainer>
              </Td>
            </tr>
            <tr>
              <LabelTd>내용</LabelTd>
              <Td colSpan={5}>
                <StyledContentsContainer>
                  {ttHistoryData.isSuccess &&
                    ttHistoryData.data?.data.map((v: TelegramDetailHistory) => (
                      <StyledContentsBox
                        $current={v.seqidx === Number(id)}
                        key={v.seqidx}
                      >
                        <span>{v.contents}</span>
                        <ButtonWrapper>
                          <Button
                            text={'이슈대응'}
                            type={'primary'}
                            onClick={() => console.log('test')}
                          />
                          <Button
                            text={v.threatflag}
                            type={
                              v.threatflag === '해킹' ? 'danger' : 'tertiary'
                            }
                            onClick={() => console.log('test')}
                          />
                        </ButtonWrapper>
                      </StyledContentsBox>
                    ))}
                </StyledContentsContainer>
              </Td>
            </tr>
          </tbody>
        )}
      </Table>
    </ContentContainer>
  )
}

export default TelegramDetailPage

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => theme.typography.body2};
  table-layout: fixed;
`
const Td = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
`
const LabelTd = styled(Td)`
  //width: 25%;
  background-color: #f6f6f6;
`

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    min-width: 10rem;
  }
  button {
    min-width: 5rem;
  }
`
const StyledContentsContainer = styled(Stack)`
  max-height: 50rem;
  overflow-y: auto;
  gap: 1rem;
`

const StyledContentsBox = styled(Box)<{ $current: boolean }>`
  border: 1px solid ${({ theme }) => theme.color.gray200};
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.$current ? 'rgba(113, 163, 247, 0.2)' : '#fff'};
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.5rem;

  button {
    ${({ theme }) => theme.typography.caption2} !important;
  }
`
