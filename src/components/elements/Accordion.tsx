import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Stack } from '@chakra-ui/react'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'

interface AccordionType {
  id: string
  trigger: ReactNode
  content: ReactNode
}
const CustomAccordion = (props: AccordionType) => {
  const { id, trigger, content } = props

  return (
    <AccordionRoot collapsible>
      <AccordionItem key={id} value={'accordion'} border={'none'}>
        <StyledTrigger>
          <Stack gap='1'>{trigger}</Stack>
        </StyledTrigger>
        <AccordionItemContent padding={0}>{content}</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )
}
export default CustomAccordion

const StyledTrigger = styled(AccordionItemTrigger)`
  padding: 0;

  svg {
    display: none;
  }
`
