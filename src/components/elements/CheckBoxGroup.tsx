import { Dispatch, ReactNode, SetStateAction, memo } from 'react'
import { CheckboxGroup, Fieldset } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'

interface CheckBoxGroupProps {
  items: string[]
  value: string[]
  setValue: Dispatch<SetStateAction<string[]>>
  children?: ReactNode
}

const CustomCheckBoxGroup = memo((props: CheckBoxGroupProps) => {
  const { items, value, setValue, children } = props
  return (
    <Fieldset.Root>
      <CheckboxGroup onValueChange={(value) => setValue(value)} value={value}>
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
