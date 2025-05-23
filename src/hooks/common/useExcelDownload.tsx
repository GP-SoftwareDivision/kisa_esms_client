import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notifyError } from '@/utils/notify.ts'
import queryToJson from '@/utils/queryToJson.ts'
import { useState } from 'react'

interface ExcelDownloadType {
  endpoint: string
  params: string
  fileName: string
}

export const useExcelDownload = () => {
  const navigate = useNavigate()
  const [excelDownloadLoading, setExcelDownloadLoading] =
    useState<boolean>(false)
  const excelDownload = useMutation({
    mutationKey: ['excelDownload'],
    mutationFn: async (data: ExcelDownloadType) => {
      setExcelDownloadLoading(true)

      const response = await instance.post(
        `/api/download${data.endpoint}`,
        queryToJson(data.params),
        { responseType: 'blob' }
      )

      const url = window.URL.createObjectURL(response.data as Blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${data.fileName}`)
      link.style.cssText = 'display:none'
      document.body.appendChild(link)
      link.click()
      link.remove()

      window.URL.revokeObjectURL(url)
      setExcelDownloadLoading(false)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        setExcelDownloadLoading(false)
        switch (status) {
          case 400:
            notifyError(`중복된 계정입니다. 다시 입력해주세요.`)
            break
          case 401:
            notifyError(
              `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
            )
            setTimeout(() => {
              navigate('/login')
            }, 3000)
            break

          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: () => {},
  })

  return { excelDownload, excelDownloadLoading }
}
