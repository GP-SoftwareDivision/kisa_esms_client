import Dropzone from 'react-dropzone'
import { useMemo, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { MdUploadFile } from 'react-icons/md'
import styled from '@emotion/styled'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import Button from '@/components/elements/Button.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import instance from '@/apis/instance.ts'
import CustomModal from '@/components/elements/Modal.tsx'
import useUploadMutation from '@/hooks/mutations/useUploadMutation.tsx'
import { CloseButton } from '@/components/ui/close-button.tsx'
import useFileDragDrop from '@/hooks/common/useFileDragDrop.tsx'
import { targetOptions } from '@/data/selectOptions.ts'
import { Loading } from '@/components/elements/Loading.tsx'
import Empty from '@/components/elements/Empty.tsx'
import queryToJson from '@/utils/queryToJson.ts'
import { notifyError } from '@/utils/notify.ts'
import { updateSearchCondition } from '@/utils/stateHandlers.ts'
import { useExcelDownload } from '@/hooks/common/useExcelDownload.tsx'
import dayjs from 'dayjs'

// 대응 이력 현황 타입 정의
interface ResponseListType {
  seqidx: number
  regdate: string
  targettype: string
  hackedorganization: string
  incidenttype: string
  channeltype: string
  keyword: string
  darktelegramname: string
  firstrecogition: string
}

const TrackingPage = () => {
  const now = dayjs()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const { page, setPage, handlePageChange } = usePagination(
    Number(queryParams.get('page')) || 1
  )
  // 업로드 훅
  const { openInsertUpload, closeInsertUpload, insertUploadOpen } =
    useUploadMutation()

  // 업로드 전 파일 드래그 앤 드롭 훅
  const { uploadFile, uploadFileName, dragFile, startUpload, abortUpload } =
    useFileDragDrop()

  // 엑셀 다운로드
  const excelDownload = useExcelDownload()

  const [seqidx, setSeqidx] = useState<number>(0)

  // 조회기간
  const [date, setDate] = useState({
    startdate: queryParams.get('startdate') || '',
    enddate: queryParams.get('enddate') || '',
  })

  // 대상 구분 / 사고 유형 / 채널 구분 / 최초 인지 / 피해기관 / 채널명 / 키워드
  const [searchConditions, setSearchConditions] = useState({
    targetType: queryParams.get('targetType') || '',
    incidentType: queryParams.get('incidentType') || '',
    apiType: queryParams.get('apiType') || '',
    originType: queryParams.get('originType') || '',
    institution: queryParams.get('institution') || '',
    channelName: queryParams.get('channelName') || '',
    keyword: queryParams.get('keyword') || '',
  })

  // 검색 이벤트
  const handleOnSearch = () => {
    const params = new URLSearchParams({
      type: 'I',
      page: page.toString(),
      startdate: date.startdate,
      enddate: date.enddate,
      ...searchConditions,
    }).toString()
    setPage(1)
    navigate(`?${params}`)
  }

  // 이슈 대응 이력 리스트 API
  const responseList = useQueries<{ data: ResponseListType[]; count: number }>({
    queryKey: `responseList`,
    method: 'POST',
    url: `/api/issue/history`,
    body: queryToJson(location.search),
  })

  // 파일 업로드할 수 있는 팝업 열리는 이벤트
  const handleOnFileUpload = (event: any, id: number) => {
    event.stopPropagation()
    openInsertUpload()
    setSeqidx(id)
  }

  // 테이블 컬럼
  const responseListColumns = [
    {
      header: '등록일시',
      accessorKey: 'registrationDate',
    },
    {
      header: '대상구분',
      accessorKey: 'targetType',
      cell: ({ row }: any) => {
        const matching = targetOptions
          .filter((item) =>
            row.original.targetType.split('/').includes(item.value)
          )
          .map((item) => item.label)
        return matching.join('/')
      },
    },
    {
      header: '피해기관',
      accessorKey: 'institution',
    },
    {
      header: '사고유형',
      accessorKey: 'incidentType',
    },
    {
      header: '채널구분',
      accessorKey: 'domainType',
    },
    {
      header: '채널명',
      accessorKey: 'channelName',
    },
    {
      header: '최초인지',
      accessorKey: 'originType',
    },
    {
      header: '키워드',
      accessorKey: 'keyword',
    },
    {
      header: '업로드',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <Box display={'flex'} justifyContent={'center'}>
          <StyledButton
            onClick={(e: any) => handleOnFileUpload(e, row.original.issueIdx)}
          >
            파일선택
          </StyledButton>
        </Box>
      ),
    },
  ]

  // 파일 업로드
  const accountUpload = async () => {
    await startUpload()
    try {
      // const response = await instance.post('/upload', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      //   withCredentials: true,
      // })
      const response = await instance.post(`/api/issue/detection/file/upload`, {
        seqidx,
        filename: uploadFile?.name,
        uploader: 'syjin',
      })
      return response.data
      // if (response.status === 200) {
      // }
    } catch (error) {
      console.error('Error uploading file', error)
      notifyError(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
    }
  }

  const renderTable = useMemo(() => {
    if (responseList.isLoading) return <Loading />
    if (!responseList.data) return <Empty />
    if (responseList.isSuccess)
      return (
        <ContentBox mt={4}>
          <CustomTable
            loading={false}
            data={responseList.data?.data ? responseList.data?.data : []}
            columns={responseListColumns}
            detailIdx={'seqidx'}
          />
          <CustomPagination
            total={responseList.data?.count}
            page={page}
            handlePageChange={(newPage) => {
              handlePageChange(newPage as number)
              queryParams.set('page', newPage.toString())
              navigate(`?${queryParams.toString()}`)
            }}
          />
        </ContentBox>
      )
  }, [responseList.data, responseList.isLoading, responseList.isSuccess])

  return (
    <ContentContainer>
      <PageTitle
        text={'대응 이력'}
        children={
          <ButtonContainer>
            <Button
              type={'tertiary'}
              onClick={() => navigate('detail/form')}
              text={'추가'}
            />
            <Button
              type={'secondary'}
              onClick={() =>
                excelDownload.mutate({
                  endpoint: '/issue/history',
                  params: queryToJson(location.search),
                  fileName: `대응이력_${now.format('YYYY-MM-DD HH:mm:ss')}.xlsx`,
                })
              }
              text={'엑셀 다운로드'}
            />
          </ButtonContainer>
        }
      />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회기간'} date={date} setDate={setDate} />
        </Box>
        <Box>
          <CustomSelect
            label={'대상구분'}
            options={[{ value: '', label: '전체' }, ...targetOptions]}
            value={searchConditions.targetType}
            onChange={(item: { items: any; value: string[] }) =>
              updateSearchCondition(
                setSearchConditions,
                'targetType',
                item.value.join(',')
              )
            }
          />
        </Box>
        <Box>
          <CustomInput
            id={'institution'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={searchConditions.institution}
            onChange={(e) =>
              updateSearchCondition(
                setSearchConditions,
                'institution',
                e.target.value
              )
            }
          />
        </Box>
        <Box>
          <CustomSelect
            label={'사고유형'}
            options={[
              { value: '', label: '전체' },
              { value: '정보유출', label: '정보유출' },
              { value: '공격예고', label: '공격예고' },
              { value: 'DDoS', label: 'DDoS' },
              { value: '랜섬웨어', label: '랜섬웨어' },
              { value: '웹변조', label: '웹변조' },
              { value: '취약점', label: '취약점' },
              { value: '정보노출', label: '정보노출' },
              { value: '기타해킹', label: '기타해킹' },
              { value: '확인불가', label: '확인불가' },
              { value: '기타', label: '기타' },
            ]}
            value={searchConditions.incidentType}
            onChange={(item: { items: any; value: string[] }) =>
              updateSearchCondition(
                setSearchConditions,
                'incidentType',
                item.value.join(',')
              )
            }
          />
        </Box>
        <Box>
          <CustomSelect
            label={'채널구분'}
            options={[
              { value: '', label: '전체' },
              { value: '다크웹', label: '다크웹' },
              { value: '해킹포럼', label: '해킹포럼' },
              { value: '텔레그램', label: '텔레그램' },
              { value: 'SNS', label: 'SNS' },
              { value: '블로그', label: '블로그' },
              { value: '기타', label: '기타' },
            ]}
            value={searchConditions.apiType}
            onChange={(item: { items: any; value: string[] }) =>
              updateSearchCondition(
                setSearchConditions,
                'apiType',
                item.value.join(',')
              )
            }
          />
        </Box>
        <Box>
          <CustomInput
            id={'channelName'}
            label={'채널명'}
            placeholder={'내용을 입력하세요.'}
            value={searchConditions.channelName}
            onChange={(e) =>
              updateSearchCondition(
                setSearchConditions,
                'channelName',
                e.target.value
              )
            }
          />
        </Box>
        <Box>
          <CustomSelect
            label={'최초인지'}
            options={[
              { value: '', label: '전체' },
              { value: '자체탐지', label: '자체탐지' },
              { value: 'S2W', label: 'S2W' },
              { value: '금융보안원', label: '금융보안원' },
              { value: '경찰청', label: '경찰청' },
              { value: '언론보도', label: '언론보도' },
              { value: '기타', label: '기타' },
            ]}
            value={searchConditions.originType}
            onChange={(item: { items: any; value: string[] }) =>
              updateSearchCondition(
                setSearchConditions,
                'originType',
                item.value.join(',')
              )
            }
          />
        </Box>
        <Box>
          <CustomInput
            id={'keyword'}
            label={'키워드'}
            placeholder={'내용을 입력하세요.'}
            value={searchConditions.keyword}
            onChange={(e) =>
              updateSearchCondition(
                setSearchConditions,
                'keyword',
                e.target.value
              )
            }
          />
        </Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <ButtonContainer>
          <Button type={'primary'} onClick={handleOnSearch} text={'조회'} />
        </ButtonContainer>
      </SelectContainer>
      {renderTable}
      <CustomModal
        isOpen={insertUploadOpen}
        title='업로드'
        onCancel={closeInsertUpload}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <UploadContainer>
                <Dropzone onDrop={dragFile}>
                  {({ getRootProps, getInputProps }) => (
                    <StyledFileUpload {...getRootProps()}>
                      <input
                        {...getInputProps()}
                        accept={
                          '.xlsx,.csv,.txt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain'
                        }
                      />
                      <StyledFileIcon />
                      <p>
                        {uploadFileName
                          ? uploadFileName
                          : '업로드할 파일 놓기 또는 파일 선택'}
                      </p>
                      {uploadFile && (
                        <CloseButton
                          me='-1'
                          size='xs'
                          variant='plain'
                          focusVisibleRing='inside'
                          focusRingWidth='2px'
                          pointerEvents='auto'
                          color='fg.subtle'
                          height={'auto'}
                          onClick={abortUpload}
                        />
                      )}
                    </StyledFileUpload>
                  )}
                </Dropzone>
                <Button
                  text={'파일 업로드'}
                  type={'primary'}
                  onClick={accountUpload}
                />
              </UploadContainer>
            </Flex>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default TrackingPage

const StyledButton = styled.button`
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold !important;
  padding: 3px 6px;
  ${({ theme }) => theme.typography.body3};
`

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const UploadContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 1rem;
`

const StyledFileUpload = styled.div`
  width: 100%;
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.25rem;
  align-items: center;
  padding: 0.3rem 0.6rem;
  cursor: pointer;

  p {
    ${({ theme }) => theme.typography.body2};
  }
`

const StyledFileIcon = styled(MdUploadFile)`
  margin-right: 0.3rem;
  color: ${({ theme }) => theme.color.gray800};
`
