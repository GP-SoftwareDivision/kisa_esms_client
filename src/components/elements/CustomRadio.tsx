import { memo } from 'react'
import { HStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/components/ui/radio'
import styled from '@emotion/styled'

interface RadioProps {
  items: { label: string; value: string }[]
  value: string
  onChange: (value: any) => void
}

const StyledRadio = styled(Radio)`
  span {
    cursor: pointer;
  }
`

const CustomRadio = memo((props: RadioProps) => {
  const { items, value, onChange } = props

  return (
    <RadioGroup size='xs' value={value} onValueChange={onChange}>
      <HStack gap='6'>
        {items.map((item, index: number) => (
          <StyledRadio key={index} value={item.value} cursor={'pointer'}>
            {item.label}
          </StyledRadio>
        ))}
      </HStack>
    </RadioGroup>
  )
})

export default CustomRadio
