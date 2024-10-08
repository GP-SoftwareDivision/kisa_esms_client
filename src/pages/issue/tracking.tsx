import React, { useState } from 'react'
import axios from 'axios'

const Tracking = () => {
  const [file, setFile] = useState<File | null>(null)
  // const [fileName, setFileName] = useState<string | null>(null)
  const API_URL = import.meta.env.VITE_API_URL

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

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
export default Tracking
