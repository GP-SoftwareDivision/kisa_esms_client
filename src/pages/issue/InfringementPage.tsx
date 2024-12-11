import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Dropzone from 'react-dropzone'
import { MdUploadFile } from 'react-icons/md'

import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global'
import instance from '@/apis/instance'
import CustomDatePicker from '@/components/elements/DatePicker'
import CustomSelect from '@/components/elements/Select'
import CustomInput from '@/components/elements/Input'
import Button from '@/components/elements/Button'
import CustomTable from '@/components/charts/Table'
import PageTitle from '@/components/elements/PageTitle'
import { CloseButton } from '@/components/ui/close-button'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { InfringementColumns } from '@/constants/tableColumns.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import useFileDragDrop from '@/hooks/common/useFileDragDrop.tsx'
import useOptions from '@/hooks/common/useOptions.tsx'
import { notifyError } from '@/utils/notify.ts'

interface AccountListType {
  count: number
  data: object[]
  progress: 'Y' | 'N'
}

const InfringementPage = () => {
  const { page, handlePageChange } = usePagination()
  const {
    uploadFile,
    uploadFileName,
    dragFile,
    formData,
    startUpload,
    abortUpload,
  } = useFileDragDrop()
  const { responseOptions, fileTypeOptions } = useOptions()

  const [filename, setFilename] = useState<string>('')
  const [filetype, setFiletype] = useState<string>('')
  const [uploader, setUploader] = useState<string>('')
  const [isResponse, setIsResponse] = useState<string>('')

  // 조회기간
  const [date, setDate] = useState({
    startdate: '2024-12-06',
    enddate: '2024-12-06',
  })

  const [request, setRequest] = useState<object>({
    filename: filename,
    filetype: filetype,
    uploader: uploader,
    responsestatus: isResponse,
    startdate: date.startdate,
    enddate: date.enddate,
  })

  // 침해 정보 판별 리스트 전체 조회
  const accountList = useQueries<AccountListType>({
    queryKey: `accountList_${page}`,
    method: 'POST',
    url: '/api/account/list',
    body: { ...request, page: page },
  })

  // 담당자 리스트 조회
  const uploaderList = useQueries<{ uploaderlist: string[] }>({
    queryKey: 'uploaderList',
    method: 'POST',
    url: '/api/account/uploader',
  })

  // 파일 업로드
  const accountUpload = async () => {
    await startUpload()
    try {
      const response = await instance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      if (response.status === 200) {
        await instance.post(`/api/account/upload`, {
          filename: uploadFile?.name,
          uploader: 'syjin',
        })
      }
    } catch (error) {
      console.error('Error uploading file', error)
      notifyError(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
    }
  }

  // 다운로드 컬럼 추가
  const addDownloadColumns = [
    {
      header: '다운로드',
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
  ]

  return (
    <ContentContainer>
      <PageTitle text={'침해 정보 판별'} />
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
          type={
            uploadFileName && accountList.data?.progress === 'N'
              ? 'primary'
              : 'ghost'
          }
          disabled={!uploadFileName && accountList.data?.progress === 'Y'}
          onClick={accountUpload}
        />
      </UploadContainer>
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} date={date} setDate={setDate} />
        </Box>
        <Box>
          <CustomSelect
            label={'파일형식'}
            setState={setFiletype}
            options={fileTypeOptions}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'담당자'}
            setState={setUploader}
            options={
              uploaderList.isSuccess
                ? uploaderList.data?.uploaderlist.map((v) => ({
                    label: v,
                    value: v,
                  }))
                : []
            }
          />
        </Box>
        <Box>
          <CustomSelect
            label={'대응여부'}
            setState={setIsResponse}
            options={responseOptions}
          />
        </Box>
        <Box>
          <CustomInput
            id={'filename'}
            label={'파일명'}
            placeholder={'내용을 입력하세요.'}
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </Box>
        <Box></Box>
        <Box></Box>
        <Box>
          <ButtonContainer>
            <Button
              type={'primary'}
              onClick={() =>
                setRequest({
                  filename: filename,
                  filetype: filetype,
                  uploader: uploader,
                  responsestatus: isResponse,
                  startdate: date.startdate,
                  enddate: date.enddate,
                })
              }
              text={'조회'}
            />
          </ButtonContainer>
        </Box>
      </SelectContainer>
      <ContentBox>
        {accountList.isSuccess && (
          <>
            <CustomTable
              loading={accountList.isLoading}
              data={accountList.data.data}
              columns={InfringementColumns.concat(addDownloadColumns)}
            />
            <CustomPagination
              total={accountList.data.count}
              page={page}
              handlePageChange={(newPage) =>
                handlePageChange(newPage as number)
              }
            />
          </>
        )}
      </ContentBox>
    </ContentContainer>
  )
}

export default InfringementPage

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

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
