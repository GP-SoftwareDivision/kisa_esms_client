import { useInfiniteQuery } from '@tanstack/react-query'
import instance from '@/apis/instance.ts'

interface IUseInfiniteQuery {
  queryKey: string
  seqidx?: string
  type: 'prev' | 'default' | 'next'
}

export const useInfiniteQueries = (props: IUseInfiniteQuery) => {
  const { queryKey, seqidx, type } = props
  console.log('호출')
  return useInfiniteQuery({
    queryKey: [queryKey, type],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await instance.post(`/api/monitoring/${queryKey}`, {
        seqidx: seqidx,
        type: type,
      })
      return response.data.data
    },
    initialPageParam: seqidx,
    getNextPageParam: (lastPage, allPages) => {
      if (type === 'next' || type === 'default') {
        return lastPage.length > 0
          ? lastPage[lastPage.length - 1].seqidx
          : undefined
      }
      return undefined
    },
    getPreviousPageParam: (firstPage, allPages) => {
      if (type === 'prev' || type === 'default') {
        return firstPage.length > 0 ? firstPage[0].seqidx : undefined
      }
      return undefined
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page),
      pageParams: data.pageParams,
    }),
  })
}
