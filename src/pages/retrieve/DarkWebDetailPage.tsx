import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiFileHtmlDuotone } from 'react-icons/pi'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomSwitch from '@/components/elements/Switch.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { highlightText } from '@/utils/highlightText.tsx'

interface DarkWebDetailType {
  seqidx: number
  target: string
  keyword: string
  writetime: string
  url: string
  writer: string
  title: string
  contents: string
  contents2: string
  trancontents: string
  trancontents2: string
  threatflag: string
  threatlog: string
  issueresponseflag: string
  htmlpath: string
  regdate: string
}

const DarkWebDetailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const id = urlParams.get('id')

  // 번역 여부
  const [isTranslation, setTranslation] = useState<boolean>(false)

  const [keywordHighLight, setKeywordHighLight] = useState<string>('')
  const [logHighLight, setLogHighLight] = useState<string[]>([])

  // 다크웹 데이터 상세 조회 API
  const dtDetail = useQueries<{ data: DarkWebDetailType[] }>({
    queryKey: `dtDetail`,
    method: 'POST',
    url: `/api/monitoring/dtDetail`,
    body: {
      seqidx: id,
    },
  })

  useEffect(() => {
    if (dtDetail.isSuccess) {
      setKeywordHighLight(dtDetail.data?.data[0]?.keyword)

      if (dtDetail.data?.data[0]?.threatlog)
        setLogHighLight(dtDetail.data?.data[0]?.threatlog.split('/'))
    }
  }, [dtDetail.isSuccess])

  // html 새 창으로 열기 이벤트
  const ViewHtml = () => {
    window.open(dtDetail.data?.data[0]?.htmlpath, '_blank')
  }

  return (
    <ContentContainer>
      <PageTitle
        text={'다크웹 데이터 상세 조회'}
        children={
          <Button
            type={'primary'}
            onClick={() => navigate('/issue/tracking/detail')}
            text={'이슈 대응'}
          />
        }
      />
      <Table>
        {dtDetail.isSuccess && (
          <tbody>
            <tr>
              <LabelTd>제목</LabelTd>
              <Td colSpan={3}>{dtDetail.data?.data[0]?.title}</Td>
              <LabelTd>카테고리</LabelTd>
              <Td>{dtDetail.data?.data[0]?.target}</Td>
            </tr>
            <tr>
              <LabelTd>작성자</LabelTd>
              <Td colSpan={3}>{dtDetail.data?.data[0]?.writer}</Td>
              <LabelTd>작성시간</LabelTd>
              <Td>{dtDetail.data?.data[0]?.writetime}</Td>
            </tr>
            <tr>
              <LabelTd>해킹 여부</LabelTd>
              <Td>{dtDetail.data?.data[0]?.threatflag}</Td>
              <LabelTd>대응 여부</LabelTd>
              <Td>{dtDetail.data?.data[0]?.issueresponseflag}</Td>
              <LabelTd>수집 키워드</LabelTd>
              <Td>{dtDetail.data?.data[0]?.keyword}</Td>
            </tr>
            <tr>
              <LabelTd>URL</LabelTd>
              <Td colSpan={3}>{dtDetail.data?.data[0]?.url}</Td>
              <LabelTd>판단 키워드</LabelTd>
              <Td>{dtDetail.data?.data[0].threatlog}</Td>
            </tr>
            <tr>
              <LabelTd>번역 보기</LabelTd>
              <Td colSpan={3}>
                <CustomSwitch
                  label={''}
                  checked={isTranslation}
                  setChecked={setTranslation}
                />
              </Td>
              <LabelTd>HTML 보기</LabelTd>
              <Td>
                <HtmlIcon onClick={ViewHtml} />
              </Td>
            </tr>
            <tr>
              <LabelTd>내용</LabelTd>
              <Td colSpan={5}>
                {isTranslation
                  ? `${dtDetail.data?.data[0]?.trancontents}${dtDetail.data?.data[0]?.trancontents2}`
                  : highlightText(
                      `${dtDetail.data?.data[0]?.contents}${dtDetail.data?.data[0]?.contents2}`,
                      keywordHighLight,
                      logHighLight
                    )}
              </Td>
            </tr>
          </tbody>
        )}
      </Table>
    </ContentContainer>
  )
}

export default DarkWebDetailPage

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => theme.typography.body2};
  table-layout: fixed;
`
const Td = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid #d9d9d9;
  //width: 75%;
`
const LabelTd = styled(Td)`
  //width: 25%;
  background-color: #f6f6f6;
`
const HtmlIcon = styled(PiFileHtmlDuotone)`
  ${({ theme }) => theme.typography.h4};
  cursor: pointer;
  margin: 0;
`
