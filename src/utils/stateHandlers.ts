import { Dispatch, SetStateAction } from 'react'

export const updateSearchCondition = <T>(
  setState: Dispatch<SetStateAction<T>>,
  field: keyof T,
  value: any
) => {
  setState((prev) => ({ ...prev, [field]: value }))
}
