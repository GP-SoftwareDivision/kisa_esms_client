import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import instance from '@/apis/instance.ts'
import { notifyError } from '@/utils/notify.ts'
import { TelegramDetailType } from '@/pages/retrieve/TelegramDetailPage.tsx'

interface IUseInfiniteQuery {
  queryKey: string
  seqidx: string
  type: 'prev' | 'default' | 'next'
}

export const useInfiniteQueries = (props: IUseInfiniteQuery) => {
  const navigate = useNavigate()
  const { queryKey, seqidx, type } = props

  const [infiniteData, setInfiniteData] = useState<TelegramDetailType[]>([])
  const [originalInfiniteData, setOriginalInfiniteData] = useState<
    TelegramDetailType[]
  >([])

  const [isNextEnd, setIsNextEnd] = useState<boolean>(false)
  const [isPrevEnd, setIsPrevEnd] = useState<boolean>(false)

  const ttHistoryData = useInfiniteQuery({
    queryKey: [queryKey, seqidx, type],
    queryFn: async () => {
      try {
        const response = await instance.post(`/api/monitoring/${queryKey}`, {
          seqidx,
          type,
        })
        return response.data.data
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          switch (status) {
            case 400:
              notifyError('마지막 데이터 입니다.')
              break
            case 401:
              notifyError(
                `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
              )
              setTimeout(() => {
                navigate('/login')
              }, 2000)
              break

            default:
              notifyError(
                `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
              )
          }
        }
        throw new AxiosError()
      }
    },
    retry: 0,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1
    },
  })

  useEffect(() => {
    if (ttHistoryData.isSuccess && ttHistoryData.data) {
      const newData = ttHistoryData.data.pages.flatMap((page) => page)
      // 검색 초기화를 위한 오리지날 데이터
      if (type === 'prev') {
        if (Object.keys(newData[0]).length === 0) {
          notifyError('마지막 데이터 입니다.')
          setIsPrevEnd(true)
          return
        }
        setInfiniteData((prevData) => [...newData, ...prevData])
        setOriginalInfiniteData((prevData) => [...prevData, ...newData])
      } else if (type === 'next') {
        if (Object.keys(newData[0]).length === 0) {
          notifyError('마지막 데이터 입니다.')
          setIsNextEnd(true)
          return
        }
        setInfiniteData((prevData) => [...prevData, ...newData])
        setOriginalInfiniteData((prevData) => [...prevData, ...newData])
      } else {
        setInfiniteData(newData)
        setOriginalInfiniteData(newData)
      }
    }
  }, [ttHistoryData.data, type])

  return {
    ttHistoryData,
    originalInfiniteData,
    infiniteData,
    setInfiniteData,
    isPrevEnd,
    isNextEnd,
  }
}
