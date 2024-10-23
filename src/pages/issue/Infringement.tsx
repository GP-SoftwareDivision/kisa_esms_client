import { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'
import dayjs from 'dayjs'

const Infringement = () => {
  const now = dayjs()
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const API_URL = import.meta.env.VITE_API_URL

  const convertXlsxToCsv = (file: File): Promise<string> => {
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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const formattedDateTime = now.format('YYYYMMDDHHmmss')
      const fileNameParts = file.name.split('.')
      const fileExtension = fileNameParts.pop() || ''
      const fileNameWithoutExtension = fileNameParts.join('.')

      const fileType = getExtensionType(file.name)
      const sanitizedFileName = fileNameWithoutExtension.replace(
        /[^\w\s-]/g,
        ''
      )

      setFile(file)
      setFileName(
        `${sanitizedFileName}_${formattedDateTime}.${fileType || fileExtension}`
      )
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.')
      return
    }
    const formData = new FormData()
    const type = file.name.split('.').pop()
    const csvFile = await convertXlsxToCsv(file)

    if (type === 'xlsx')
      formData.append(
        'file',
        new Blob([csvFile], { type: 'text/csv' }),
        `${fileName}`
      )
    else formData.append('file', file, `${fileName}`)

    try {
      const response = await axios.post(
        'http://localhost:8080/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        const response2 = await axios.post(
          `${API_URL}/WebESMSUploadService.svc/TestUpload`,
          {
            filename: file.name,
            uploader: 'syjin',
          }
        )
        console.log(response2)
      }
    } catch (error) {
      console.error('Error uploading file', error)
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button type='submit' onClick={handleUpload}>
        업로드
      </button>
    </div>
  )
}
export default Infringement
// import * as XLSX from 'xlsx'
// import axios from 'axios'
//
// const DarkWeb = () => {
//   const API_URL = import.meta.env.VITE_API_URL
//   const uploadExcel = async (
//     retrieve: string,
//     filename: string,
//     filetype: string
//   ) => {
//     const req = {
//       filename: filename,
//       filetype: filetype,
//       account: retrieve,
//       uploader: 'syjin',
//     }
//     const res = await axios.post(
//       `${API_URL}/WebESMSUploadService.svc/UploadAccountData`,
//       req
//     )
//
//     console.log(res)
//   }
//
//   const handleConvertJson = (retrieve: any, name: string, type: string) => {
//     const firstData = Object.values(retrieve[0])
//     const NewData = retrieve.map((v: string) => Object.values(v)[0])
//
//     let result
//     if (type === 'txt') result = NewData
//     else {
//       if (firstData.length > 1)
//         result = retrieve.map((v: any) => `${v.ID}@${v.도메인}:${v.PW}`)
//       else result = firstData.concat(NewData)
//     }
//
//     uploadExcel(JSON.stringify(result), name, type)
//   }
//
//   const handleFileChange = async (e: any) => {
//     const file = e.target.files[0]
//     if (file) {
//       const name = file.name
//       // const size = file.size
//       const type = name.split('.').pop()
//
//       const reader = new FileReader()
//       reader.onload = (event) => {
//         const retrieve = new Uint8Array(event.target?.result as any)
//         const workbook = XLSX.read(retrieve, { type: 'array' })
//         const sheetName = workbook.SheetNames[0]
//         const sheet = workbook.Sheets[sheetName]
//         const jsonData = XLSX.utils.sheet_to_json(sheet)
//         handleConvertJson(jsonData, name, type)
//       }
//       reader.readAsArrayBuffer(file)
//     }
//   }
//
//   return (
//     <>
//       <input type='file' onChange={handleFileChange} />
//     </>
//   )
// }
// export default DarkWeb
