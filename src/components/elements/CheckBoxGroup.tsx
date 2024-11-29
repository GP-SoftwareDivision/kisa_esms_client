import { ReactNode } from 'react'
import { CheckboxGroup, Fieldset } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'

interface CheckBoxGroupProps {
  items: string[]
  children?: ReactNode
}

const CustomCheckBoxGroup = (props: CheckBoxGroupProps) => {
  const { items, children } = props

  return (
    <Fieldset.Root>
      <CheckboxGroup defaultValue={['react']} name='framework'>
        <Fieldset.Content
          display='flex'
          flexDirection='row'
          fontSize={'0.75rem'}
          gap={4}
        >
          {items?.map((item) => (
            <Checkbox size={'xs'} value={item} minWidth={'max-content'}>
              {item}
            </Checkbox>
          ))}
          {children}
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  )
}

export default CustomCheckBoxGroup
