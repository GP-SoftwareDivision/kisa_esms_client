import * as XLSX from 'xlsx'
import axios from 'axios'

const MainPage = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const uploadExcel = async (
    retrieve: string,
    filename: string,
    filetype: string
  ) => {
    const req = {
      filename: filename,
      filetype: filetype,
      account: retrieve,
      uploader: 'syjin',
    }
    const res = await axios.post(
      `${API_URL}/WebESMSUploadService.svc/UploadAccountData`,
      req
    )

    console.log(res)
  }

  const handleConvertJson = (retrieve: any, name: string, type: string) => {
    const firstData = Object.values(retrieve[0])
    const NewData = retrieve.map((v: string) => Object.values(v)[0])

    let result
    if (type === 'txt') result = NewData
    else {
      if (firstData.length > 1)
        result = retrieve.map((v: any) => `${v.ID}@${v.도메인}:${v.PW}`)
      else result = firstData.concat(NewData)
    }

    uploadExcel(JSON.stringify(result), name, type)
  }

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const name = file.name
      // const size = file.size
      const type = name.split('.').pop()

      const reader = new FileReader()
      reader.onload = (event) => {
        const retrieve = new Uint8Array(event.target?.result as any)
        const workbook = XLSX.read(retrieve, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(sheet)
        handleConvertJson(jsonData, name, type)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <>
      <input type='file' onChange={handleFileChange} />
    </>
  )
}
export default MainPage
