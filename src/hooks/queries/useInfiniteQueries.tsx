import { useInfiniteQuery } from '@tanstack/react-query'
import instance from '@/apis/instance.ts'
import { useState, useEffect } from 'react'
import { notifyError } from '@/utils/notify.ts'

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
  const { queryKey, seqidx, type } = props
  const [infiniteData, setInfiniteData] = useState<infiniteDataType[]>([])
  const [isNextEnd, setIsNextEnd] = useState<boolean>(false)
  const [isPrevEnd, setIsPrevEnd] = useState<boolean>(false)

  const ttHistoryData = useInfiniteQuery({
    queryKey: [queryKey, seqidx, type],
    queryFn: async () => {
      const response = await instance.post(`/api/monitoring/${queryKey}`, {
        seqidx,
        type,
      })
      return response.data.data
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
