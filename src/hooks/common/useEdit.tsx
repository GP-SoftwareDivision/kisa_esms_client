import { useReducer, useCallback } from 'react'

// 상태 정의
type State = Record<string, string>

// 액션 타입 정의
type Action =
  | { type: 'SET_FIELD'; name: string; value: string }
  | { type: 'RESET_FIELDS'; initialFields: Record<string, string> }

// 리듀서 함수 정의
const editFieldsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.name]: action.value }
    case 'RESET_FIELDS':
      return action.initialFields // initialFields를 액션에서 가져옵니다.
    default:
      return state
  }
}

export const useEdit = (initialFields: Record<string, string> = {}) => {
  const [editFields, dispatch] = useReducer(editFieldsReducer, initialFields)

  const handleOnFieldsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      const name = id.split(':')[1]

      dispatch({ type: 'SET_FIELD', name, value })
    },
    []
  )

  // 특정 필드만 초기화하는 핸들러
  const handleOnCleanField = useCallback((...fieldsToReset: string[]) => {
    fieldsToReset.forEach((name) => {
      dispatch({ type: 'SET_FIELD', name, value: '' })
    })
  }, [])
  return { editFields, handleOnFieldsChange, handleOnCleanField }
}
