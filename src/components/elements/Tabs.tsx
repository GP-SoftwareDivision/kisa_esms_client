import { Tabs } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface TabsType {
  items: { label: string; value: string }[]
  value: string
  setValue(value: string): void
}

const CustomTabs = (props: TabsType) => {
  const { items, value, setValue } = props
  const navigate = useNavigate()

  const handleOnValueChange = (value: string) => {
    setValue(value)
    navigate(`?type=${value}`)
  }

  return (
    <StyledTabs
      variant='enclosed'
      maxW='md'
      fitted
      value={value}
      defaultValue={value}
      onValueChange={(e) => handleOnValueChange(e.value)}
    >
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger value={item.value}>{item.label}</Tabs.Trigger>
        ))}
      </Tabs.List>
    </StyledTabs>
  )
}

export default CustomTabs

const StyledTabs = styled(Tabs.Root)`
  button {
    ${({ theme }) => theme.typography.body2};
    font-weight: bold !important;
    padding: 0;
    height: auto;
  }
`
