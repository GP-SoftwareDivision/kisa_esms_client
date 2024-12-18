import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { IoMdClose } from 'react-icons/io'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTimePicker from '@/components/elements/TimePicker'
import CustomSelect from '@/components/elements/Select.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomCheckBoxGroup from '@/components/elements/CheckBoxGroup.tsx'
import CustomEditable from '@/components/elements/Editable.tsx'
import CustomTextarea from '@/components/elements/Textarea.tsx'
import { useEdit } from '@/hooks/common/useEdit.tsx'
import CustomRadio from '@/components/elements/CustomRadio.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { useResponseAddMutation } from '@/hooks/mutations/useResponseAddMutation.tsx'

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

  span {
    color: #ef4444;
    padding: 0 4px;
  }
`

const VictimsListContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
`

const AddVictimsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background-color: #3366d6;
  color: #ffffff;
  padding: 2px 4px;
  border-radius: 4px;
  max-width: 120px;
  overflow: hidden;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  button {
    cursor: pointer;
  }

  svg {
    font-size: 0.8rem !important;
  }
`

// 채널 리스트 타입 정의
interface ChannelListType {
  channelName: string
  domain: string
  seqidx: number
  type: string
}

const TrackingDetailPage = () => {
  const { editFields, handleOnFieldsChange, handleOnCleanField } = useEdit()
  const queryParams = new URLSearchParams(location.search)
  const {
    insertResponseIssue,
    victims,
    setVictims,
    targetList,
    findTargetTypeText,
  } = useResponseAddMutation()

  // 작성일
  const [date, setDate] = useState<string>('')

  // 게시일
  const [publishedDate, setPublishedDate] = useState<string>('')

  // 사고 유형
  const [incidentType, setIncidentType] = useState<string[]>([])

  // 협박 유무
  const [threatFlag, setThreatFlag] = useState<string>('')

  // 선택된 채널
  const [channelId, setChannelId] = useState<string>('')

  // 최초 인지
  const [originType, setOriginType] = useState<string>('')

  // 공유
  const [shareTarget, setShareTarget] = useState<string[]>([])

  // 수집 정보
  const [colInfo, setColInfo] = useState<string>('')

  // 이미지 유무
  const [imageFlag, setImageFlag] = useState<string>('')

  // 보고 문구
  const [contents, setContents] = useState<string>('')

  // 대상 구분 => 개인 | 개인 외
  const [targetType, setTargetType] = useState<string[]>([])

  // 피해 대상
  const [target, setTarget] = useState<string>('')

  // 침해 신고 여부
  const [reportFlag, setReportFlag] = useState<string>('')

  // 기술 지원 여부
  const [supportFlag, setSupportFlag] = useState<string>('')

  // 거부 사유
  const [reason, setReason] = useState<string>('')

  const responseDetail = useQueries<{ data: ChannelListType[] }>({
    queryKey: `responseDetail`,
    method: 'POST',
    url: '/api/issue/history/detail',
    body: {
      seqidx: queryParams.get('id'),
    },
    enabled: !!queryParams.get('id'),
  })

  useEffect(() => {
    console.log(responseDetail.data?.data)
  }, [responseDetail.data])

  // 채널 선택 조회 API
  const channelList = useQueries<{ data: ChannelListType[] }>({
    queryKey: `channelList`,
    method: 'GET',
    url: '/api/issue/history/channel',
  })

  const issueRequest = {
    registrationDate: date,
    incidentType: incidentType.join(','),
    incidentTypeDetail: editFields.incidentTypeDetail ?? '',
    threatFlag,
    channelId: Number(channelId),
    url: editFields.url ?? '',
    downloadUrl: editFields.downloadUrl ?? '',
    title: editFields.title ?? '',
    writer: editFields.writer ?? '',
    publishedDate: publishedDate,
    originType: originType,
    originTypeDetail: editFields.originTypeDetail ?? '',
    shareTarget: shareTarget.join(','),
    colInfo: colInfo,
    imageFlag,
    contents,
    hackGroup: editFields.hackedGroup ?? '',
    leakedInfo: editFields.leakedInfo ?? '',
    comment: editFields.comment ?? '',
  }

  // 피해 대상 생성
  const handleCreateVictims = () => {
    const tmpState = {
      id: victims.length + 1,
      registrationDate: date,
      targetType: target,
      institution: editFields.institution ?? '',
      reportFlag,
      incidentId: editFields.incidentId ?? '',
      supportFlag,
      reason,
    }
    setVictims((prev) => [...prev, tmpState])

    setTarget('')
    setReportFlag(' ')
    setSupportFlag(' ')
    setReason(' ')
    handleOnCleanField('institution', '')
    handleOnCleanField('incidentId', '')
  }

  // 대상 구분 개인일 때 빈 리스트 생성
  useEffect(() => {
    if (targetType.length === 1 && targetType[0] === '개인')
      handleCreateVictims()
  }, [targetType])

  // 피해 대상 생성 취소
  const handleOnCancelVictims = (id: number) => {
    setVictims((prevVictims) =>
      prevVictims.filter((victim) => victim.id !== id)
    )
  }

  return (
    <ContentContainer>
      <PageTitle text={'국내 정보 유출 이력 대응'} />
      <Table>
        <tbody>
          <tr>
            <LabelTd>
              <span>*</span>
              등록일시
            </LabelTd>
            <Td colSpan={3}>
              <CustomTimePicker date={date} setDate={setDate} />
            </Td>
            <LabelTd colSpan={2}>
              <span>*</span>
              대상 구분
            </LabelTd>
            <Td colSpan={10}>
              <CustomCheckBoxGroup
                items={['개인', '개인 외']}
                value={targetType}
                setValue={setTargetType}
              />
            </Td>
          </tr>
          {targetType.includes('개인 외') && (
            <>
              <tr>
                <LabelTd>
                  <span>*</span>피해 대상
                </LabelTd>
                <Td colSpan={7}>
                  <CustomRadio
                    items={targetList}
                    value={target}
                    setValue={setTarget}
                  />
                </Td>
                <LabelTd>피해기관</LabelTd>
                <Td colSpan={4}>
                  <CustomEditable
                    id={'institution'}
                    value={editFields.institution}
                    onChange={handleOnFieldsChange}
                  />
                </Td>
                <LabelTd>침해신고여부</LabelTd>
                <Td colSpan={2}>
                  <CustomSelect
                    options={[
                      { value: 'Y', label: '신고' },
                      { value: 'N', label: '미신고' },
                    ]}
                    value={reportFlag}
                    setState={setReportFlag}
                  />
                </Td>
              </tr>
              <tr>
                <LabelTd>사고번호</LabelTd>
                <Td colSpan={3}>
                  <CustomEditable
                    id={'incidentId'}
                    value={editFields.incidentId}
                    onChange={handleOnFieldsChange}
                    disabled={reportFlag === 'N'}
                  />
                </Td>
                <LabelTd colSpan={2}>기술지원여부</LabelTd>
                <Td colSpan={2}>
                  <CustomSelect
                    options={[
                      { value: 'Y', label: '동의' },
                      { value: 'N', label: '미동의' },
                    ]}
                    value={supportFlag}
                    setState={setSupportFlag}
                    disabled={reportFlag === 'N'}
                  />
                </Td>
                <LabelTd>거부사유</LabelTd>
                <Td colSpan={2}>
                  <CustomSelect
                    options={[
                      {
                        value: '피해기업 확인불가',
                        label: '피해기업 확인불가',
                      },
                      { value: '신뢰불가', label: '신뢰불가' },
                      {
                        value: '무응답',
                        label: '무응답',
                      },
                      { value: '데이터불일치', label: '데이터불일치' },
                      { value: '휴폐업', label: '휴폐업' },
                      { value: '이관', label: '이관' },
                      { value: '기타', label: '기타' },
                    ]}
                    value={reason}
                    setState={setReason}
                    disabled={reportFlag === 'Y'}
                  />
                </Td>
                <Td colSpan={4}>
                  <CustomEditable
                    id={'reason'}
                    value={editFields.reason}
                    onChange={handleOnFieldsChange}
                    disabled={reportFlag === 'Y' || reason !== '기타'}
                  />
                </Td>
                <Td>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      text={'생성'}
                      type={'primary'}
                      onClick={handleCreateVictims}
                    />
                  </div>
                </Td>
              </tr>
              {victims.length > 0 && (
                <tr>
                  <Td colSpan={16}>
                    <VictimsListContainer>
                      {victims.length > 0 &&
                        victims.map((victim, index) => (
                          <AddVictimsWrapper
                            key={`${victim.targetType}_${index}`}
                          >
                            <span>
                              {findTargetTypeText(victim.targetType)} -
                              {victim.institution}
                            </span>
                            <button
                              onClick={() => handleOnCancelVictims(victim.id)}
                            >
                              <IoMdClose />
                            </button>
                          </AddVictimsWrapper>
                        ))}
                    </VictimsListContainer>
                  </Td>
                </tr>
              )}
            </>
          )}
          <tr>
            <LabelTd>
              <span>*</span>
              사고유형
            </LabelTd>
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
                value={incidentType}
                setValue={setIncidentType}
                children={
                  <CustomEditable
                    id={'incidentType'}
                    value={editFields.incidentType}
                    onChange={handleOnFieldsChange}
                    disabled={!incidentType.includes('기타')}
                  />
                }
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>사고유형 상세</LabelTd>
            <Td colSpan={11}>
              <CustomEditable
                id={'incidentTypeDetail'}
                value={editFields.incidentTypeDetail}
                onChange={handleOnFieldsChange}
              />
            </Td>
            <LabelTd>
              <span>*</span>
              협박 유무
            </LabelTd>
            <Td colSpan={3}>
              <CustomRadio
                items={[
                  { label: '있음', value: 'Y' },
                  { label: '없음', value: 'N' },
                ]}
                value={threatFlag}
                setValue={setThreatFlag}
              />
            </Td>
          </tr>
          {channelList.isSuccess && (
            <tr>
              <LabelTd>
                <span>*</span>
                채널 선택
              </LabelTd>
              <Td colSpan={3}>
                <CustomSelect
                  options={
                    channelList.isSuccess && channelList.data?.data
                      ? channelList.data?.data?.map((item) => ({
                          label: item.domain,
                          value: item.seqidx.toString(),
                        }))
                      : []
                  }
                  setState={setChannelId}
                />
              </Td>
              <LabelTd colSpan={2}>
                <span>*</span>
                채널 구분
              </LabelTd>
              <Td colSpan={3}>
                <CustomEditable
                  id={''}
                  value={
                    (channelList.isSuccess &&
                      channelList.data?.data.find(
                        (item) => item.seqidx === Number(channelId)
                      )?.type) ||
                    ''
                  }
                  onChange={handleOnFieldsChange}
                />
              </Td>
              <LabelTd>채널명</LabelTd>
              <Td colSpan={6}>
                <CustomEditable
                  id={''}
                  value={
                    (channelList.isSuccess &&
                      channelList.data?.data.find(
                        (item) => item.seqidx === Number(channelId)
                      )?.channelName) ||
                    ''
                  }
                  onChange={handleOnFieldsChange}
                />
              </Td>
            </tr>
          )}
          <tr>
            <LabelTd colSpan={2}>게시글/텔레그램 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable
                id={'url'}
                value={editFields.url}
                onChange={handleOnFieldsChange}
              />
            </Td>
            <LabelTd colSpan={2}>다운로드 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable
                id={'downloadUrl'}
                value={editFields.downloadUrl}
                onChange={handleOnFieldsChange}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={7}>
              <CustomEditable
                id={'title'}
                value={editFields.title}
                onChange={handleOnFieldsChange}
              />
            </Td>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={3}>
              <CustomEditable
                id={'writer'}
                value={editFields.writer}
                onChange={handleOnFieldsChange}
              />
            </Td>
            <LabelTd>게시일</LabelTd>
            <Td colSpan={3}>
              <CustomTimePicker
                date={publishedDate}
                setDate={setPublishedDate}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>
              <span>*</span>최초인지
            </LabelTd>
            <Td colSpan={4}>
              <CustomSelect
                label={''}
                options={[
                  { value: '자체탐지', label: '자체탐지' },
                  { value: 'S2W', label: 'S2W' },
                  { value: '금융보안원', label: '금융보안원' },
                  { value: '경찰청', label: '경찰청' },
                  { value: '언론보도', label: '언론보도' },
                  { value: '기타', label: '기타' },
                ]}
                value={originType}
                setState={setOriginType}
              />
            </Td>
            <LabelTd colSpan={2}>최초인지 상세</LabelTd>
            <Td colSpan={9}>
              <CustomEditable
                id={'originTypeDetail'}
                value={editFields.originTypeDetail}
                onChange={handleOnFieldsChange}
              />
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
                value={shareTarget}
                setValue={setShareTarget}
                children={
                  <CustomEditable
                    id={'shareTarget'}
                    value={editFields.shareTarget}
                    onChange={handleOnFieldsChange}
                    disabled={!shareTarget.includes('기타')}
                  />
                }
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>수집정보</LabelTd>
            <Td colSpan={11}>
              <CustomSelect
                multiple
                label={''}
                options={[
                  { value: '주민번호', label: '주민번호' },
                  { value: '운전면허증', label: '운전면허증' },
                  { value: '이름', label: '이름' },
                  { value: '생년월일', label: '생년월일' },
                  { value: '전화번호', label: '전화번호' },
                  { value: '신용/계좌', label: '신용/계좌' },
                  { value: '주소', label: '주소' },
                  { value: '계정ID', label: '계정ID' },
                  { value: '암호', label: '암호' },
                  { value: '이메일', label: '이메일' },
                  { value: '문서', label: '문서' },
                  { value: '여권정보', label: '여권정보' },
                  {
                    value: '악성스크립트 정보(웹쉘)',
                    label: '악성스크립트 정보(웹쉘)',
                  },
                  {
                    value: '시스템 정보(DB정보 API정보)',
                    label: '시스템 정보(DB정보 API정보)',
                  },
                ]}
                value={colInfo}
                setState={setColInfo}
              />
            </Td>
            <LabelTd>이미지 유무</LabelTd>
            <Td colSpan={3}>
              <CustomRadio
                items={[
                  { label: '있음', value: 'Y' },
                  { label: '없음', value: 'N' },
                ]}
                value={imageFlag}
                setValue={setImageFlag}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>보고문구</LabelTd>
            <Td colSpan={15}>
              <CustomTextarea value={contents} setValue={setContents} />
            </Td>
          </tr>
          <tr>
            <LabelTd>해커그룹</LabelTd>
            <Td colSpan={7}>
              <CustomEditable
                id={'hackedGroup'}
                value={editFields.hackedGroup}
                onChange={handleOnFieldsChange}
              />
            </Td>
            <LabelTd>비고</LabelTd>
            <Td colSpan={7}>
              <CustomEditable
                id={'comment'}
                value={editFields.comment}
                onChange={handleOnFieldsChange}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>유출정보</LabelTd>
            <Td colSpan={15}>
              <CustomEditable
                id={'leakedInfo'}
                value={editFields.leakedInfo}
                onChange={handleOnFieldsChange}
              />
            </Td>
          </tr>
        </tbody>
      </Table>
      <ButtonContainer>
        <Button
          type={'primary'}
          onClick={() => insertResponseIssue.mutate(issueRequest)}
          text={'저장'}
        />
        <Button type={'tertiary'} onClick={() => {}} text={'닫기'} />
      </ButtonContainer>
    </ContentContainer>
  )
}

export default React.memo(TrackingDetailPage)
