import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { responseListType } from '@/pages/issue/TrackingFormPage.tsx'
import { useMemo } from 'react'
import { VictimType } from '@/hooks/mutations/useTrackingDetailMutation.tsx'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  gap: 0.5rem;

  button {
    min-width: 60px !important;
  }
`

const TrackingDetailPage = () => {
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()

  // 이력 대응 상세 조회 API
  const responseDetail = useQueries<{ data: responseListType }>({
    queryKey: `responseDetail`,
    method: 'POST',
    url: '/api/issue/history/detail',
    body: {
      seqidx: Number(queryParams.get('seqidx')),
      sourceIdx: Number(queryParams.get('sourceidx')),
    },
  })

  const getIndividualType = useMemo(() => {
    const tmp = responseDetail.data?.data
    if (tmp?.institutions.length === 0 && tmp?.indFlag.includes('Y')) {
      return '개인'
    }
    if (tmp?.institutions.length !== 0 && tmp?.indFlag.includes('Y')) {
      return '개인, 개인 외'
    }
    if (tmp?.institutions.length !== 0 && tmp?.indFlag.includes('N')) {
      return '개인 외'
    }
  }, [responseDetail.data])

  return (
    <ContentContainer>
      <PageTitle text={'대응 이력 상세 조회'} />
      <Table>
        <tbody>
          <tr>
            <LabelTd>등록일시</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.registrationDate}</Td>
          </tr>
          <tr>
            <LabelTd>대상구분</LabelTd>
            <Td colSpan={5}>{getIndividualType}</Td>
          </tr>
          {responseDetail.data?.data?.institutions.map(
            (v: VictimType, index: number) => (
              <>
                <tr>
                  <LabelTd rowSpan={6}>{index + 1}</LabelTd>
                  <LabelTd>피해대상</LabelTd>
                  <Td colSpan={4}>{v.targetType}</Td>
                </tr>
                <tr>
                  <LabelTd>피해기관</LabelTd>
                  <Td colSpan={4}>{v.institution}</Td>
                </tr>
                <tr>
                  <LabelTd>침해신고여부</LabelTd>
                  <Td colSpan={4}>{v.reportFlag}</Td>
                </tr>
                <tr>
                  <LabelTd>사고번호</LabelTd>
                  <Td colSpan={4}>{v.supportFlag}</Td>
                </tr>
                <tr>
                  <LabelTd>기술지원여부</LabelTd>
                  <Td colSpan={4}>{v.incidentId}</Td>
                </tr>
                <tr>
                  <LabelTd>거부사유</LabelTd>
                  <Td colSpan={4}>{v.reason}</Td>
                </tr>
                <tr>
                  <LabelTd rowSpan={6}>{index + 2}</LabelTd>
                  <LabelTd>피해대상</LabelTd>
                  <Td colSpan={4}>{v.targetType}</Td>
                </tr>
                <tr>
                  <LabelTd>피해기관</LabelTd>
                  <Td colSpan={4}>{v.institution}</Td>
                </tr>
                <tr>
                  <LabelTd>침해신고여부</LabelTd>
                  <Td colSpan={4}>{v.reportFlag}</Td>
                </tr>
                <tr>
                  <LabelTd>사고번호</LabelTd>
                  <Td colSpan={4}>{v.supportFlag}</Td>
                </tr>
                <tr>
                  <LabelTd>기술지원여부</LabelTd>
                  <Td colSpan={4}>{v.incidentId}</Td>
                </tr>
                <tr>
                  <LabelTd>거부사유</LabelTd>
                  <Td colSpan={4}>{v.reason}</Td>
                </tr>
              </>
            )
          )}
          <tr>
            <LabelTd>사고유형</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.incidentType}</Td>
          </tr>
          <tr>
            <LabelTd>사고유형 상세</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.incidentTypeDetail}</Td>
          </tr>
          <tr>
            <LabelTd>협박유무</LabelTd>
            <Td colSpan={5}>
              {responseDetail.data?.data?.threatFlag === 'Y' ? '있음' : '없음'}
            </Td>
          </tr>
          <tr>
            <LabelTd>사이트(도메인)</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.domain}</Td>
          </tr>
          <tr>
            <LabelTd>채널구분</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.domainType}</Td>
          </tr>
          <tr>
            <LabelTd>채널명</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.channelName}</Td>
          </tr>
          <tr>
            <LabelTd>게시글/텔레그램 URL</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.url}</Td>
          </tr>
          <tr>
            <LabelTd>다운로드 URL</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.downloadUrl}</Td>
          </tr>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.title}</Td>
          </tr>
          <tr>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.writer}</Td>
          </tr>
          <tr>
            <LabelTd>게시일</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.publishedDate}</Td>
          </tr>
          <tr>
            <LabelTd>최초인지</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.originType}</Td>
          </tr>
          <tr>
            <LabelTd>최초인지 상세</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.originTypeDetail}</Td>
          </tr>
          <tr>
            <LabelTd>공유</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.shareTarget}</Td>
          </tr>
          <tr>
            <LabelTd>수집정보</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.colInfo}</Td>
          </tr>
          <tr>
            <LabelTd>이미지 유무</LabelTd>
            <Td colSpan={5}>
              {responseDetail.data?.data?.imageFlag === 'Y' ? '있음' : '없음'}
            </Td>
          </tr>
          <tr>
            <LabelTd>보고문구</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.contents}</Td>
          </tr>
          <tr>
            <LabelTd>해커그룹</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.hackGroup}</Td>
          </tr>
          <tr>
            <LabelTd>비고</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.comment}</Td>
          </tr>
          <tr>
            <LabelTd>키워드</LabelTd>
            <Td colSpan={5}>{responseDetail.data?.data?.leakedInfo}</Td>
          </tr>
        </tbody>
      </Table>
      <ButtonContainer>
        <Button
          type={'primary'}
          onClick={() => navigate(`form?id=${queryParams.get('id')}`)}
          text={'수정'}
        />
        <Button type={'tertiary'} onClick={() => navigate(-1)} text={'닫기'} />
      </ButtonContainer>
    </ContentContainer>
  )
}

export default TrackingDetailPage

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => theme.typography.body2};
  table-layout: fixed;
`
const Td = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid #d9d9d9;
`

const LabelTd = styled(Td)`
  background-color: #f6f6f6;
  text-align: center;
`
