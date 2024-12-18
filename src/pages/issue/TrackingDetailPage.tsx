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
import CustomRadio from '@/components/elements/CustomRadio.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import {
  insertResponseType,
  VictimType,
  useResponseAddMutation,
} from '@/hooks/mutations/useResponseAddMutation.tsx'
import { Flex } from '@chakra-ui/react'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { useChannelAddMutation } from '@/hooks/mutations/useChannelAddMutation.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'

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
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
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
  cursor: pointer;

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

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  gap: 10px;
`

// 채널 리스트 타입 정의
interface ChannelListType {
  channelName: string
  domain: string
  seqidx: number
  type: string
}

// 유출 이력 상세 정보 타입
interface responseListType extends insertResponseType {
  institutions: VictimType[]
}

const TrackingDetailPage = () => {
  const queryParams = new URLSearchParams(location.search)
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  const {
    insertResponseIssue,
    victims,
    setVictims,
    targetList,
    findTargetTypeText,
  } = useResponseAddMutation()

  const {
    insertChannel,
    openInsertChannel,
    closeInsertChannel,
    insertChannelOpen,
  } = useChannelAddMutation()
  // 작성일
  const [registrationDate, setRegistrationDate] = useState<string>('')

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

  // 공유 기타
  const [shareTargetEtc, setShareTargetEtc] = useState<string>('')

  // 수집 정보
  const [colInfo, setColInfo] = useState<string>('')

  // 이미지 유무
  const [imageFlag, setImageFlag] = useState<string>('')

  // 보고 문구
  const [contents, setContents] = useState<string>('')

  // 대상 구분 => 개인 | 개인 외
  const [indFlag, setIndFlag] = useState<string[]>([])

  // 피해 대상
  const [targetType, setTargetType] = useState<string>('')

  // 침해 신고 여부
  const [reportFlag, setReportFlag] = useState<string>('')

  // 기술 지원 여부
  const [supportFlag, setSupportFlag] = useState<string>('')

  // 거부 사유
  const [reason, setReason] = useState<string>('')

  const [incidentTypeEtc, setIncidentTypeEtc] = useState<string>('')

  const [incidentTypeDetail, setIncidentTypeDetail] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [downloadUrl, setDownloadUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [writer, setWriter] = useState<string>('')
  const [originTypeDetail, setOriginTypeDetail] = useState<string>('')
  const [hackGroup, setHackGroup] = useState<string>('')
  const [leakedInfo, setLeakedInfo] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const [institution, setInstitution] = useState<string>('')
  const [incidentId, setIncidentId] = useState<string>('')

  const responseDetail = useQueries<{ data: responseListType }>({
    queryKey: `responseDetail`,
    method: 'POST',
    url: '/api/issue/history/detail',
    body: {
      seqidx: queryParams.get('id'),
    },
    enabled: !!queryParams.get('id'),
  })

  useEffect(() => {
    if (responseDetail.isSuccess && responseDetail.data?.data) {
      const institutionsLength =
        responseDetail.data?.data?.institutions.length || 0
      const hasIndFlag = responseDetail.data?.data?.indFlag.includes('Y')

      if (hasIndFlag) {
        setIndFlag(institutionsLength > 0 ? ['개인', '개인 외'] : ['개인'])
      } else {
        setIndFlag(institutionsLength > 0 ? ['개인 외'] : [])
      }
      setChannelId(responseDetail.data?.data?.channelId?.toString() ?? '')
      setColInfo(responseDetail.data?.data?.colInfo ?? '')
      setComment(responseDetail.data?.data?.comment ?? '')
      setContents(responseDetail.data?.data?.contents ?? '')
      setDownloadUrl(responseDetail.data?.data?.downloadUrl ?? '')
      setHackGroup(responseDetail.data?.data?.hackGroup ?? '')
      setImageFlag(responseDetail.data?.data?.imageFlag ?? '')
      setIncidentType(responseDetail.data?.data?.incidentType?.split(','))
      setIncidentTypeDetail(responseDetail.data?.data?.incidentTypeDetail ?? '')
      setVictims(responseDetail.data?.data?.institutions ?? '')

      if (responseDetail.data?.data?.institutions.length > 0) {
        setTargetType(
          responseDetail.data?.data?.institutions[0]?.targetType ?? ''
        )
        setInstitution(
          responseDetail.data?.data?.institutions[0]?.institution ?? ''
        )
        setReportFlag(
          responseDetail.data?.data?.institutions[0]?.reportFlag ?? ' '
        )
        setSupportFlag(
          responseDetail.data?.data?.institutions[0]?.supportFlag ?? ' '
        )
        setReason(responseDetail.data?.data?.institutions[0]?.reason ?? '')
        setIncidentId(
          responseDetail.data?.data?.institutions[0]?.incidentId ?? ''
        )
      }

      setRegistrationDate(responseDetail.data?.data?.registrationDate ?? '')
      setLeakedInfo(responseDetail.data?.data?.leakedInfo ?? '')
      setOriginType(responseDetail.data?.data?.originType ?? '')
      setOriginTypeDetail(responseDetail.data?.data?.originTypeDetail ?? '')
      setPublishedDate(responseDetail.data?.data?.publishedDate ?? '')
      setShareTarget(responseDetail.data?.data?.shareTarget?.split(','))
      setThreatFlag(responseDetail.data?.data?.threatFlag ?? '')
      setTitle(responseDetail.data?.data?.title ?? '')
      setUrl(responseDetail.data?.data?.url ?? '')
      setWriter(responseDetail.data?.data?.writer ?? '')
    }
  }, [responseDetail.data])

  // 채널 선택 조회 API
  const channelList = useQueries<{ data: ChannelListType[] }>({
    queryKey: `channelList`,
    method: 'GET',
    url: '/api/issue/history/channel',
  })

  // 피해 대상 생성
  const handleCreateVictims = () => {
    const tmpState = {
      registrationDate,
      targetType,
      institution,
      reportFlag,
      incidentId,
      supportFlag,
      reason,
    }
    setVictims((prev) => [...prev, tmpState])

    setTargetType('')
    setReportFlag(' ')
    setSupportFlag(' ')
    setReason('')
    setInstitution('')
    setIncidentId('')
  }

  // 대상 구분 개인일 때 빈 리스트 생성
  useEffect(() => {
    if (indFlag.length === 1 && indFlag[0] === '개인') handleCreateVictims()
  }, [indFlag])

  // 피해 대상 생성 취소
  const handleOnCancelVictims = (event: any, id: number) => {
    event.stopPropagation()

    console.log(id)
    setVictims((prevVictims) =>
      prevVictims.filter((victim) => victim.seqidx !== id)
    )

    if (victims.length > 0) {
      setTargetType(victims[0].targetType ?? '')
      setInstitution(victims[0].institution ?? '')
      setReportFlag(victims[0].reportFlag ?? ' ')
      setSupportFlag(victims[0].supportFlag ?? ' ')
      setReason(victims[0].reason ?? '')
      setIncidentId(victims[0].incidentId ?? '')
    }
    if (victims.length === 0) {
      setTargetType('')
      setInstitution('')
      setReportFlag(' ')
      setSupportFlag(' ')
      setReason('')
      setIncidentId('')
    }
  }
  console.log(victims)

  const handleOnInsertChannelAction = () => {
    insertChannel.mutate({
      domainName: fields.domainName,
      channelType: fields.channelType,
      channelName: fields.channelName,
    })

    handleOnCleanForm()
  }

  const handleOnInsertChannelCancelAction = () => {
    closeInsertChannel()
    handleOnCleanForm()
  }

  // 피해 대상 기관 없을 경우 비우기
  useEffect(() => {
    if (victims.length === 0) {
      setTargetType('')
      setInstitution('')
      setReportFlag(' ')
      setSupportFlag(' ')
      setReason('')
      setIncidentId('')
    }
  }, [victims])

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
              <CustomTimePicker
                date={registrationDate}
                setDate={setRegistrationDate}
              />
            </Td>
            <LabelTd colSpan={2}>
              <span>*</span>
              대상 구분
            </LabelTd>
            <Td colSpan={10}>
              <CustomCheckBoxGroup
                items={['개인', '개인 외']}
                value={indFlag}
                setValue={setIndFlag}
              />
            </Td>
          </tr>
          {indFlag.includes('개인 외') && (
            <>
              <tr>
                <LabelTd>
                  <span>*</span>피해 대상
                </LabelTd>
                <Td colSpan={7}>
                  <CustomRadio
                    items={targetList}
                    value={targetType}
                    setValue={setTargetType}
                  />
                </Td>
                <LabelTd>피해기관</LabelTd>
                <Td colSpan={4}>
                  <CustomEditable
                    id={'institution'}
                    value={institution}
                    setValue={setInstitution}
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
                    value={incidentId}
                    setValue={setIncidentId}
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
                  {/*<CustomEditable*/}
                  {/*  id={'reason'}*/}
                  {/*  value={reason}*/}
                  {/*  setValue={setReason}*/}
                  {/*  disabled={reportFlag === 'Y' || reason !== '기타'}*/}
                  {/*/>*/}
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
                            onClick={() => {
                              setTargetType(victim.targetType ?? '')
                              setInstitution(victim.institution ?? '')
                              setReportFlag(victim.reportFlag ?? ' ')
                              setSupportFlag(victim.supportFlag ?? ' ')
                              setReason(victim.reason ?? '')
                              setIncidentId(victim.incidentId ?? '')
                            }}
                          >
                            <span>
                              {findTargetTypeText(victim.targetType)} -
                              {victim.institution}
                            </span>
                            <button
                              onClick={(event) =>
                                handleOnCancelVictims(event, victim.seqidx!)
                              }
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
                    value={incidentTypeEtc}
                    setValue={setIncidentTypeEtc}
                    disabled={!incidentType?.includes('기타')}
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
                value={incidentTypeDetail}
                setValue={setIncidentTypeDetail}
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
              <Td colSpan={6}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <CustomSelect
                    options={
                      channelList.isSuccess && channelList.data?.data
                        ? channelList.data?.data?.map((item) => ({
                            label: item.domain,
                            value: item.seqidx.toString(),
                          }))
                        : []
                    }
                    value={channelId}
                    setState={setChannelId}
                  />
                  <Button
                    text={'신규생성'}
                    type={'primary'}
                    onClick={openInsertChannel}
                  />
                </div>
              </Td>
              <LabelTd>
                <span>*</span>
                채널 구분
              </LabelTd>
              <Td colSpan={3}>
                <CustomEditable
                  id={''}
                  value={
                    channelList.isSuccess &&
                    channelList.data?.data.find(
                      (item) => item.seqidx === Number(channelId)
                    )?.type === 'DT'
                      ? '다크웹'
                      : channelList.data?.data.find(
                            (item) => item.seqidx === Number(channelId)
                          )?.type === 'TT'
                        ? '텔레그램'
                        : ''
                  }
                  disabled
                />
              </Td>
              <LabelTd>채널명</LabelTd>
              <Td colSpan={4}>
                <CustomEditable
                  id={''}
                  value={
                    (channelList.isSuccess &&
                      channelList.data?.data.find(
                        (item) => item.seqidx === Number(channelId)
                      )?.channelName) ||
                    ''
                  }
                  disabled
                />
              </Td>
            </tr>
          )}
          <tr>
            <LabelTd colSpan={2}>게시글/텔레그램 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable id={'url'} value={url} setValue={setUrl} />
            </Td>
            <LabelTd colSpan={2}>다운로드 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable
                id={'downloadUrl'}
                value={downloadUrl}
                setValue={setDownloadUrl}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={7}>
              <CustomEditable id={'title'} value={title} setValue={setTitle} />
            </Td>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={3}>
              <CustomEditable
                id={'writer'}
                value={writer}
                setValue={setWriter}
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
                value={originTypeDetail}
                setValue={setOriginTypeDetail}
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
                    value={shareTargetEtc}
                    setValue={setShareTargetEtc}
                    disabled={!shareTarget?.includes('기타')}
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
                id={'hackGroup'}
                value={hackGroup}
                setValue={setHackGroup}
              />
            </Td>
            <LabelTd>비고</LabelTd>
            <Td colSpan={7}>
              <CustomEditable
                id={'comment'}
                value={comment}
                setValue={setComment}
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>유출정보</LabelTd>
            <Td colSpan={15}>
              <CustomEditable
                id={'leakedInfo'}
                value={leakedInfo}
                setValue={setLeakedInfo}
              />
            </Td>
          </tr>
        </tbody>
      </Table>
      <ButtonContainer>
        <Button
          type={'primary'}
          onClick={() =>
            insertResponseIssue.mutate({
              registrationDate,
              incidentType: incidentType.join(','),
              incidentTypeDetail,
              threatFlag,
              channelId: Number(channelId),
              url,
              downloadUrl,
              title,
              writer,
              publishedDate,
              originType,
              originTypeDetail,
              shareTarget: shareTarget.join(','),
              colInfo,
              imageFlag,
              contents,
              hackGroup,
              leakedInfo,
              comment,
              indFlag: indFlag.includes('개인') ? 'Y' : 'N',
            })
          }
          text={'저장'}
        />
        <Button type={'tertiary'} onClick={() => {}} text={'닫기'} />
      </ButtonContainer>
      <CustomModal
        isOpen={insertChannelOpen}
        title='채널 추가'
        onCancel={handleOnInsertChannelCancelAction}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='domainName'
                value={fields.domainName}
                label='신규 채널'
                placeholder={'그룹 이름을 입력하세요.'}
                onChange={handleOnChange}
                required
              />
              <CustomInput
                id='channelType'
                value={fields.channelType}
                label='채널구분'
                placeholder={'설명을 입력하세요.'}
                required
                onChange={handleOnChange}
              />
              <CustomInput
                id='channelName'
                value={fields.channelName}
                label='채널명'
                placeholder={'설명을 입력하세요.'}
                onChange={handleOnChange}
                required
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnInsertChannelCancelAction}
              />
              <CustomButton
                type='primary'
                text='추가'
                onClick={handleOnInsertChannelAction}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}

export default React.memo(TrackingDetailPage)
