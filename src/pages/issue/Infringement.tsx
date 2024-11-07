import { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import type { UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'

import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import styled from '@emotion/styled'
import { convertXlsxToCsv, getFileName } from '@/utils/fileHelpers.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import { useQueryHandler } from '@/hooks/useQueryHandler.tsx'
import instance from '../../apis/instance.ts'
import { InfringementColumns } from '../../data/columns/Infringement.ts'

interface DataType {
  seqidx: number
  filetype: string
  filename: string
  uploader: string
  new_public: number
  response_public: number
  duplication_public: number
  new_education: number
  response_education: number
  duplication_education: number
  new_etc: number
  response_etc: number
  duplication_etc: number
  new_naver: number
  duplication_naver: number
  new_nate: number
  duplication_nate: number
  new_kakao: number
  duplication_kakao: number
  new_count: number
  total_count: number
  uploaddate: string
  firstrecognition: string
  responsestatus: string
}

interface AccountListType {
  count: number
  data: DataType[]
  progress: 'Y' | 'N'
  uploaderlist: string[]
}

const Infringement = () => {
  // 업로드를 위한 상태
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadFileName, setUploadFileName] = useState<string | null>(null)

  // 검색을 위한 상태
  const [pageNum, setPageNum] = useState<number>(1)
  const [filename, setFilename] = useState<string>('')
  const [filetype, setFiletype] = useState<string>('')
  const [uploader, setUploader] = useState<string>('')
  const [isResponse, setIsResponse] = useState<string>('')
  const [date, setDate] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  })

  // 검색 옵션
  const [request, setRequest] = useState<object>({
    filename: filename,
    filetype: filetype,
    uploader: uploader,
    responsestatus: isResponse,
    startdate: date.start,
    enddate: date.end,
  })

  // 리스트 호출
  const accountList = useQueryHandler<AccountListType>({
    method: 'POST',
    url: '/api/accountList',
    body: { ...request, page: pageNum },
  })

  const columns = [
    {
      header: '다운로드',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <ButtonWrapper>
          <Button
            type={'download'}
            text={'다운로드'}
            onClick={() => console.log(row.original)}
          />
        </ButtonWrapper>
      ),
    },
  ]

  const handleUpload = async () => {
    if (!uploadFile) {
      alert('파일을 선택해주세요.')
      return
    }
    const formData = new FormData()
    const type = uploadFile.name.split('.').pop()
    const csvFile = await convertXlsxToCsv(uploadFile)

    if (type === 'xlsx')
      formData.append(
        'file',
        new Blob([csvFile], { type: 'text/csv' }),
        `${uploadFileName}`
      )
    else formData.append('file', uploadFile, `${uploadFileName}`)

    try {
      const response = await instance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      if (response.status === 200) {
        await instance.post(`/api/accountUpload`, {
          filename: uploadFile.name,
          uploader: 'syjin',
        })
      }
    } catch (error) {
      console.error('Error uploading file', error)
    }
  }

  // 드래그 조건
  const props: UploadProps = {
    accept:
      '.xlsx,.csv,.txt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain',
    onRemove: () => {
      setUploadFile(null)
      setUploadFileName(null)
    },
    beforeUpload: (file) => {
      const name = getFileName(file.name)
      setUploadFile(file)
      setUploadFileName(name)
      return false
    },
    onDrop: (e) => {
      const drag_file = e.dataTransfer.files[0]
      const name = getFileName(drag_file.name)

      const fileName = drag_file.name.split('.')
      const fileExtension = fileName[fileName.length - 1].toLowerCase()
      const isCorrectType = ['xlsx', 'csv', 'txt'].includes(fileExtension)

      if (!isCorrectType) {
        alert(
          '지원하는 형식이 아닙니다. xlsx, csv, txt의 파일 형식만 가능합니다.'
        )
        setUploadFile(null)
        setUploadFileName(null)
      } else {
        setUploadFile(drag_file)
        setUploadFileName(name)
      }
    },
    maxCount: 1,
    showUploadList: !!uploadFileName,
  }

  // 대응 여부 옵션 메모제이션
  const memoizedResponseOptions = useMemo(
    () => [
      { value: '대기', label: '대기' },
      { value: '진행중', label: '진행중' },
      { value: '완료', label: '완료' },
    ],
    []
  )

  // 파일 형식 옵션 메모제이션
  const memoizedFileTypeOptions = useMemo(
    () => [
      { value: 'xlsx', label: 'xlsx' },
      { value: 'csv', label: 'csv' },
      { value: 'txt', label: 'txt' },
    ],
    []
  )

  // 검색
  const handleOnSearch = () => {
    const tmpReq = {
      filename: filename,
      filetype: filetype,
      uploader: uploader,
      responsestatus: isResponse,
      startdate: date.start,
      enddate: date.end,
    }
    setRequest(tmpReq)
  }
  return (
    <ContentContainer>
      <PageTitle text={'침해 정보 판별'} />
      <UploadContainer>
        <StyledDragger {...props}>
          {!uploadFileName && '업로드할 파일 놓기 또는 파일 선택'}
        </StyledDragger>
        <Button
          text={'파일 업로드'}
          type={
            uploadFileName && accountList.data?.progress === 'N'
              ? 'primary'
              : 'disabled'
          }
          disabled={!uploadFileName && accountList.data?.progress === 'Y'}
          onClick={handleUpload}
        />
      </UploadContainer>
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} setDate={setDate} />
        </Box>
        <Box>
          <CustomSelect
            label={'파일형식'}
            setState={setFiletype}
            options={memoizedFileTypeOptions}
          />
        </Box>
        <Box>
          {accountList.isSuccess && (
            <CustomSelect
              label={'담당자'}
              setState={setUploader}
              options={accountList.data.uploaderlist?.map((v) => ({
                value: v,
                label: v,
              }))}
            />
          )}
        </Box>
        <Box>
          <CustomSelect
            label={'대응여부'}
            setState={setIsResponse}
            options={memoizedResponseOptions}
          />
        </Box>
        <Box>
          <CustomInput
            label={'파일명'}
            placeholder={'내용을 입력하세요.'}
            value={filename}
            onchange={(e) => setFilename(e.target.value)}
          />
        </Box>
        <Box></Box>
        <Box></Box>
        <Box>
          <ButtonContainer>
            <div></div>
            <Button type={'primary'} onClick={handleOnSearch} text={'조회'} />
          </ButtonContainer>
        </Box>
      </SelectContainer>
      <ContentBox>
        {accountList.isSuccess && (
          <CustomTable
            data={accountList.data.data}
            columns={InfringementColumns.concat(columns)}
            pagination={true}
            setPageNum={setPageNum}
            total={accountList.data.count}
          />
        )}
      </ContentBox>
    </ContentContainer>
  )
}
export default Infringement

const UploadContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 1rem;
  position: relative;

  .ant-upload-wrapper .ant-upload-drag .ant-upload {
    padding: 4px 8px;
  }
`

const StyledDragger = styled(Dragger)`
  width: 100%;
  ${({ theme }) => theme.typography.body2};
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
