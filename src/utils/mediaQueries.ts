// mediaQueries.ts
const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400, // xxl 추가
} as const

const mq = Object.keys(breakpoints).reduce(
  (acc, bp) => {
    acc[bp as keyof typeof breakpoints] =
      `@media (max-width: ${breakpoints[bp as keyof typeof breakpoints]}px)`
    return acc
  },
  {} as { [key: string]: string }
)

export { breakpoints, mq }
