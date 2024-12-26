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

  const targetOptions = useMemo(
    () => [
      { value: '', label: '전체' },
      { value: 'company', label: '기업' },
      { value: 'assn', label: '협회' },
      { value: 'pub', label: '공공' },
      { value: 'edu', label: '교육' },
      { value: 'fin', label: '금융' },
      { value: 'med', label: '의료' },
      { value: 'other', label: '기타(해외)' },
    ],
    []
  )
  return {
    responseOptions,
    fileTypeOptions,
    hackingOptions,
    targetOptions,
  }
}

export default useOptions
