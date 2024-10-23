import styled from '@emotion/styled'

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
