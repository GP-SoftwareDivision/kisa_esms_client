import { useCallback, useState } from 'react'
import { convertXlsxToCsv, getFileName } from '@/utils/fileHelpers.ts'
import { notifyError } from '@/utils/notify.ts'

const useFileDragDrop = () => {
  // 원본 파일 상태
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  // 파일 이름 (변경 가능)
  const [uploadFileName, setUploadFileName] = useState<string | null>(null)
  const formData = new FormData()

  const dragFile = useCallback((Files: any) => {
    const drag_file = Files[0]
    const name = getFileName(drag_file.name)

    if (!name) {
      notifyError(
        '지원하는 형식이 아닙니다. xlsx, csv, txt의 파일 형식만 가능합니다.'
      )
      setUploadFile(null)
      setUploadFileName(null)
      return
    }

    setUploadFile(drag_file)
    setUploadFileName(name)
  }, [])

  // 업로드 시작
  const startUpload = async () => {
    if (!uploadFile) {
      notifyError('파일을 선택해주세요.')
      return false
    }
    const type = uploadFile.name.split('.').pop()
    const csvFile = await convertXlsxToCsv(uploadFile)

    if (type === 'xlsx')
      formData.append(
        'file',
        new Blob([csvFile], { type: 'text/csv' }),
        `${uploadFileName}`
      )
    else formData.append('file', uploadFile, `${uploadFileName}`)
  }

  // 업로드 상태 초기화
  const cleanUploadState = () => {
    setUploadFile(null)
    setUploadFileName(null)
  }

  // 업로드 취소
  const abortUpload = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    cleanUploadState()
  }

  return {
    uploadFile,
    uploadFileName,
    dragFile,
    formData,
    startUpload,
    abortUpload,
    cleanUploadState,
  }
}

export default useFileDragDrop
