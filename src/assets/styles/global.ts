import styled from '@emotion/styled'
import { Box, SimpleGrid } from '@chakra-ui/react'

export const ContentContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ContentBox = styled(Box)`
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 4px;
  padding: 1rem;
`

export const SelectContainer = styled(SimpleGrid)`
  margin: 1rem 0;
  gap: 16px;
`

export const SelectBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
`

export const SelectLabel = styled.label`
  min-width: 60px;
  text-align: left;
  ${({ theme }) => theme.typography.body2};
`

export const ButtonContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`
