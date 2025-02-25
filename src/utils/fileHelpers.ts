import * as XLSX from 'xlsx'

// csv의 처리 속도가 빠른 이유로
// xlsx => csv로 바꿈

export const convertXlsxToCsv = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (e: any) {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })

      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const csvData = XLSX.utils.sheet_to_csv(worksheet)

      resolve(csvData)
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsArrayBuffer(file) // XLSX 파일을 읽음
  })
}

const getExtensionType = (name: string): string | null => {
  if (!name) return null

  const extension = name.split('.').pop()?.toLowerCase()
  return extension === 'xlsx' ? 'csv' : extension || null
}

export const getFileName = (name: string) => {
  const possibleType = ['csv', 'xlsx', 'txt']

  const file = name.split('.')

  // 파일 확장자 유효성 검사
  const fileType = file[file.length - 1]
  if (fileType && !possibleType.includes(fileType)) return null

  const fileName = name.split(`.${fileType}`)[0]

  return `${fileName}.${getExtensionType(name) || fileType}`
}
