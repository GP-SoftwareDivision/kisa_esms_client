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
              <Caption
                text={username === 'None' ? '-' : username}
                type={'blue'}
              />
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
            <StyledLabel style={{ minWidth: '80px' }}>대화방(URL)</StyledLabel>
            <StyledContents>{`${channel}  (${channelurl})`} </StyledContents>
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel style={{ minWidth: '80px' }}>내용</StyledLabel>
            <StyledContents>
              {isTranslation ? trancontents : contents}
            </StyledContents>
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
              text={threatflag}
              type={threatflag === '해킹' ? 'red' : 'blue'}
            />
          </StyledCaptionBox>
          <StyledCaptionBox>
            <StyledLabel>대응 여부</StyledLabel>
            <Caption
              text={issueresponseflag}
              type={issueresponseflag === '대응' ? 'blue' : 'black'}
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

const StyledContents = styled.span`
  ${({ theme }) => theme.typography.body3};
  border: 1px solid ${({ theme }) => theme.color.gray200};
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  padding: 4px 8px;
  border-radius: 2px;
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
  align-items: baseline;
`
