import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global'
import CustomDatePicker from '@/components/elements/DatePicker'
import Button from '@/components/elements/Button'
import CustomTable from '@/components/charts/Table'
import PageTitle from '@/components/elements/PageTitle'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import Empty from '@/components/elements/Empty.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomList from '@/components/charts/List.tsx'
import CustomButton from '@/components/elements/Button'

const ButtonWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
`

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

interface DetectionListType {
  seqidx: number
  issueidx: string
  uploaddate: string
  filetype: string
  filename: string
  uploader: string
  counts: {
    total: string
    public: string
    education: string
    portal: string
    etc: string
  }
  file: string
}

interface DetectionType {
  issueidx: string
  uploaddate: string
  filetype: string
  filename: string
  uploader: string
  total: string
  public: string
  education: string
  portal: string
  etc: string
}

const InfringementPage = () => {
  const navigate = useNavigate()
  const { page, handlePageChange } = usePagination(1)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [viewData, setViewData] = useState<DetectionType>()

  // 조회기간
  const [date, setDate] = useState({
    startdate: dayjs().subtract(7, 'd').format('YYYY-MM-DD'),
    enddate: dayjs().format('YYYY-MM-DD'),
  })

  // 유출 정보 판별 요청
  const [request, setRequest] = useState<object>({
    ...date,
  })

  // 유출 정보 판별 리스트 전체 조회
  const detectionList = useQueries<{
    data: DetectionListType[]
    count: number
  }>({
    queryKey: `detectionList`,
    method: 'POST',
    url: '/api/issue/detection',
    body: { ...request, page: page },
  })

  // 데이터 일차원 리스트로 변경
  const flattenData = (dataArray: DetectionListType[]) => {
    return dataArray.map((item) => {
      const { counts, ...rest } = item
      return { ...rest, ...counts }
    })
  }

  // 천단위 콤마로 리턴 함수
  const formatNumberWithCommas = (text?: string) => {
    if (!text) return ''
    const localString = text.split('(')
    return `${Number(localString[0]).toLocaleString()}(${Number(localString[1]?.slice(0, -1) || 0).toLocaleString()})`
  }

  const InfringementColumns = [
    {
      header: '파일명',
      accessorKey: 'filename',
    },
    {
      header: '업로드 날짜',
      accessorKey: 'uploaddate',
    },
    {
      header: '담당자',
      accessorKey: 'uploader',
    },
    {
      header: '건수(중복제거)',
      columns: [
        {
          header: '전체',
          accessorKey: 'total',
          cell: ({ row }: any) => formatNumberWithCommas(row.original?.total),
        },
        {
          header: '공공',
          accessorKey: 'public',
          cell: ({ row }: any) => formatNumberWithCommas(row.original?.public),
        },
        {
          header: '교육',
          accessorKey: 'education',
          cell: ({ row }: any) =>
            formatNumberWithCommas(row.original?.education),
        },
        {
          header: '포털',
          accessorKey: 'portal',
          cell: ({ row }: any) => formatNumberWithCommas(row.original?.portal),
        },
        {
          header: '기타',
          accessorKey: 'etc',
          cell: ({ row }: any) => formatNumberWithCommas(row.original?.etc),
        },
      ],
    },
    {
      header: '결과파일',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <ButtonWrapper>
          <Button
            type={'secondary'}
            text={'다운로드'}
            onClick={() => console.log(row.original)}
          />
        </ButtonWrapper>
      ),
    },
    {
      header: '상세보기',
      accessorKey: '',
      cell: ({ row }: any) => (
        <ButtonWrapper>
          <Button
            type={'outline'}
            text={'보기'}
            onClick={
              () => {
                setIsModalOpen(true)
                setViewData(row.original)
              }
              //
            }
          />
        </ButtonWrapper>
      ),
    },
  ]
  const renderTable = useMemo(() => {
    if (!detectionList.data) return <Empty />
    if (detectionList.isSuccess)
      return (
        <>
          <CustomTable
            loading={detectionList.isLoading}
            data={flattenData(detectionList.data?.data)}
            columns={InfringementColumns}
          />
          <CustomPagination
            total={detectionList.data?.count}
            page={page}
            handlePageChange={(newPage) => handlePageChange(newPage as number)}
          />
        </>
      )
  }, [detectionList.data])

  return (
    <ContentContainer>
      <PageTitle text={'유출 정보 판별'} />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} date={date} setDate={setDate} />
        </Box>
        <Box></Box>
        <Box></Box>
        <Box>
          <ButtonContainer>
            <Button
              type={'primary'}
              onClick={() =>
                setRequest({
                  page: 1,
                  startdate: date.startdate,
                  enddate: date.enddate,
                })
              }
              text={'조회'}
            />
          </ButtonContainer>
        </Box>
      </SelectContainer>
      <ContentBox>{renderTable}</ContentBox>
      <CustomModal
        isOpen={isModalOpen}
        title='유출 정보 판별 상세 보기'
        onCancel={() => setIsModalOpen(false)}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomList
                label={'파일명'}
                value={viewData?.filename as string}
              />
              <CustomList
                label={'업로드 날짜'}
                value={viewData?.uploaddate as string}
              />
              <CustomList
                label={'담당자'}
                value={viewData?.uploader as string}
              />
              <CustomList
                label={'전체(중복제거)'}
                value={formatNumberWithCommas(viewData?.total || '')}
              />
              <CustomList
                label={'공공(중복제거)'}
                value={formatNumberWithCommas(viewData?.public || '')}
              />
              <CustomList
                label={'교육(중복제거'}
                value={formatNumberWithCommas(viewData?.education || '')}
              />
              <CustomList
                label={'포털(중복제거)'}
                value={formatNumberWithCommas(viewData?.portal || '')}
              />
              <CustomList
                label={'기타(중복제거)'}
                value={formatNumberWithCommas(viewData?.etc || '')}
              />
            </Flex>
            <CustomButton
              text={'대응 이력 보기'}
              type={'primary'}
              onClick={() =>
                navigate(`/issue/tracking/detail?seqidx=${viewData?.issueidx}`)
              }
            />
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}

export default InfringementPage
