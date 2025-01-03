import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Box, Stack } from '@chakra-ui/react'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import CustomSwitch from '@/components/elements/Switch.tsx'
import Empty from '@/components/elements/Empty.tsx'
import { useInfiniteQueries } from '@/hooks/queries/useInfiniteQueries.tsx'
import { highlightText } from '@/utils/highlightText.tsx'
import CustomEditable from '@/components/elements/Editable.tsx'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'

export interface TelegramDetailType {
  seqidx: number
  issueidx: number
  channelurl: string
  username: string
  keyword: string
  channel: string
  writetime: string
  contents: string
  contents2: string
  trancontents: string
  trancontents2: string
  threatflag: string
  threatlog: string
  issueresponseflag: string
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

const TelegramDetailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)

  const id = urlParams.get('id')
  const [seqidx, setSeqidx] = useState<string>(id || '')

  // 다음 데이터를 가져오기 위한 분기
  const [type, setType] = useState<'prev' | 'default' | 'next'>('default')

  // 번역 여부
  const [isTranslation, setTranslation] = useState<boolean>(false)

  // 검색
  const [keyword, setKeyword] = useState<string>('')

  // 텔레그램 현재 id의 메시지로 위치를 이동하기 위한 REF
  const currentMessageRef = useRef<any>(null)

  // 텔레그램 데이터 상세 조회 API
  const ttDetail = useQueries<{ data: TelegramDetailType }>({
    queryKey: `ttDetail`,
    method: 'POST',
    url: `/api/monitoring/ttDetail`,
    body: {
      seqidx: id,
    },
  })

  // 텔레그램 메시지 API
  const {
    ttHistoryData,
    originalInfiniteData,
    infiniteData,
    setInfiniteData,
    isNextEnd,
    isPrevEnd,
  } = useInfiniteQueries({
    queryKey: 'ttHistoryData',
    seqidx: seqidx,
    type: type,
  })

  // 텔레그램 현재 id의 메시지로 위치를 이동
  useEffect(() => {
    if (type === 'default' && currentMessageRef.current) {
      currentMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [ttHistoryData.data])

  // 키워드 검색
  const handleOnSearch = () => {
    if (!keyword) {
      setInfiniteData(originalInfiniteData)
      return
    }

    setTranslation(true)
    setInfiniteData(
      infiniteData.filter((v: TelegramDetailType) =>
        v.trancontents.includes(keyword)
      )
    )
  }

  // 메시지 쌓이는 함수
  const renderHistories = useMemo(() => {
    if (ttHistoryData.isSuccess && infiniteData?.length === 0) {
      return <Empty />
    }
    return infiniteData?.map((v: TelegramDetailType, index: number) => (
      <StyledContentsBox
        $current={v.seqidx === Number(id)}
        key={`${id}_${index}`}
        ref={v.seqidx === Number(id) ? currentMessageRef : null}
      >
        {isTranslation ? (
          <span>{v.trancontents}</span>
        ) : ttDetail.isSuccess ? (
          highlightText(
            v.contents,
            ttDetail.data?.data.keyword.split('/'),
            ttDetail.data?.data.threatlog.split('/')
          )
        ) : (
          <span>{v.contents}</span>
        )}
        <StyledInfoBox>
          <p>{v.writetime}</p>
          <ButtonWrapper>
            <Button
              text={v.issueresponseflag === 'Y' ? '대응' : '미대응'}
              type={v.issueresponseflag === 'Y' ? 'danger' : 'tertiary'}
              onClick={() => console.log('')}
            />
            <Button
              text={v.threatflag === 'Y' ? '해킹' : '미해킹'}
              type={v.threatflag === 'Y' ? 'danger' : 'tertiary'}
              onClick={() => {}}
            />
          </ButtonWrapper>
        </StyledInfoBox>
      </StyledContentsBox>
    ))
  }, [infiniteData, isTranslation])

  // 더보기 버튼 이벤트
  const moreHistoryData = useCallback(
    (rel: 'prev' | 'default' | 'next') => {
      const newId =
        rel === 'prev'
          ? infiniteData[0]?.seqidx
          : infiniteData[infiniteData.length - 1]?.seqidx

      setType(rel)
      setSeqidx(newId?.toString())

      ttHistoryData.fetchNextPage()
    },
    [ttHistoryData]
  )

  return (
    <ContentContainer>
      <PageTitle
        text={'텔레그램 데이터 상세 조회'}
        children={
          <Button
            type={'primary'}
            onClick={() =>
              navigate(
                `/issue/tracking/detail?seqidx=${ttDetail.data?.data.issueidx}`
              )
            }
            text={'이슈 대응'}
          />
        }
      />
      <Table>
        <tbody key={ttDetail.data?.data.seqidx}>
          <tr>
            <RenderDataRow
              label={'채널명'}
              colSpan={2}
              value={ttDetail.data?.data.channel as string}
              loading={ttDetail.isLoading}
            />
            <RenderDataRow
              label={'URL'}
              colSpan={2}
              value={ttDetail.data?.data.channelurl as string}
              loading={ttDetail.isLoading}
            />
          </tr>
          <tr>
            <RenderDataRow
              label={'작성자'}
              colSpan={2}
              value={ttDetail.data?.data.username as string}
              loading={ttDetail.isLoading}
            />
            <RenderDataRow
              label={'작성시간'}
              colSpan={2}
              value={ttDetail.data?.data.writetime as string}
              loading={ttDetail.isLoading}
            />
          </tr>
          <tr>
            <RenderDataRow
              label={'해킹 여부'}
              colSpan={2}
              value={ttDetail.data?.data.threatflag === 'Y' ? '해킹' : '미해킹'}
              loading={ttDetail.isLoading}
            />
            <RenderDataRow
              label={'작성시간'}
              colSpan={2}
              value={
                ttDetail.data?.data.issueresponseflag === 'Y'
                  ? '대응'
                  : '미대응'
              }
              loading={ttDetail.isLoading}
            />
          </tr>
          <tr>
            <RenderDataRow
              label={'수집 키워드'}
              colSpan={2}
              value={ttDetail.data?.data.keyword as string}
              loading={ttDetail.isLoading}
            />
            <RenderDataRow
              label={'판단 키워드'}
              colSpan={2}
              value={ttDetail.data?.data.threatlog as string}
              loading={ttDetail.isLoading}
            />
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
              value={ttDetail.data?.data.regdate as string}
              loading={ttDetail.isLoading}
            />
          </tr>
          <tr>
            <LabelTd>검색</LabelTd>
            <Td colSpan={5}>
              <SearchContainer>
                <CustomEditable
                  id={'keyword'}
                  value={keyword}
                  onChange={(item: { value: string }) => setKeyword(item.value)}
                />
                <Button
                  type={'primary'}
                  onClick={handleOnSearch}
                  text={'검색'}
                />
              </SearchContainer>
            </Td>
          </tr>
          <tr>
            <LabelTd>내용</LabelTd>
            {ttHistoryData.isLoading ? (
              <Td colSpan={5}>
                <CustomSkeleton lines={5} height={5} />
              </Td>
            ) : (
              <>
                <Td colSpan={5}>
                  <StyledContentsContainer>
                    {!isPrevEnd &&
                      (ttHistoryData.isLoading ? (
                        <Button
                          text={'가져오는 중'}
                          type={'outline'}
                          onClick={() => {}}
                        />
                      ) : (
                        <Button
                          text={'더보기'}
                          type={'outline'}
                          onClick={() => moreHistoryData('prev')}
                        />
                      ))}
                    {renderHistories}
                    {!isNextEnd &&
                      (ttHistoryData.isLoading ? (
                        <Button
                          text={'가져오는 중'}
                          type={'outline'}
                          onClick={() => {}}
                        />
                      ) : (
                        <Button
                          text={'더보기'}
                          type={'outline'}
                          onClick={() => moreHistoryData('next')}
                        />
                      ))}
                  </StyledContentsContainer>
                </Td>
              </>
            )}
          </tr>
        </tbody>
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

const StyledInfoBox = styled(Box)`
  display: flex;
  align-items: end;
  justify-content: space-between;

  p {
    color: #3366d6;
    ${({ theme }) => theme.typography.caption1} !important;
  }
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
