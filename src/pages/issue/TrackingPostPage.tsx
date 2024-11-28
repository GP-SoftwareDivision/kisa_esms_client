import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import { Box, SimpleGrid } from '@chakra-ui/react'
import CustomTimePicker from '@/components/elements/TimePicker'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import styled from '@emotion/styled'
import Button from '@/components/elements/Button.tsx'

const TrackingPostPage = () => {
  const handleOnChange = () => {}
  return (
    <ContentContainer>
      <PageTitle text={'국내 정보 유출 이력 대응'} />
      <ContentBox columns={[1, 2]}>
        <Box>
          <CustomTimePicker label={'작성일'} />
        </Box>
        <Box>
          <CustomTimePicker label={'게시일'} />
        </Box>
      </ContentBox>
      <ContentBox columns={[1, 2, 3, 4]}>
        <Box>
          <CustomSelect
            label={'피해대상'}
            options={[
              { value: '개인', label: '개인' },
              { value: '기업', label: '기업' },
              { value: '기타', label: '기타' },
            ]}
            multiple
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'신고여부'}
            options={[
              { value: '신고', label: '신고' },
              { value: '미신고', label: '미신고' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'기술지원여부'}
            options={[
              { value: '동의', label: '동의' },
              { value: '미동의', label: '미동의' },
            ]}
          />
        </Box>
      </ContentBox>
      <ContentBox columns={[1, 2, 3, 4]}>
        <Box>
          <CustomSelect
            label={'피해대상'}
            options={[
              { value: '개인', label: '개인' },
              { value: '기업', label: '기업' },
              { value: '기타', label: '기타' },
            ]}
            multiple
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'신고여부'}
            options={[
              { value: '신고', label: '신고' },
              { value: '미신고', label: '미신고' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'기술지원여부'}
            options={[
              { value: '동의', label: '동의' },
              { value: '미동의', label: '미동의' },
            ]}
          />
        </Box>
      </ContentBox>
      <ContentBox columns={[1, 2, 3, 4]}>
        <Box>
          <CustomSelect
            label={'거부사유'}
            options={[
              { value: '피해기업 확인불가', label: '피해기업 확인불가' },
              { value: '무응답', label: '무응답' },
              { value: '데이터불일치', label: '데이터불일치' },
              { value: '휴페업', label: '휴페업' },
              { value: '이관', label: '이관' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'사고유형'}
            options={[
              { value: '정보유출', label: '정보유출' },
              { value: '공격예고', label: '공격예고' },
              { value: '데이터불일치', label: '데이터불일치' },
              { value: 'DDoS', label: 'DDoS' },
              { value: '랜섬웨어', label: '랜섬웨어' },
              { value: '웹변조', label: '웹변조' },
              { value: '취약점', label: '취약점' },
              { value: '기타해킹', label: '기타해킹' },
              { value: '확인불가', label: '확인불가' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'사고유형(상세)'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'채널구분'}
            options={[
              { value: '다크웹', label: '다크웹' },
              { value: '해킹포럼', label: '해킹포럼' },
              { value: '텔레그램', label: '텔레그램' },
              { value: 'SNS', label: 'SNS' },
              { value: '블로그', label: '블로그' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
      </ContentBox>
      <ContentBox columns={[1, 2, 3, 4]}>
        <Box>
          <CustomSelect
            label={'다크웹/텔레그램명'}
            options={[{ value: 'www.tahribat.com', label: 'www.tahribat.com' }]}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'제목'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'작성자'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'게시글/텔레그램 URL'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
      </ContentBox>
      <ContentBox columns={[1, 2, 3, 4]}>
        <Box>
          <CustomSelect
            label={'최초인지'}
            options={[
              { value: '자체탐지', label: '자체탐지' },
              { value: 'S2W', label: 'S2W' },
              { value: '금융보안원', label: '금융보안원' },
              { value: '경찰청', label: '경찰청' },
              { value: '언론보도', label: '언론보도' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'최초인지'}
            options={[
              { value: '자체탐지', label: '자체탐지' },
              { value: 'S2W', label: 'S2W' },
              { value: '금융보안원', label: '금융보안원' },
              { value: '경찰청', label: '경찰청' },
              { value: '언론보도', label: '언론보도' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'최초인지(상세)'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'공유'}
            options={[
              { value: '공공', label: '공공' },
              { value: '교육', label: '교육' },
              { value: '금융', label: '금융' },
              { value: '국방', label: '국방' },
              { value: '민간', label: '민간' },
              { value: '개보위', label: '개보위' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
      </ContentBox>
      <ContentBox columns={[1, 2, 3, 4]}>
        <Box>
          <CustomSelect
            label={'수집정보'}
            options={[{ value: '정보', label: '정보' }]}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'보고문구'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'비고'}
            placeholder={'내용을 입력하세요.'}
            value={''}
            onChange={handleOnChange}
          />
        </Box>
      </ContentBox>
      <ButtonContainer>
        <Button type={'primary'} onClick={handleOnChange} text={'저장'} />
      </ButtonContainer>
    </ContentContainer>
  )
}

export default TrackingPostPage

const ContentBox = styled(SimpleGrid)`
  margin: 0.5rem 0;
  gap: 16px;
`

const ButtonContainer = styled.button`
  display: flex;
  justify-content: flex-end;

  button {
    min-width: 120px !important;
  }
`
