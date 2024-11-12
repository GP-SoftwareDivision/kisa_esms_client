import React, { Dispatch, memo } from 'react'
import { createListCollection } from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
interface SelectProps {
  label?: string
  options: {
    value: string
    label: string
  }[]
  onchange?: () => void
  setState?: Dispatch<React.SetStateAction<string>>
}
const CustomSelect = memo(({ options, label, setState }: SelectProps) => {
  const handleOnChange = (selected: string[]) => {
    if (setState) setState(selected[0])
  }

  // 전체 리스트 추가
  const addAllItem = {
    value: '전체',
    label: '전체',
  }

  const listItem = options
    ? createListCollection({
        items: [addAllItem, ...options],
      })
    : createListCollection({ items: [addAllItem] })

  return (
    <SelectRoot
      collection={listItem}
      size='xs'
      defaultValue={['전체']}
      flexDirection={'row'}
      alignItems={'center'}
      onValueChange={({ value }) => handleOnChange(value)}
    >
      <SelectLabel minWidth={'60px'}>{label}</SelectLabel>
      <SelectTrigger width={'100%'}>
        <SelectValueText placeholder={'옵션을 선택해 주세요.'} />
      </SelectTrigger>
      <SelectContent>
        {listItem.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
})

export default CustomSelect
