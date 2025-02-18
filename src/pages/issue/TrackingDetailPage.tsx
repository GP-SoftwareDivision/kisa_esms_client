import { useLocation, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { responseListType } from '@/pages/issue/TrackingFormPage.tsx'
import { useMemo } from 'react'
import { VictimType } from '@/hooks/mutations/useTrackingDetailMutation.tsx'
import { targetOptions } from '@/data/selectOptions.ts'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'
import { useQuery } from '@tanstack/react-query'
import instance from '@/apis/instance.ts'
import { AxiosError } from 'axios'
import { notifyError } from '@/utils/notify.ts'

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

const RenderDataRow = ({
  label,
  value,
  loading,
}: {
  label: string
  value: string
  loading: boolean
}) => {
  return (
    <Row>
      <Label>{label}</Label>
      {loading ? (
        <CustomSkeleton lines={1} height={5} />
      ) : (
        <Value>{value}</Value>
      )}
    </Row>
  )
}

const TrackingDetailPage = () => {
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const navigateFormIdx = useLocation()

  // 이력 대응 상세 조회 API : select 때문에 모듈 사용 X
  const responseDetail = useQuery({
    queryKey: ['responseDetail'],
    queryFn: async () => {
      try {
        const response = await instance.post('/api/issue/history/detail', {
          seqidx: Number(queryParams.get('seqidx')),
        })
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          switch (status) {
            case 400:
              notifyError(`검색 결과가 없습니다.`)
              break
            case 401:
              notifyError(`세션이 만료되었습니다. 다시 로그인 후 이용해주세요.`)
              setTimeout(() => {
                navigate('/login')
              }, 2000)
              break
            case 403:
              notifyError('페이지에 접근 권한이 없습니다.')
              setTimeout(() => {
                navigate(-1)
              }, 2000)
              break
            default:
              notifyError(
                `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
              )
            // navigate('/error')
          }
        }
        throw new AxiosError()
      }
    },
    retry: 0,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled:
      Number(queryParams.get('seqidx')) !== 0 &&
      queryParams.get('type') === null,
    select: (data: { data: responseListType }) => {
      const { institutions, ...rest } = data.data

      if (institutions.filter((v) => v.targetType !== 'ind').length === 0) {
        return { ...rest, institutions: [] }
      } else return data.data
    },
  })

  const getIndividualType = useMemo(() => {
    const tmp = responseDetail.data

    if (tmp?.indFlag.includes('N')) return '개인 외'

    if (tmp?.indFlag.includes('Y')) {
      return tmp?.institutions.filter((v) => v.targetType !== 'ind').length ===
        0
        ? '개인'
        : '개인, 개인 외'
    }
  }, [responseDetail.data])

  return (
    <ContentContainer>
      <PageTitle text={'대응 이력 상세 조회'} />
      <TableContainer>
        <RenderDataRow
          label={'등록일시'}
          value={responseDetail.data?.registrationDate as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'대상구분'}
          value={getIndividualType as string}
          loading={responseDetail.isLoading}
        />
        {responseDetail.isSuccess && (
          <div>
            {responseDetail.data?.institutions.map(
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
                      <Value>{v.reportFlag === 'Y' ? '신고' : '미신고'}</Value>
                    </Row>
                    <Row>
                      <Label>사고번호</Label>
                      <Value>{v.incidentId}</Value>
                    </Row>
                    <Row>
                      <Label>기술지원여부</Label>
                      <Value>{v.supportFlag === 'Y' ? '동의' : '미동의'}</Value>
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
        <RenderDataRow
          label={'사고유형'}
          value={responseDetail.data?.incidentType as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'사고유형 상세'}
          value={responseDetail.data?.incidentTypeDetail as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'협박유무'}
          value={responseDetail.data?.threatFlag === 'Y' ? '있음' : '없음'}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'사이트(도메인)'}
          value={responseDetail.data?.domain as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'채널구분'}
          value={responseDetail.data?.domainType as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'채널명'}
          value={responseDetail.data?.channelName as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'게시글/텔레그램 URL'}
          value={responseDetail.data?.url as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'다운로드 URL'}
          value={responseDetail.data?.downloadUrl as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'제목'}
          value={responseDetail.data?.title as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'작성자'}
          value={responseDetail.data?.writer as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'게시일'}
          value={responseDetail.data?.publishedDate as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'최초인지'}
          value={responseDetail.data?.originType as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'최초인지 상세'}
          value={responseDetail.data?.originTypeDetail as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'공유'}
          value={responseDetail.data?.shareTarget as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'수집정보'}
          value={responseDetail.data?.colInfo as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'이미지 유무'}
          value={responseDetail.data?.imageFlag === 'Y' ? '있음' : '없음'}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'보고문구'}
          value={responseDetail.data?.contents as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'해커그룹'}
          value={responseDetail.data?.hackGroup as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'비고'}
          value={responseDetail.data?.comment as string}
          loading={responseDetail.isLoading}
        />
        <RenderDataRow
          label={'키워드'}
          value={responseDetail.data?.keyword as string}
          loading={responseDetail.isLoading}
        />
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
