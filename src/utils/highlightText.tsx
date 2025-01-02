export const highlightText = (
  text: string,
  keywords: string[],
  log: string[]
) => {
  if (!text || !keywords) return null // 내용이 비어있을 경우 반환

  // keywords 문자열을 쉼표나 공백 기준으로 분리 (추가적인 기준이 있다면 정규식 수정 가능)
  // const keywordList = keywords?.split(/\s*,\s*|\s+/).filter(Boolean)

  // 키워드와 로그를 하나의 정규식 패턴으로 병합 (중복 제거)
  const combinedRegex = new RegExp(
    `(${[...new Set([...keywords, ...log])].filter(Boolean).join('|')})`,
    'gi'
  )

  return text.split(combinedRegex).map((segment, index) => {
    const lowerSegment = segment.toLowerCase()

    if (keywords.includes(lowerSegment)) {
      // Keywords 강조 - 빨간 형광색
      return (
        <span
          key={index}
          style={{ backgroundColor: '#ffff8c', fontWeight: 'bold' }}
        >
          {segment}
        </span>
      )
    }

    if (log.includes(lowerSegment)) {
      // Logs 강조 - 노란 형광색
      return (
        <span
          key={index}
          style={{ backgroundColor: '#e6ffe2', fontWeight: 'bold' }}
        >
          {segment}
        </span>
      )
    }

    return segment // 매칭되지 않은 부분은 일반 텍스트
  })
}
