import { useInfiniteQuery } from '@tanstack/react-query'
import instance from '@/apis/instance.ts'
import { useState, useEffect } from 'react'
import { notifyError } from '@/utils/notify.ts'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface IUseInfiniteQuery {
  queryKey: string
  seqidx: string
  type: 'prev' | 'default' | 'next'
}

interface infiniteDataType {
  seqidx: number
  channelurl: string
  username: string
  keyword: string
  channel: string
  writetime: string
  contents: string
  contents2: string
  trancontents: string
  trancontents2: string
  threatflag: string
  threatlog: string
  issueresponseflag: string
  regdate: string
}

export const useInfiniteQueries = (props: IUseInfiniteQuery) => {
  const navigate = useNavigate()
  const { queryKey, seqidx, type } = props
  const [infiniteData, setInfiniteData] = useState<infiniteDataType[]>([])
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
      }
      console.error()
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1
    },
  })

  useEffect(() => {
    if (ttHistoryData.isSuccess && ttHistoryData.data) {
      const newData = ttHistoryData.data.pages.flatMap((page) => page)

      if (type === 'prev') {
        if (Object.keys(newData[0]).length === 0) {
          notifyError('마지막 데이터 입니다.')
          setIsPrevEnd(true)
          return
        }
        setInfiniteData((prevData) => [...newData, ...prevData])
      } else if (type === 'next') {
        if (Object.keys(newData[0]).length === 0) {
          notifyError('마지막 데이터 입니다.')
          setIsNextEnd(true)
          return
        }
        setInfiniteData((prevData) => [...prevData, ...newData])
      } else {
        setInfiniteData(newData)
      }
    }
  }, [ttHistoryData.data, type])

  return { ttHistoryData, infiniteData, isPrevEnd, isNextEnd }
}
