import styled from '@emotion/styled'
import { Box, Card, SimpleGrid } from '@chakra-ui/react'

import { Caption } from '@/components/elements/Caption.tsx'
import { useState } from 'react'
import CustomSwitch from '@/components/elements/Switch.tsx'

interface ttListType {
  channelurl: string
  contents: string
  trancontents: string
  issueresponseflag: string
  keyword: string
  seqidx: number
  channel: string
  threatflag: string
  threatlog: string
  username: string
  writetime: string
  onClick: () => void
}

const TelegramCard = (props: ttListType) => {
  const {
    channelurl,
    contents,
    trancontents,
    issueresponseflag,
    keyword,
    seqidx,
    channel,
    threatflag,
    threatlog,
    username,
    writetime,
    onClick,
  } = props

  // 번역 여부
  const [isTranslation, setTranslation] = useState<boolean>(false)

  return (
    <Card.Root size='sm' cursor={'pointer'} onClick={onClick}>
      <Card.Body color='fg.muted' gap={'0.5rem'} key={seqidx}>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>작성시간</StyledLabel>
              <Caption text={writetime} type={'blue'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>작성자</StyledLabel>
              <Caption text={username} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
          <StyledCaptionBox>
            <CustomSwitch
              label={'번역'}
              checked={isTranslation}
              setChecked={setTranslation}
            />
          </StyledCaptionBox>
        </NavLayout>
        <BodyLayout>
          <StyledBodyBox>
            <StyledLabel>대화방(URL)</StyledLabel>
            <Caption text={`${channel}  (${channelurl})`} type={'black'} />
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel>내용</StyledLabel>
            <Caption
              text={isTranslation ? trancontents : contents}
              type={'black'}
            />
          </StyledBodyBox>
        </BodyLayout>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>수집 키워드</StyledLabel>
              <Caption text={keyword} type={'blue'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>판단 키워드</StyledLabel>
              <Caption text={threatlog} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
        </NavLayout>
        <StyledNavContainer>
          <StyledCaptionBox>
            <StyledLabel>해킹 여부</StyledLabel>
            <Caption
              text={threatflag === 'Y' ? '해킹' : '미해킹'}
              type={threatflag === 'Y' ? 'red' : 'blue'}
            />
          </StyledCaptionBox>
          <StyledCaptionBox>
            <StyledLabel>대응 여부</StyledLabel>
            <Caption
              text={issueresponseflag === 'Y' ? '대응' : '미대응'}
              type={'black'}
            />
          </StyledCaptionBox>
        </StyledNavContainer>
      </Card.Body>
    </Card.Root>
  )
}
export default TelegramCard

const NavLayout = styled(SimpleGrid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledNavContainer = styled(SimpleGrid)`
  display: flex;
  gap: 1rem;
`

const StyledLabel = styled.span`
  font-weight: bold !important;
  ${({ theme }) => theme.typography.body2};
`

const StyledCaptionBox = styled(Box)`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`
const BodyLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem 0;
`

const StyledBodyBox = styled.div`
  display: flex;
  flex-direction: column;
`
