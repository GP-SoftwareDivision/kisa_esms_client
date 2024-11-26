// 빈 값 존재하는 유효성 체크
export const hasEmptyValue = (obj: object) => {
  return Object.values(obj).some(
    (value) => value === '' || value === undefined || value === null
  )
}
