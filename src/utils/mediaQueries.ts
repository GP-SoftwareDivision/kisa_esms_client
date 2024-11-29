const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const

// 구간별 미디어 쿼리 생성
const mq = Object.entries(breakpoints).reduce(
  (acc, [key, value], index, entries) => {
    const nextValue = entries[index + 1]?.[1] // 다음 breakpoint 값

    // max-width
    acc[key as keyof typeof breakpoints] = `@media (max-width: ${value}px)`

    // min-width & max-width (구간)
    if (nextValue) {
      acc[`${key}Only`] =
        `@media (min-width: ${value + 1}px) and (max-width: ${nextValue}px)`
    }

    // min-width
    acc[`${key}Min`] = `@media (min-width: ${value + 1}px)`

    return acc
  },
  {} as { [key: string]: string }
)

export { breakpoints, mq }
