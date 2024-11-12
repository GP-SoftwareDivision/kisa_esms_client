import { useState, useCallback, ChangeEvent } from 'react'

export const useForm = (initialFields: Record<string, string> = {}) => {
  // 필드 값을 객체 형태로 관리
  const [fields, setFields] = useState<Record<string, string>>(initialFields)
  const [warning, setWarning] = useState<Record<string, boolean>>(
    Object.keys(initialFields).reduce(
      (acc, key) => {
        acc[key] = false
        return acc
      },
      {} as Record<string, boolean>
    )
  )

  // 체인지 이벤트 핸들러
  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }))
    setWarning((prevWarnings) => ({
      ...prevWarnings,
      [id]: value.trim() === '',
    }))
  }, [])

  // 유효성 검사
  const validateForm = (): boolean => {
    const newWarning = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value.trim() === ''])
    )
    setWarning(newWarning)
    return !Object.values(newWarning).includes(true)
  }

  return { fields, warning, handleOnChange, validateForm }
}
