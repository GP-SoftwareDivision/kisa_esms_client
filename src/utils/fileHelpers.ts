import * as XLSX from 'xlsx'

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
  const fileNameParts = name.split('.')

  const fileExtension = fileNameParts.pop() || ''
  const fileNameWithoutExtension = fileNameParts.join('.')

  const fileType = getExtensionType(name)
  const sanitizedFileName = fileNameWithoutExtension.replace(/[^\w\s-]/g, '')
  return `${sanitizedFileName}.${fileType || fileExtension}`
}
