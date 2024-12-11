import { useMemo } from 'react'

const useOptions = () => {
  const responseOptions = useMemo(
    () => [
      { value: '', label: '전체' },
      { value: '대응', label: '대응' },
      { value: '대기', label: '대기' },
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
      { value: '해킹', label: '해킹' },
      { value: '미해킹', label: '미해킹' },
      { value: '대기', label: '대기' },
    ],
    []
  )

  const regularExpressionOptions = useMemo(
    () => [
      { value: 'email', label: '이메일' },
      { value: 'phone', label: '전화번호' },
      { value: 'RRN', label: '주민등록번호' },
    ],
    []
  )

  return {
    responseOptions,
    fileTypeOptions,
    hackingOptions,
    regularExpressionOptions,
  }
}

export default useOptions
