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
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'

interface DarkWebDetailType {
  seqidx: number
  issueidx: number
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

const RenderDataRow = ({
  label,
  value,
  colSpan,
  loading,
}: {
  label: string
  value: string
  colSpan: number
  loading: boolean
}) => {
  return (
    <>
      <LabelTd>{label}</LabelTd>
      {loading ? (
        <Td colSpan={colSpan}>
          <CustomSkeleton lines={1} height={5} />
        </Td>
      ) : (
        <Td colSpan={colSpan}>{value}</Td>
      )}
    </>
  )
}

const DarkWebDetailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const id = urlParams.get('id')

  // 번역 여부
  const [isTranslation, setTranslation] = useState<boolean>(false)

  // 수집키워드 하이라이트
  const [keywordHighLight, setKeywordHighLight] = useState<string[]>([])

  // 판단키워드 하이라이트
  const [logHighLight, setLogHighLight] = useState<string[]>([])

  // 다크웹 데이터 상세 조회 API
  const dtDetail = useQueries<{ data: DarkWebDetailType }>({
    queryKey: `dtDetail`,
    method: 'POST',
    url: `/api/monitoring/dtDetail`,
    body: {
      seqidx: id,
    },
  })

  useEffect(() => {
    if (dtDetail.isSuccess) {
      setKeywordHighLight(dtDetail.data?.data?.keyword.split('/'))
      if (dtDetail.data?.data?.threatlog)
        setLogHighLight(dtDetail.data?.data?.threatlog.split('/'))
    }
  }, [dtDetail.isSuccess])

  // html 새 창으로 열기 이벤트
  const ViewHtml = () => {
    window.open(`/${dtDetail.data?.data?.htmlpath}`, '_blank')
  }

  return (
    <ContentContainer>
      <PageTitle
        text={'다크웹 데이터 상세 조회'}
        children={
          <Button
            type={'primary'}
            onClick={() =>
              navigate(
                `/issue/tracking/detail?seqidx=${dtDetail.data?.data.issueidx}`
              )
            }
            text={'이슈 대응'}
          />
        }
      />
      <Table>
        <tbody>
          <tr>
            <RenderDataRow
              label={'제목'}
              colSpan={3}
              value={dtDetail.data?.data.title as string}
              loading={dtDetail.isLoading}
            />
            <RenderDataRow
              label={'카테고리'}
              colSpan={1}
              value={dtDetail.data?.data.target as string}
              loading={dtDetail.isLoading}
            />
          </tr>
          <tr>
            <RenderDataRow
              label={'작성자'}
              colSpan={2}
              value={dtDetail.data?.data.writer as string}
              loading={dtDetail.isLoading}
            />
            <RenderDataRow
              label={'작성시간'}
              colSpan={2}
              value={dtDetail.data?.data.writetime as string}
              loading={dtDetail.isLoading}
            />
          </tr>
          <tr>
            <RenderDataRow
              label={'해킹여부'}
              colSpan={2}
              value={dtDetail.data?.data.threatflag === 'Y' ? '해킹' : '미해킹'}
              loading={dtDetail.isLoading}
            />
            <RenderDataRow
              label={'대응여부'}
              colSpan={2}
              value={
                dtDetail.data?.data.issueresponseflag === 'Y'
                  ? '대응'
                  : '미대응'
              }
              loading={dtDetail.isLoading}
            />
          </tr>
          <tr>
            <RenderDataRow
              label={'수집키워드'}
              colSpan={2}
              value={dtDetail.data?.data.keyword as string}
              loading={dtDetail.isLoading}
            />
            <RenderDataRow
              label={'판단키워드'}
              colSpan={2}
              value={dtDetail.data?.data.threatlog as string}
              loading={dtDetail.isLoading}
            />
          </tr>
          <tr>
            <RenderDataRow
              label={'URL'}
              colSpan={2}
              value={dtDetail.data?.data.url as string}
              loading={dtDetail.isLoading}
            />
            <LabelTd>HTML 보기</LabelTd>
            <Td colSpan={2}>
              <HtmlIcon onClick={ViewHtml} />
            </Td>
          </tr>
          <tr>
            <LabelTd>번역 보기</LabelTd>
            <Td colSpan={2}>
              <CustomSwitch
                label={''}
                checked={isTranslation}
                setChecked={setTranslation}
              />
            </Td>
            <RenderDataRow
              label={'수집시간'}
              colSpan={2}
              value={dtDetail.data?.data.regdate as string}
              loading={dtDetail.isLoading}
            />
          </tr>
          <tr>
            <LabelTd>내용</LabelTd>
            {dtDetail.isLoading ? (
              <Td colSpan={5}>
                <CustomSkeleton lines={5} height={5} />
              </Td>
            ) : (
              <Td colSpan={5}>
                {isTranslation
                  ? `${dtDetail.data?.data?.trancontents}${dtDetail.data?.data?.trancontents2}`
                  : highlightText(
                      `${dtDetail.data?.data?.contents}${dtDetail.data?.data?.contents2}`,
                      keywordHighLight,
                      logHighLight
                    )}
              </Td>
            )}
          </tr>
        </tbody>
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
