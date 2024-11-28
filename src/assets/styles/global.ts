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
  position: relative;
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
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  button {
    min-width: 120px;
    height: 30px;
  }
`
