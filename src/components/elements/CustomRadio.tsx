import { HStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { Dispatch, SetStateAction } from 'react'

interface RadioProps {
  items: { label: string; value: string }[]
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const CustomRadio = (props: RadioProps) => {
  const { items, value, setValue } = props

  return (
    <RadioGroup
      size='xs'
      value={value}
      onValueChange={({ value }) => {
        setValue(value)
      }}
    >
      <HStack gap='6'>
        {items.map((item, index: number) => (
          <Radio key={index} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </HStack>
    </RadioGroup>
  )
}
export default CustomRadio
