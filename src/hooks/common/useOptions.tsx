import { useMemo } from 'react'

const useOptions = () => {
  const responseOptions = useMemo(
    () => [
      { value: '전체', label: '전체' },
      { value: '대기', label: '대기' },
      { value: '진행중', label: '진행중' },
      { value: '완료', label: '완료' },
    ],
    []
  )

  const fileTypeOptions = useMemo(
    () => [
      { value: '전체', label: '전체' },
      { value: 'xlsx', label: 'xlsx' },
      { value: 'csv', label: 'csv' },
      { value: 'txt', label: 'txt' },
    ],
    []
  )

  const hackingOptions = useMemo(
    () => [
      { value: '전체', label: '전체' },
      { value: '해킹', label: '해킹' },
      { value: '미해킹', label: '미해킹' },
      { value: '대기', label: '대기' },
    ],
    []
  )

  return { responseOptions, fileTypeOptions, hackingOptions }
}

export default useOptions
