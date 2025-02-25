import * as XLSX from 'xlsx'

// csv의 처리 속도가 빠른 이유로 xlsx => csv로 바꾸는 함수들
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
  // ex) test.xlsx
  const file = name.split('.')
  file.pop()
  const fileName = file.join('')
  const fileType = getExtensionType(name)

  return `${fileName}.${fileType || file[file.length - 1]}`
}
