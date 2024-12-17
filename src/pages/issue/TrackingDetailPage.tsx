import styled from '@emotion/styled'
import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTimePicker from '@/components/elements/TimePicker'
import CustomSelect from '@/components/elements/Select.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomCheckBoxGroup from '@/components/elements/CheckBoxGroup.tsx'
import CustomEditable from '@/components/elements/Editable.tsx'
import CustomTextarea from '@/components/elements/Textarea.tsx'
import dayjs from 'dayjs'

const TrackingDetailPage = () => {
  const handleOnChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'국내 정보 유출 이력 대응'} />
      <Table>
        <tbody>
          <tr>
            <LabelTd>등록일시</LabelTd>
            <Td colSpan={3}>
              <CustomTimePicker />
            </Td>
            <LabelTd>대상 구분</LabelTd>
            <Td colSpan={11}>
              <CustomCheckBoxGroup
                items={[
                  '개인',
                  '기업(민간)',
                  '공공',
                  '교육',
                  '금융',
                  '의료',
                  '기타(해외)',
                ]}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>피해기관</LabelTd>
            <Td colSpan={3}>
              <CustomEditable />
            </Td>
            <LabelTd>침해신고여부</LabelTd>
            <Td colSpan={3}>
              <CustomSelect
                options={[
                  { value: '신고', label: '신고' },
                  { value: '미신고', label: '미신고' },
                ]}
                value={'신고'}
              />
            </Td>
            <LabelTd>사고번호</LabelTd>
            <Td colSpan={3}>
              <CustomEditable />
            </Td>
            <LabelTd>기술지원여부</LabelTd>
            <Td colSpan={3}>
              <CustomSelect
                options={[
                  { value: '동의', label: '동의' },
                  { value: '미동의', label: '미동의' },
                ]}
                value={'동의'}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>사고유형</LabelTd>
            <Td colSpan={15}>
              <CustomCheckBoxGroup
                items={[
                  '정보유출',
                  '공격예고',
                  '데이터불일치',
                  'DDoS',
                  '랜섬웨어',
                  '웹변조',
                  '취약점',
                  '기타해킹',
                  '확인불가',
                  '기타',
                ]}
                children={<CustomEditable />}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>사고유형 상세</LabelTd>
            <Td colSpan={11}>
              <CustomEditable />
            </Td>
            <LabelTd>협박 유무</LabelTd>
            <Td colSpan={3}>
              <CustomCheckBoxGroup items={['있음', '없음']} />
            </Td>
          </tr>
          <tr>
            <LabelTd>채널 선택</LabelTd>
            <Td colSpan={3}>
              <CustomSelect
                options={[
                  { value: '다크웹', label: '다크웹' },
                  { value: '텔레그램', label: '텔레그램' },
                ]}
                value={'다크웹'}
              />
            </Td>
            <LabelTd>채널 구분</LabelTd>
            <Td colSpan={5}>
              <CustomEditable />
            </Td>
            <LabelTd>채널명</LabelTd>
            <Td colSpan={5}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd colSpan={2}>게시글/텔레그램 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable />
            </Td>
            <LabelTd colSpan={2}>다운로드 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={7}>
              <CustomEditable />
            </Td>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={3}>
              <CustomEditable />
            </Td>
            <LabelTd>게시일</LabelTd>
            <Td colSpan={3}>{dayjs().format('YYYY-MM-DD')}</Td>
          </tr>
          <tr>
            <LabelTd>최초인지</LabelTd>
            <Td colSpan={4}>
              <CustomSelect
                label={''}
                options={[
                  { value: '', label: '전체' },
                  { value: '자체탐지', label: '자체탐지' },
                  { value: 'S2W', label: 'S2W' },
                  { value: '금융보안원', label: '금융보안원' },
                  { value: '경찰청', label: '경찰청' },
                  { value: '언론보도', label: '언론보도' },
                  { value: '기타', label: '기타' },
                ]}
              />
            </Td>
            <LabelTd colSpan={2}>최초인지 상세</LabelTd>
            <Td colSpan={9}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd>공유</LabelTd>
            <Td colSpan={15}>
              <CustomCheckBoxGroup
                items={[
                  '공공',
                  '교육',
                  '금융',
                  '국방',
                  '민간',
                  '개보위',
                  '기타',
                ]}
                children={<CustomEditable />}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>수집정보</LabelTd>
            <Td colSpan={11}>
              <CustomCheckBoxGroup
                items={['TBD', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD']}
                children={<CustomEditable />}
              />
            </Td>
            <LabelTd>이미지 유무</LabelTd>
            <Td colSpan={3}>
              <CustomCheckBoxGroup items={['있음', '없음']} />
            </Td>
          </tr>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={5}>
              <CustomEditable />
            </Td>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={4}>
              <CustomEditable />
            </Td>
            <LabelTd>작성일시</LabelTd>
            <Td colSpan={4}>
              <CustomTimePicker />
            </Td>
          </tr>
          <tr>
            <LabelTd>보고문구</LabelTd>
            <Td colSpan={15}>
              <CustomTextarea />
            </Td>
          </tr>
          <tr>
            <LabelTd>해커그룹</LabelTd>
            <Td colSpan={7}>
              <CustomEditable />
            </Td>
            <LabelTd>비고</LabelTd>
            <Td colSpan={7}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd>유출정보</LabelTd>
            <Td colSpan={15}>
              <CustomEditable />
            </Td>
          </tr>
        </tbody>
      </Table>
      <ButtonContainer>
        <Button type={'primary'} onClick={handleOnChange} text={'저장'} />
        <Button type={'tertiary'} onClick={handleOnChange} text={'닫기'} />
      </ButtonContainer>
    </ContentContainer>
  )
}

export default TrackingDetailPage

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  gap: 0.5rem;

  button {
    min-width: 60px !important;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => theme.typography.body3};
  table-layout: fixed;

  span input {
    font-size: 0.75rem !important;
    line-height: 1.5 !important;
  }
`
const Td = styled.td`
  padding: 2px 4px;
  border-bottom: 1px solid #d9d9d9;

  input {
    height: 25px !important;
  }
`

const LabelTd = styled(Td)`
  text-align: center;
  background-color: #f6f6f6;
  width: 85px;
`
