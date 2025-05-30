import { Stack, Skeleton } from '@chakra-ui/react'

interface SkeletonType {
  lines: number
  height: number
}

export const CustomSkeleton = (props: SkeletonType) => {
  const { lines, height } = props

  return (
    <Stack flex='1' gap='1rem' justifyContent='center'>
      {[...Array(lines)].map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          width={index === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </Stack>
  )
}
