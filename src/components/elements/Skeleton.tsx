import { SkeletonText } from '@/components/ui/skeleton'

interface SkeletonType {
  lines: number
}
export const CustomSkeleton = (props: SkeletonType) => {
  const { lines } = props
  return <SkeletonText noOfLines={lines} gap='6' />
}
