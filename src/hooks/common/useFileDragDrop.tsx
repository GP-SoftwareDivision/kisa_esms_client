import { useCallback, useState } from 'react'
// import { convertXlsxToCsv, getFileName } from '@/utils/fileHelpers.ts'
import { notifyError } from '@/utils/notify.ts'

const useFileDragDrop = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadFileName, setUploadFileName] = useState<string | null>(null)
  const formData = new FormData()

  const dragFile = useCallback((Files: any) => {
    const drag_file = Files[0]
    // const name = getFileName(drag_file.name)
    const name = drag_file.name
    const fileName = drag_file.name.split('.')
    const fileExtension = fileName[fileName.length - 1].toLowerCase()
    const isCorrectType = ['xlsx', 'csv', 'txt'].includes(fileExtension)
    if (!isCorrectType) {
      notifyError(
        '지원하는 형식이 아닙니다. xlsx, csv, txt의 파일 형식만 가능합니다.'
      )
      setUploadFile(null)
      setUploadFileName(null)
    } else {
      setUploadFile(drag_file)
      setUploadFileName(name)
    }
  }, [])

  // 업로드 시작
  const startUpload = async () => {
    if (!uploadFile) {
      notifyError('파일을 선택해주세요.')
      return false
    }
    // const type = uploadFile.name.split('.').pop()
    // const csvFile = await convertXlsxToCsv(uploadFile)

    // if (type === 'xlsx')
    //   formData.append(
    //     'file',
    //     new Blob([csvFile], { type: 'text/csv' }),
    //     `${uploadFileName}`
    //   )
    // else

    formData.append('file', uploadFile, `${uploadFileName}`)
  }

  // 업로드 취소
  const abortUpload = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setUploadFile(null)
    setUploadFileName(null)
  }

  return {
    uploadFile,
    setUploadFile,
    setUploadFileName,
    uploadFileName,
    dragFile,
    formData,
    startUpload,
    abortUpload,
  }
}

export default useFileDragDrop
