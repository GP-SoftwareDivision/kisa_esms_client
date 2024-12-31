import { useLocation, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { responseListType } from '@/pages/issue/TrackingFormPage.tsx'
import { useMemo } from 'react'
import { VictimType } from '@/hooks/mutations/useTrackingDetailMutation.tsx'
import { targetOptions } from '@/data/selectOptions.ts'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  gap: 0.5rem;
`

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  ${({ theme }) => theme.typography.body2};
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-bottom: 1px solid #d9d9d9;
  gap: 0.5rem;
`

const Label = styled.div`
  background-color: #f6f6f6;
  text-align: center;
  padding: 8px;
  font-weight: bold;
`

const Value = styled.div`
  padding: 8px 12px;
`

const InnerTableContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 9.5fr;
  padding: 0.5rem;
`

const InnerTableIndexText = styled.div`
  background-color: #f6f6f6;
  border-right: 1px solid #d9d9d9;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TrackingDetailPage = () => {
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const navigateFormIdx = useLocation()

  // 이력 대응 상세 조회 API
  const responseDetail = useQueries<{ data: responseListType }>({
    queryKey: `responseDetail`,
    method: 'POST',
    url: '/api/issue/history/detail',
    body: {
      seqidx: Number(queryParams.get('seqidx')),
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
      <TableContainer>
        <Row>
          <Label>등록일시</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.registrationDate}</Value>
          )}
        </Row>
        <Row>
          <Label>대상구분</Label>
          <Value>{getIndividualType}</Value>
        </Row>
        {responseDetail.isSuccess &&
          responseDetail.data?.data?.institutions?.length > 0 && (
            <div style={{ padding: '0.5rem' }}>
              {responseDetail.data?.data?.institutions.map(
                (v: VictimType, index: number) => (
                  <InnerTableContainer key={v.seqidx}>
                    <InnerTableIndexText>
                      <span>{index + 1}</span>
                    </InnerTableIndexText>
                    <div>
                      <Row>
                        <Label>피해대상</Label>
                        <Value>
                          {
                            targetOptions?.find(
                              ({ value }: { value: string; label: string }) =>
                                value === v.targetType
                            )?.label
                          }
                        </Value>
                      </Row>
                      <Row>
                        <Label>피해기관</Label>
                        <Value>{v.institution}</Value>
                      </Row>
                      <Row>
                        <Label>침해신고여부</Label>
                        <Value>
                          {v.reportFlag === 'Y' ? '신고' : '미신고'}
                        </Value>
                      </Row>
                      <Row>
                        <Label>사고번호</Label>
                        <Value>{v.incidentId}</Value>
                      </Row>
                      <Row>
                        <Label>기술지원여부</Label>
                        <Value>
                          {v.supportFlag === 'Y' ? '동의' : '미동의'}
                        </Value>
                      </Row>
                      <Row>
                        <Label>거부사유</Label>
                        <Value>{v.reason}</Value>
                      </Row>
                    </div>
                  </InnerTableContainer>
                )
              )}
            </div>
          )}

        <Row>
          <Label>사고유형</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.incidentType}</Value>
          )}
        </Row>
        <Row>
          <Label>사고유형 상세</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.incidentTypeDetail}</Value>
          )}
        </Row>
        <Row>
          <Label>협박유무</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>
              {responseDetail.data?.data?.threatFlag === 'Y' ? '있음' : '없음'}
            </Value>
          )}
        </Row>
        <Row>
          <Label>사이트(도메인)</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.domain}</Value>
          )}
        </Row>
        <Row>
          <Label>채널구분</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.domainType}</Value>
          )}
        </Row>
        <Row>
          <Label>채널명</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.channelName}</Value>
          )}
        </Row>
        <Row>
          <Label>게시글/텔레그램 URL</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.url}</Value>
          )}
        </Row>
        <Row>
          <Label>다운로드 URL</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.downloadUrl}</Value>
          )}
        </Row>
        <Row>
          <Label>제목</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.title}</Value>
          )}
        </Row>
        <Row>
          <Label>작성자</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.writer}</Value>
          )}
        </Row>
        <Row>
          <Label>게시일</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.publishedDate}</Value>
          )}
        </Row>
        <Row>
          <Label>최초인지</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.originType}</Value>
          )}
        </Row>
        <Row>
          <Label>최초인지 상세</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.originTypeDetail}</Value>
          )}
        </Row>
        <Row>
          <Label>공유</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.shareTarget}</Value>
          )}
        </Row>
        <Row>
          <Label>수집정보</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.colInfo}</Value>
          )}
        </Row>
        <Row>
          <Label>이미지 유무</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>
              {responseDetail.data?.data?.imageFlag === 'Y' ? '있음' : '없음'}
            </Value>
          )}
        </Row>
        <Row>
          <Label>보고문구</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.contents}</Value>
          )}
        </Row>
        <Row>
          <Label>해커그룹</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.hackGroup}</Value>
          )}
        </Row>
        <Row>
          <Label>비고</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.comment}</Value>
          )}
        </Row>
        <Row>
          <Label>키워드</Label>
          {responseDetail.isLoading ? (
            <CustomSkeleton lines={1} />
          ) : (
            <Value>{responseDetail.data?.data?.keyword}</Value>
          )}
        </Row>
      </TableContainer>
      <ButtonContainer>
        <Button
          type={'primary'}
          onClick={() => navigate(`form${navigateFormIdx.search}`)}
          text={'수정'}
        />
        <Button type={'tertiary'} onClick={() => navigate(-1)} text={'닫기'} />
      </ButtonContainer>
    </ContentContainer>
  )
}

export default TrackingDetailPage
