export default function queryToJson(
  queryString: string
): Record<string, string | number | null> {
  const queryObject: Record<string, string | number | null> = {}

  // URL 쿼리 문자열의 앞에 '?'가 있을 경우 제거
  const cleanedQuery = queryString.startsWith('?')
    ? queryString.slice(1)
    : queryString

  // '&'로 쿼리 문자열 분리 후 '='로 키-값 쌍 생성
  cleanedQuery.split('&').forEach((param) => {
    const [key, value] = param.split('=')

    // 값이 없을 경우 null 처리
    const decodedValue = value ? decodeURIComponent(value) : ''

    // 'page' 키는 숫자로 변환, 나머지는 그대로 할당
    queryObject[decodeURIComponent(key)] =
      key === 'page' && decodedValue !== null
        ? Number(decodedValue)
        : decodedValue
  })

  return queryObject
}
