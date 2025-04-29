// src/components/elements/ListWrapper.tsx
import { FixedSizeList, FixedSizeListProps } from 'react-window'
import { forwardRef } from 'react'

export const ListWrapper = forwardRef<
  FixedSizeList<any>,
  FixedSizeListProps<any>
>((props, ref) => {
  return <FixedSizeList {...props} ref={ref} />
})
