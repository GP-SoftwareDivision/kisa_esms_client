import styled from '@emotion/styled'
import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTimePicker from '@/components/elements/TimePicker'
import CustomSelect from '@/components/elements/Select.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomCheckBoxGroup from '@/components/elements/CheckBoxGroup.tsx'
import CustomEditable from '@/components/elements/Editable.tsx'
import CustomTextarea from '@/components/elements/Textarea.tsx'

const TrackingDetailPage = () => {
  const handleOnChange = () => {}
  return (
    <ContentContainer>
      <PageTitle text={'국내 정보 유출 이력 대응'} />
      <Table>
        <tbody>
          <tr>
            <LabelTd>인지일시</LabelTd>
            <Td colSpan={2}>
              <CustomTimePicker />
            </Td>
            <LabelTd>피해대상</LabelTd>
            <Td colSpan={2}>
              <CustomCheckBoxGroup items={['개인', '기업', '기타']} />
            </Td>
            <LabelTd>피해기관</LabelTd>
            <Td>
              <CustomEditable />
            </Td>
            <LabelTd>침해신고여부</LabelTd>
            <Td>
              <CustomSelect
                options={[
                  { value: '신고', label: '신고' },
                  { value: '미신고', label: '미신고' },
                ]}
                value={'신고'}
              />
            </Td>
            <LabelTd>기술지원여부</LabelTd>
            <Td>
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
            <LabelTd>미신고 사유</LabelTd>
            <Td colSpan={11}>
              <CustomCheckBoxGroup
                items={[
                  '피해기업 확인불가',
                  '무응답',
                  '데이터불일치',
                  '휴페업',
                  '이관',
                  '기타',
                ]}
                children={<CustomEditable />}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>사고유형</LabelTd>
            <Td colSpan={11}>
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
            <Td colSpan={7}>
              <CustomEditable />
            </Td>
            <LabelTd>채널구분</LabelTd>
            <Td colSpan={2}>
              <CustomSelect
                options={[
                  { value: '다크웹', label: '다크웹' },
                  { value: '텔레그램', label: '텔레그램' },
                ]}
                value={'다크웹'}
              />
            </Td>
            <Td colSpan={1}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd colSpan={2}>다크웹/텔레그램명</LabelTd>
            <Td colSpan={4}>
              <CustomSelect
                options={[
                  {
                    value: 'Software News • The Register',
                    label: 'Software News • The Register',
                  },
                ]}
                value={'Software News • The Register'}
              />
            </Td>
            <LabelTd colSpan={2}>게시글/텔레그램 URL</LabelTd>
            <Td colSpan={4}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd>다운로드 URL</LabelTd>
            <Td colSpan={11}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd>최초인지</LabelTd>
            <Td colSpan={11}>
              <CustomCheckBoxGroup
                items={[
                  '자체탐지',
                  'S2W',
                  '금융보안원',
                  '경찰청',
                  '언론보도',
                  '기타',
                ]}
                children={<CustomEditable />}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>최초인지 상세</LabelTd>
            <Td colSpan={11}>
              <CustomEditable />
            </Td>
          </tr>
          <tr>
            <LabelTd>공유</LabelTd>
            <Td colSpan={11}>
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
          </tr>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={4}>
              <CustomEditable />
            </Td>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={3}>
              <CustomEditable />
            </Td>
            <LabelTd>작성일시</LabelTd>
            <Td colSpan={2}>
              <CustomTimePicker />
            </Td>
          </tr>
          <tr>
            <LabelTd colSpan={2}>대응내역(보고문구)</LabelTd>
            <Td colSpan={10}>
              <CustomTextarea />
            </Td>
          </tr>
          <tr>
            <LabelTd colSpan={2}>비고</LabelTd>
            <Td colSpan={10}>
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
  padding: 0 8px 0 4px;
  border-bottom: 1px solid #d9d9d9;
`

const LabelTd = styled(Td)`
  text-align: center;
  background-color: #f6f6f6;
  width: 85px;
`
