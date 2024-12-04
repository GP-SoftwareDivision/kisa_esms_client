import styled from '@emotion/styled'
import { Box, Card, SimpleGrid } from '@chakra-ui/react'
import { PiFileHtmlDuotone } from 'react-icons/pi'

import { Caption } from '@/components/elements/Caption.tsx'

interface ttListType {
  channelurl: string
  contents: string
  issueresponseflag: string
  keyword: string
  seqidx: number
  channel: string
  threatflag: string
  threatlog: string
  username: string
  writetime: string
}

const TelegramCard = (props: ttListType) => {
  const {
    channelurl,
    contents,
    issueresponseflag,
    keyword,
    seqidx,
    channel,
    threatflag,
    threatlog,
    username,
    writetime,
  } = props

  return (
    <Card.Root size='sm' onClick={() => console.log(seqidx)}>
      <Card.Body color='fg.muted' gap={'1rem'} key={seqidx}>
        <NavLayout>
          <StyledNavContainer column={[1, 2, 3, 4]}>
            <StyledCaptionBox>
              <StyledLabel>수집 키워드</StyledLabel>
              <Caption text={keyword} type={'blue'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>채팅방 URL</StyledLabel>
              <Caption text={channelurl} type={'black'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>작성자</StyledLabel>
              <Caption text={username} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
          <StyledNavContainer column={[1, 2, 3, 4]}>
            <StyledCaptionBox>
              <StyledLabel>작성시간</StyledLabel>
              <Caption text={writetime} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
        </NavLayout>
        <BodyLayout>
          <StyledBodyBox>
            <StyledLabel>대화방</StyledLabel>
            <Caption text={channel} type={'black'} />
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel>메시지</StyledLabel>
            <Caption text={contents} type={'black'} />
          </StyledBodyBox>
        </BodyLayout>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>해킹여부</StyledLabel>
              <Caption
                text={threatflag === 'Y' ? '해킹' : '미해킹'}
                type={'red'}
              />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>대응여부</StyledLabel>
              <Caption
                text={issueresponseflag === 'Y' ? '대응' : '미대응'}
                type={'black'}
              />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>판단키워드</StyledLabel>
              <Caption text={threatlog} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
          <HtmlIcon />
        </NavLayout>
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
  ${({ theme }) => theme.typography.body};
`

const StyledCaptionBox = styled(Box)`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  ${({ theme }) => theme.typography.body2};
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
  ${({ theme }) => theme.typography.body2};
`

const HtmlIcon = styled(PiFileHtmlDuotone)`
  ${({ theme }) => theme.typography.h4};
  cursor: pointer;
  margin: 0;
`
