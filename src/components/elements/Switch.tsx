import styled from '@emotion/styled'

import { HStack } from '@chakra-ui/react'
import { Switch } from '@/components/ui/switch'

interface SwitchProps {
  label?: string
  checked: boolean
  setChecked: (checked: boolean) => void
}
const CustomSwitch = (props: SwitchProps) => {
  const { label, checked, setChecked } = props

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 전파 중지
  }

  return (
    <StyledSwitch onClick={handleOnClick}>
      {label && <span>{label}</span>}
      <Switch
        size='xs'
        checked={checked}
        onCheckedChange={(e) => setChecked(e.checked)}
      />
    </StyledSwitch>
  )
}

export default CustomSwitch

const StyledSwitch = styled(HStack)`
  ${({ theme }) => theme.typography.body2};
  font-weight: bold;
`
