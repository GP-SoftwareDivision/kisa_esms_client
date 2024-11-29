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
import styled from '@emotion/styled'
interface SelectProps {
  label?: string
  options: {
    value: string
    label: string
  }[]
  value?: string
  setState?: Dispatch<React.SetStateAction<string>>
  multiple?: boolean
  required?: boolean
}

const CustomSelect = memo(
  ({ options, value, label, setState, multiple, required }: SelectProps) => {
    const handleOnChange = (selected: string[]) => {
      if (setState) setState(selected.join())
    }

    const isMultipleVal = (val: string): string[] => {
      if (val.split(',').length > 1) {
        return val.split(',').map((v) => v)
      } else return [val]
    }

    return (
      <SelectRoot
        collection={createListCollection({
          items: options,
        })}
        size='xs'
        required
        multiple={multiple}
        defaultValue={!multiple ? ['전체'] : undefined}
        flexDirection={'row'}
        alignItems={'center'}
        value={value ? isMultipleVal(value) : undefined}
        onValueChange={({ value }) => handleOnChange(value)}
      >
        {label && (
          <StyledLabel>
            {label}
            <span>{required ? '*' : null}</span>
          </StyledLabel>
        )}
        <SelectTrigger width={'100%'}>
          <SelectValueText placeholder={'옵션을 선택해 주세요.'} />
        </SelectTrigger>
        <SelectContent>
          {createListCollection({
            items: options,
          }).items.map((item) => (
            <SelectItem item={item} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    )
  }
)

export default CustomSelect

const StyledLabel = styled(SelectLabel)`
  min-width: 60px;
  ${({ theme }) => theme.typography.body2};
  text-align: left;

  span {
    color: #ef4444;
    padding: 0 4px;
  }
`
