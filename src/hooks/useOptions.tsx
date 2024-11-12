import { useMemo } from 'react'

const useOptions = () => {
  const responseOptions = useMemo(
    () => [
      { value: '대기', label: '대기' },
      { value: '진행중', label: '진행중' },
      { value: '완료', label: '완료' },
    ],
    []
  )

  const fileTypeOptions = useMemo(
    () => [
      { value: 'xlsx', label: 'xlsx' },
      { value: 'csv', label: 'csv' },
      { value: 'txt', label: 'txt' },
    ],
    []
  )

  return { responseOptions, fileTypeOptions }
}

export default useOptions
