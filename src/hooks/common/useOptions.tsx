import { useMemo } from 'react'

const useOptions = () => {
  const responseOptions = useMemo(
    () => [
      { value: '', label: '전체' },
      { value: 'Y', label: '대응' },
      { value: 'N', label: '미대응' },
    ],
    []
  )

  const fileTypeOptions = useMemo(
    () => [
      { value: '', label: '전체' },
      { value: 'xlsx', label: 'xlsx' },
      { value: 'csv', label: 'csv' },
      { value: 'txt', label: 'txt' },
    ],
    []
  )

  const hackingOptions = useMemo(
    () => [
      { value: '', label: '전체' },
      { value: 'Y', label: '해킹' },
      { value: 'N', label: '미해킹' },
      { value: 'W', label: '대기' },
    ],
    []
  )

  return {
    responseOptions,
    fileTypeOptions,
    hackingOptions,
  }
}

export default useOptions
