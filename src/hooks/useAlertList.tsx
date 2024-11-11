import { useState } from 'react'
import { useQueryHandler } from '@/hooks/useQueryHandler.tsx'

interface AlertType {
  seqidx: number
  senddate: string
  contents: string
  kakaoresult: string
  emailresult: string
  target: string
  targetidx: number
  groupname: string
}

export const useAlertList = () => {
  const [pageNum, setPageNum] = useState<number>(1)

  const alertList = useQueryHandler<{ data: AlertType[]; count: number }>({
    method: 'POST',
    url: '/api/main/alarmList',
    body: {
      page: pageNum,
    },
  })

  return { alertList, setPageNum }
}
