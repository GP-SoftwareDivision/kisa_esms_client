// ListWrapper.tsx
import { FixedSizeList, FixedSizeListProps } from 'react-window'

export function ListWrapper<T>(props: FixedSizeListProps<T>) {
  return <FixedSizeList {...props} />
}
