import { Card } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { PiFileHtmlDuotone } from 'react-icons/pi'

import { Caption } from '@/components/elements/Caption.tsx'
import CustomSwitch from '@/components/elements/Switch.tsx'
import { useState } from 'react'

interface dtListType {
  contents: string
  trancontents: string
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
  regdate: string
  onClick?: () => void
}

const DarkwebCard = (props: dtListType) => {
  const {
    contents,
    trancontents,
    htmlpath,
    issueresponseflag,
    keyword,
    seqidx,
    target,
    threatflag,
    threatlog,
    title,
    url,
    regdate,
    writer,
    writetime,
    onClick,
  } = props

  // 번역 여부
  const [isTranslation, setTranslation] = useState<boolean>(false)

  // html 새 창으로 열기 이벤트
  const ViewHtml = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation()
    window.open(`${import.meta.env.VITE_HTML_URL}${htmlpath}`, '_blank')
  }

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
            <StyledCaptionBox>
              <StyledLabel>카테고리</StyledLabel>
              <Caption text={target} type={'blue'} />
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
            <StyledLabel style={{ minWidth: '50px' }}>제목</StyledLabel>
            <StyledContents>{title}</StyledContents>
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel style={{ minWidth: '50px' }}>내용</StyledLabel>
            <StyledContents>
              {isTranslation ? trancontents : contents}
            </StyledContents>
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel style={{ minWidth: '50px' }}>URL</StyledLabel>
            <StyledContents>{url}</StyledContents>
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
              <Caption
                text={threatlog === null ? '-' : threatlog}
                type={'blue'}
              />
            </StyledCaptionBox>
          </StyledNavContainer>
        </NavLayout>
        <NavLayout>
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
                type={issueresponseflag === 'Y' ? 'blue' : 'black'}
              />
            </StyledCaptionBox>
          </StyledNavContainer>
          <StyledCaptionBox>
            <StyledLabel>수집일시</StyledLabel>
            <Caption text={regdate} type={'black'} />
            <HtmlIcon
              onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
                ViewHtml(e)
              }
            />
          </StyledCaptionBox>
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
  //min-width: 50px;
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

const StyledCaptionBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
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

const HtmlIcon = styled(PiFileHtmlDuotone)`
  ${({ theme }) => theme.typography.h4};
  cursor: pointer;
  margin: 0;
`
