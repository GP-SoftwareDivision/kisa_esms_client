import { Card } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { PiFileHtmlDuotone } from 'react-icons/pi'

import { Caption } from '@/components/elements/Caption.tsx'

interface dtListType {
  contents: string
  htmlpath?: string
  issueresponseflag: string
  keyword: string
  seqidx: number
  target: string
  threatflag: string
  threatlog: string
  title: string
  url: string
  writer: string
  writetime: string
  onClick?: () => void
}

const DarkwebCard = (props: dtListType) => {
  const {
    contents,
    // htmlpath,
    issueresponseflag,
    keyword,
    seqidx,
    target,
    threatflag,
    threatlog,
    title,
    url,
    writer,
    writetime,
    onClick,
  } = props
  return (
    <Card.Root size='sm' onClick={onClick} cursor='pointer' key={seqidx}>
      <Card.Body color='fg.muted' gap={'0.5rem'}>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>작성시간</StyledLabel>
              <Caption text={writetime} type={'blue'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>작성자</StyledLabel>
              <Caption text={writer} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
          <StyledCaptionBox>
            <StyledLabel>카테고리</StyledLabel>
            <Caption text={target} type={'blue'} />
          </StyledCaptionBox>
        </NavLayout>
        <BodyLayout>
          <StyledBodyBox>
            <StyledLabel>제목</StyledLabel>
            <Caption text={title} type={'black'} />
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel>내용</StyledLabel>
            <Caption text={contents} type={'black'} />
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel>URL</StyledLabel>
            <Caption text={url} type={'black'} />
          </StyledBodyBox>
        </BodyLayout>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>수집 키워드</StyledLabel>
              <Caption text={keyword} type={'black'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>판단 키워드</StyledLabel>
              <Caption text={threatlog} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
        </NavLayout>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>해킹 여부</StyledLabel>
              <Caption text={threatflag} type={'red'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>대응 여부</StyledLabel>
              <Caption text={issueresponseflag} type={'black'} />
            </StyledCaptionBox>
          </StyledNavContainer>
          <HtmlIcon />
        </NavLayout>
      </Card.Body>
    </Card.Root>
  )
}
export default DarkwebCard

const NavLayout = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledNavContainer = styled.div`
  display: flex;
  gap: 1rem;
`
const StyledLabel = styled.span`
  font-weight: bold !important;
  ${({ theme }) => theme.typography.body2};
`

const StyledCaptionBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
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

const HtmlIcon = styled(PiFileHtmlDuotone)`
  ${({ theme }) => theme.typography.h4};
  cursor: pointer;
  margin: 0;
`
