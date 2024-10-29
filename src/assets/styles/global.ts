import styled from '@emotion/styled'
import { Row } from 'antd'

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ContentBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 4px;
  padding: 1rem;
`

export const SelectContainer = styled(Row)`
  margin-bottom: 1rem;
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

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`
