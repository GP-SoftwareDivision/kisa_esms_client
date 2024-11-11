import { useState, useCallback, useMemo } from 'react'
import { useQueryHandler } from '@/hooks/useQueryHandler'
import { convertXlsxToCsv, getFileName } from '@/utils/fileHelpers'
import instance from '@/apis/instance'
import { notify } from '@/utils/notify'

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

export const useInfringement = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadFileName, setUploadFileName] = useState<string | null>(null)
  const [pageNum, setPageNum] = useState<number>(1)
  const [filename, setFilename] = useState<string>('')
  const [filetype, setFiletype] = useState<string>('')
  const [uploader, setUploader] = useState<string>('')
  const [isResponse, setIsResponse] = useState<string>('')
  const [date, setDate] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  })
  const [request, setRequest] = useState<object>({
    filename: filename,
    filetype: filetype,
    uploader: uploader,
    responsestatus: isResponse,
    startdate: date.start,
    enddate: date.end,
  })

  const accountList = useQueryHandler<AccountListType>({
    method: 'POST',
    url: '/api/accountList',
    body: { ...request, page: pageNum },
  })

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
        headers: { 'Content-Type': 'multipart/form-data' },
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

  const memoizedResponseOptions = useMemo(
    () => [
      { value: '대기', label: '대기' },
      { value: '진행중', label: '진행중' },
      { value: '완료', label: '완료' },
    ],
    []
  )

  const memoizedFileTypeOptions = useMemo(
    () => [
      { value: 'xlsx', label: 'xlsx' },
      { value: 'csv', label: 'csv' },
      { value: 'txt', label: 'txt' },
    ],
    []
  )

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

  const onDrop = useCallback((acceptedFiles: any) => {
    const drag_file = acceptedFiles[0]
    const name = getFileName(drag_file.name)
    const fileName = drag_file.name.split('.')
    const fileExtension = fileName[fileName.length - 1].toLowerCase()
    const isCorrectType = ['xlsx', 'csv', 'txt'].includes(fileExtension)
    if (!isCorrectType) {
      notify(
        '지원하는 형식이 아닙니다. xlsx, csv, txt의 파일 형식만 가능합니다.'
      )
      setUploadFile(null)
      setUploadFileName(null)
    } else {
      setUploadFile(drag_file)
      setUploadFileName(name)
    }
  }, [])

  const canCleUpload = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setUploadFile(null)
    setUploadFileName(null)
  }

  return {
    uploadFile,
    uploadFileName,
    pageNum,
    setPageNum,
    filename,
    setFilename,
    filetype,
    setFiletype,
    uploader,
    setUploader,
    isResponse,
    setIsResponse,
    date,
    setDate,
    accountList,
    handleUpload,
    memoizedResponseOptions,
    memoizedFileTypeOptions,
    handleOnSearch,
    onDrop,
    canCleUpload,
  }
}
