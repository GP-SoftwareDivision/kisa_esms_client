import { Card } from '@chakra-ui/react'
import { Caption } from '@/components/elements/Caption.tsx'
import styled from '@emotion/styled'
interface DarkwebCardProps {
  onClick?: () => void
}
const DarkwebCard = (props: DarkwebCardProps) => {
  const { onClick } = props
  return (
    <Card.Root size='sm' onClick={onClick}>
      <Card.Body color='fg.muted'>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>카테고리</StyledLabel>
              <Caption text={'korea'} type={'blue'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>수집 키워드</StyledLabel>
              <Caption text={'https://t.me/COHP7'} type={'black'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>작성자</StyledLabel>
              <Caption text={'TBD'} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
          <StyledCaptionBox>
            <StyledLabel>작성시간</StyledLabel>
            <Caption text={'2024-10-10 10:00:00'} type={'blue'} />
          </StyledCaptionBox>
        </NavLayout>
        <BodyLayout>
          <StyledBodyBox>
            <StyledLabel>제목</StyledLabel>
            <Caption text={'Webshell / Cpanel / Smtp / Rdp'} type={'black'} />
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel>URL</StyledLabel>
            <Caption text={'https://gumgum.com'} type={'black'} />
          </StyledBodyBox>
          <StyledBodyBox>
            <StyledLabel>내용</StyledLabel>
            <Caption
              text={
                'SHUTTLE SMS AND EMAIL SPAMMINGWe accept spam, gambling content and so much more Dm for your bulk EMAIL & SMS servicesBulk emails and sms services available for countries around the globeCanadaTurkey ChinaIndiaHungry Israel  Kuwait United Kingdom  USAJapan Singapore Hungry south Korea Australia And many more countries ① Delivery Rate 100%② High Speed Sending③ Non Spam Filters④ Accept Any Contents & Msg⑤ Multi-alphabet ⑥ Unicode Characters⑦ Sender ID Customizable⑧ Countries available more than 40⑨ PC, Laptop, MacBook , PhoneADMIN @stonebulks       @stonebulks DM THE ADMIN FORPURCHASE ONLY WhatsApp +1 (682) 280-2550",'
              }
              type={'black'}
            />
          </StyledBodyBox>
        </BodyLayout>
        <NavLayout>
          <StyledNavContainer>
            <StyledCaptionBox>
              <StyledLabel>해킹여부</StyledLabel>
              <Caption text={'해킹'} type={'red'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>대응여부</StyledLabel>
              <Caption text={'https://t.me/COHP7'} type={'black'} />
            </StyledCaptionBox>
            <StyledCaptionBox>
              <StyledLabel>분석로그</StyledLabel>
              <Caption text={'email'} type={'blue'} />
            </StyledCaptionBox>
          </StyledNavContainer>
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
  font-weight: bold;
`

const StyledCaptionBox = styled.div`
  display: flex;
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
