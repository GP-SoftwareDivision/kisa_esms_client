import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

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
import { useNavigate } from 'react-router-dom'
import Empty from '@/components/elements/Empty.tsx'

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

const InfringementPage = () => {
  const { page, handlePageChange } = usePagination(1)
  const navigate = useNavigate()

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
  const formatNumberWithCommas = (text: string) => {
    const localString = text.split('(')
    return (
      <span>{`${Number(localString[0]).toLocaleString()}(${Number(localString[1].slice(0, -1)).toLocaleString()})`}</span>
    )
  }

  const InfringementColumns = [
    {
      header: '파일형식',
      accessorKey: 'filetype',
    },
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
      header: '이력',
      accessorKey: '',
      cell: ({ row }: any) => (
        <ButtonWrapper>
          <Button
            type={'outline'}
            text={'이동'}
            onClick={() =>
              navigate(`/issue/tracking/detail?id=${row.original.issueidx}`)
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
    </ContentContainer>
  )
}

export default InfringementPage

const ButtonWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
`
