import { ReactNode, memo } from 'react'
import { CheckboxGroup, Fieldset } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'

interface CheckBoxGroupProps {
  items: string[]
  value: string[]
  onChange: (value: string[]) => void
  children?: ReactNode
}

const CustomCheckBoxGroup = memo((props: CheckBoxGroupProps) => {
  const { items, value, onChange, children } = props

  return (
    <Fieldset.Root>
      <CheckboxGroup onValueChange={onChange} value={value}>
        <Fieldset.Content
          display='flex'
          flexDirection='row'
          fontSize={'0.75rem'}
          gap={4}
        >
          {items?.map((item, index: number) => (
            <Checkbox
              size={'xs'}
              value={item}
              cursor={'pointer'}
              minWidth={'max-content'}
              key={`${item}_${index}`}
            >
              {item}
            </Checkbox>
          ))}
          {children}
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  )
})

export default CustomCheckBoxGroup
