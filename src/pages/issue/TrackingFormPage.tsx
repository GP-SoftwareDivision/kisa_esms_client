import React, { useEffect, useMemo } from 'react'
import Creatable, { SingleValue } from 'react-select'
import { FixedSizeList as List } from 'react-window'
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
  useTrackingDetailMutation,
} from '@/hooks/mutations/useTrackingDetailMutation.tsx'
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

const StyledMenuList = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
  align-items: center;

  button {
    height: 30px !important;
  }
`

// react-window를 사용한 selectbox 스타일
const selectStyles = {
  container: (base: any) => ({
    ...base,
    width: '100%',
  }),
  control: (base: any) => ({
    ...base,
    outline: 'none',
    boxShadow: 'none',
    border: '1px solid #d9d9d9',
    height: '30px',
    '&:hover': {
      border: '1px solid #d9d9d9',
    },
  }),
  input: (base: any) => ({
    ...base,
    outline: 'none',
    boxShadow: 'none',
  }),
  menu: (base: any) => ({
    ...base,
    boxShadow: 'none',
  }),
  option: (base: any, state: any) => ({
    ...base,
    fontSize: '0.785rem',
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? '#f6f6f6'
      : state.isActive
        ? '#FFFFFF'
        : '#FFFFFF',
    color: '#000000',
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  indicatorContainer: (base: any) => ({
    ...base,
    display: 'none',
    padding: '4px',
  }),
}

// 채널 리스트 타입 정의
interface ChannelListType {
  seqidx: number
  type: string
  domain: string
  channelName: string
}

// 유출 이력 상세 정보 타입
export interface responseListType extends insertResponseType {
  domain: string
  domainType: string
  channelName: string
  institutions: VictimType[]
}

const TrackingFormPage = () => {
  const queryParams = new URLSearchParams(location.search)
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  const {
    insertResponseIssue,
    state,
    updateState,
    victims,
    setVictims,
    targetOptions,
    findTargetTypeText,
    handleOnExitPage,
    handleCreateVictims,
  } = useTrackingDetailMutation()

  const {
    insertChannel,
    openInsertChannel,
    closeInsertChannel,
    insertChannelOpen,
  } = useChannelAddMutation()

  // 이력 대응 상세 조회 API
  const responseDetail = useQueries<{ data: responseListType }>({
    queryKey: `responseDetail`,
    method: 'POST',
    url: '/api/issue/history/detail',
    body: {
      seqidx: Number(queryParams.get('seqidx')),
    },
  })

  // 채널 선택 조회 API
  const channelList = useQueries<{ data: ChannelListType[] }>({
    queryKey: `channelList`,
    method: 'GET',
    url: '/api/issue/history/channel',
  })

  // 페이지 조회
  useEffect(() => {
    if (responseDetail.isSuccess && responseDetail.data?.data) {
      const detail = responseDetail.data?.data

      const institutionsLength = detail?.institutions.length || 0

      const hasIndFlag = detail?.indFlag.includes('Y')
      if (hasIndFlag) {
        updateState(
          'SET_IND_FLAG',
          institutionsLength > 0 ? ['개인', '개인 외'] : ['개인']
        )
      } else {
        updateState('SET_IND_FLAG', institutionsLength > 0 ? ['개인 외'] : [])
      }

      updateState('SET_CHANNEL_ID', detail?.channelId?.toString() ?? '')
      updateState('SET_COL_INFO', detail?.colInfo ?? '')
      updateState('SET_COMMENT', detail?.comment ?? '')
      updateState('SET_CONTENTS', detail?.contents ?? '')
      updateState('SET_DOWNLOAD_URL', detail?.downloadUrl ?? '')
      updateState('SET_HACK_GROUP', detail?.hackGroup ?? '')
      updateState('SET_IMAGE_FLAG', detail?.imageFlag ?? '')

      // 사고유형 - '기타' 포함 여부에 따른 분기 처리
      if (detail?.incidentType.includes('기타')) {
        const tmpIncidentType = (detail?.incidentType as string).split(':')

        updateState('SET_INCIDENT_TYPE', tmpIncidentType[0].split(','))
        updateState('SET_INCIDENT_TYPE_ETC', tmpIncidentType[1])
      }

      if (!detail?.incidentType.includes('기타')) {
        updateState(
          'SET_INCIDENT_TYPE',
          (detail?.incidentType as string).split(',')
        )
      }

      if (detail?.institutions.length > 0) {
        const firstInstitution = detail?.institutions[0]
        updateState('SET_TARGET_TYPE', firstInstitution?.targetType ?? '')
        updateState('SET_INSTITUTION', firstInstitution?.institution ?? '')
        updateState('SET_REPORT_FLAG', firstInstitution?.reportFlag ?? ' ')
        updateState('SET_SUPPORT_FLAG', firstInstitution?.supportFlag ?? ' ')
        updateState('SET_REASON', firstInstitution?.reason ?? '')
        updateState('SET_INCIDENT_ID', firstInstitution?.incidentId ?? '')
      }

      updateState('SET_REGISTRATION_DATE', detail?.registrationDate ?? '')
      updateState('SET_KEYWORD', detail?.keyword ?? '')
      updateState('SET_ORIGIN_TYPE', detail?.originType ?? '')
      updateState('SET_ORIGIN_TYPE_DETAIL', detail?.originTypeDetail ?? '')
      updateState('SET_PUBLISHED_DATE', detail?.publishedDate ?? '')

      // 공유 - '기타' 포함 여부에 따른 분기 처리
      if (detail?.shareTarget.includes('기타')) {
        const tmpShareTarget = (detail?.shareTarget as string).split(':')

        updateState('SET_SHARE_TARGET', tmpShareTarget[0].split(','))
        updateState('SET_SHARE_TARGET_ETC', tmpShareTarget[1])
      }

      if (!detail?.shareTarget.includes('기타')) {
        updateState(
          'SET_SHARE_TARGET',
          (detail?.shareTarget as string).split(',')
        )
      }
      updateState('SET_THREAT_FLAG', detail?.threatFlag ?? '')
      updateState('SET_TITLE', detail?.title ?? '')
      updateState('SET_URL', detail?.url ?? '')
      updateState('SET_WRITER', detail?.writer ?? '')

      setVictims(
        detail?.institutions.map((item, index) => ({
          ...item,
          id: index + 1,
        })) ?? []
      )
    }
  }, [responseDetail.isSuccess, responseDetail.data])

  console.log(victims)
  // 피해 대상 생성 취소
  const handleOnCancelVictims = (event: any, id: number) => {
    event.stopPropagation()

    setVictims((prevVictims) =>
      prevVictims.filter((victim) => victim.id !== id)
    )
  }

  // 채널 신규 생성
  const handleOnInsertChannelAction = () => {
    insertChannel.mutate({
      domainName: fields.domainName,
      channelType: fields.channelType,
      channelName: fields.channelName,
    })

    handleOnCleanForm()
  }

  // 채널 생성 취소 액션
  const handleOnInsertChannelCancelAction = () => {
    closeInsertChannel()
    handleOnCleanForm()
  }

  // 채널 선택에 들어가는 옵션
  const channelListMemoization = useMemo(() => {
    if (channelList.isSuccess && channelList.data?.data) {
      return channelList.data.data.map((item) => ({
        label: item.domain,
        value: item.seqidx.toString(),
      }))
    }
    return []
  }, [channelList])

  // 채널 선택의 대량 데이터를 처리하기 위함
  const MenuList = (props: any) => {
    const { options, children, getValue, height = 35 } = props // 기본 height 값 설정
    const [value] = getValue()
    const initialOffset =
      options.findIndex((option: any) => option.value === value?.value) * height

    return (
      <List
        width={'100%'}
        height={200}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }: { index: any; style: any }) => (
          <div style={{ ...style, overflow: 'hidden' }}>{children[index]}</div>
        )}
      </List>
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
              <CustomTimePicker
                date={state.registrationDate}
                onChange={(_date: unknown, dateString: string | string[]) =>
                  updateState('SET_REGISTRATION_DATE', dateString as string)
                }
              />
            </Td>
            <LabelTd colSpan={2}>
              <span>*</span>
              대상구분
            </LabelTd>
            <Td colSpan={10}>
              <CustomCheckBoxGroup
                items={['개인', '개인 외']}
                value={state.indFlag}
                onChange={(value) => updateState('SET_IND_FLAG', value)}
              />
            </Td>
          </tr>
          {state.indFlag.includes('개인 외') && (
            <>
              <tr>
                <LabelTd>
                  <span>*</span>피해대상
                </LabelTd>
                <Td colSpan={7}>
                  <CustomRadio
                    items={targetOptions}
                    value={state.targetType}
                    onChange={(item: { value: string }) =>
                      updateState('SET_TARGET_TYPE', item.value)
                    }
                  />
                </Td>
                <LabelTd>
                  <span>*</span>피해기관
                </LabelTd>
                <Td colSpan={4}>
                  <CustomEditable
                    id={'institution'}
                    value={state.institution}
                    onChange={(item: { value: string }) =>
                      updateState('SET_INSTITUTION', item.value)
                    }
                  />
                </Td>
                <LabelTd>침해신고여부</LabelTd>
                <Td colSpan={2}>
                  <CustomSelect
                    options={[
                      { value: 'Y', label: '신고' },
                      { value: 'N', label: '미신고' },
                    ]}
                    value={state.reportFlag}
                    onChange={(item: { items: any; value: string[] }) =>
                      updateState('SET_REPORT_FLAG', item.value.join(','))
                    }
                  />
                </Td>
              </tr>
              <tr>
                <LabelTd>사고번호</LabelTd>
                <Td colSpan={3}>
                  <CustomEditable
                    id={'incidentId'}
                    value={state.incidentId}
                    onChange={(item: { value: string }) =>
                      updateState('SET_INCIDENT_ID', item.value)
                    }
                    disabled={state.reportFlag === 'N'}
                  />
                </Td>
                <LabelTd colSpan={2}>기술지원여부</LabelTd>
                <Td colSpan={2}>
                  <CustomSelect
                    options={[
                      { value: 'Y', label: '동의' },
                      { value: 'N', label: '미동의' },
                    ]}
                    value={state.supportFlag}
                    onChange={(item: { items: any; value: string[] }) =>
                      updateState('SET_SUPPORT_FLAG', item.value.join(','))
                    }
                    disabled={state.reportFlag === 'N'}
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
                    value={state.reason}
                    onChange={(item: { items: any; value: string[] }) =>
                      updateState('SET_REASON', item.value.join(','))
                    }
                    disabled={state.reportFlag === 'Y'}
                  />
                </Td>
                <Td colSpan={4}>
                  <CustomEditable
                    id={'reason'}
                    value={state.reasonEtc || ''}
                    onChange={(item: { value: string }) =>
                      updateState('SET_REASON_ETC', item.value)
                    }
                    disabled={
                      state.reportFlag === 'Y' || state.reason !== '기타'
                    }
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
                      {victims.map((victim: VictimType) => (
                        <AddVictimsWrapper
                          key={victim.id}
                          onClick={() => {
                            updateState('SET_TARGET_TYPE', victim.targetType)
                            updateState('SET_INSTITUTION', victim.institution)
                            updateState(
                              'SET_REPORT_FLAG',
                              victim.reportFlag ?? ' '
                            )
                            updateState('SET_INCIDENT_ID', victim.incidentId)
                            updateState(
                              'SET_SUPPORT_FLAG',
                              victim.supportFlag ?? ' '
                            )
                            updateState(
                              'SET_REASON',
                              victim.reason ? victim.reason.split(':')[0] : ' '
                            )
                            updateState(
                              'SET_REASON_ETC',
                              victim.reason ? victim.reason.split(':')[1] : ' '
                            )
                          }}
                        >
                          <span>
                            {findTargetTypeText(victim.targetType)} -
                            {victim.institution}
                          </span>
                          <button
                            onClick={(e) =>
                              handleOnCancelVictims(e, victim.id!)
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
                  'DDoS',
                  '랜섬웨어',
                  '웹변조',
                  '취약점',
                  '정보노출',
                  '기타해킹',
                  '확인불가',
                  '기타',
                ]}
                value={state.incidentType as string[]}
                onChange={(value) => updateState('SET_INCIDENT_TYPE', value)}
                children={
                  <CustomEditable
                    id={'incidentType'}
                    value={state.incidentTypeEtc || ''}
                    disabled={!state.incidentType?.includes('기타')}
                    onChange={(item: { value: string }) =>
                      updateState('SET_INCIDENT_TYPE_ETC', item.value)
                    }
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
                value={state.incidentTypeDetail}
                onChange={(item: { value: string }) =>
                  updateState('SET_INCIDENT_DETAIL', item.value)
                }
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
                value={state.threatFlag}
                onChange={(item: { value: string }) =>
                  updateState('SET_THREAT_FLAG', item.value)
                }
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>
              <span>*</span>
              채널선택
            </LabelTd>
            <Td colSpan={8}>
              <StyledMenuList>
                <Creatable
                  // menuIsOpen
                  options={channelListMemoization}
                  value={channelListMemoization.find(function (option) {
                    return option.value === state.channelId
                  })}
                  styles={selectStyles}
                  components={{ MenuList }}
                  placeholder='옵션을 선택해 주세요'
                  noOptionsMessage={() => '일치하는 채널이 없습니다.'}
                  menuPortalTarget={document.body}
                  menuPlacement='bottom'
                  onChange={(e: SingleValue<any>) =>
                    updateState('SET_CHANNEL_ID', e.value)
                  }
                />
                <Button
                  text='신규생성'
                  type='primary'
                  onClick={openInsertChannel}
                />
              </StyledMenuList>
            </Td>
            <LabelTd>
              <span>*</span>
              채널 구분
            </LabelTd>
            <Td colSpan={2}>
              <span>
                {(channelList.isSuccess &&
                  channelList.data?.data?.find(
                    (item) => item.seqidx === Number(state.channelId)
                  )?.type) ||
                  ''}
              </span>
            </Td>
            <LabelTd>채널명</LabelTd>
            <Td colSpan={3}>
              <span>
                {(channelList.isSuccess &&
                  channelList.data?.data?.find(
                    (item) => item.seqidx === Number(state.channelId)
                  )?.channelName) ||
                  ''}
              </span>
            </Td>
          </tr>
          <tr>
            <LabelTd colSpan={2}>게시글/텔레그램 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable
                id={'url'}
                value={state.url}
                onChange={(item: { value: string }) =>
                  updateState('SET_URL', item.value)
                }
              />
            </Td>
            <LabelTd colSpan={2}>다운로드 URL</LabelTd>
            <Td colSpan={6}>
              <CustomEditable
                id={'downloadUrl'}
                value={state.downloadUrl}
                onChange={(item: { value: string }) =>
                  updateState('SET_DOWNLOAD_URL', item.value)
                }
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>제목</LabelTd>
            <Td colSpan={7}>
              <CustomEditable
                id={'title'}
                value={state.title}
                onChange={(item: { value: string }) =>
                  updateState('SET_TITLE', item.value)
                }
              />
            </Td>
            <LabelTd>작성자</LabelTd>
            <Td colSpan={3}>
              <CustomEditable
                id={'writer'}
                value={state.writer}
                onChange={(item: { value: string }) =>
                  updateState('SET_WRITER', item.value)
                }
              />
            </Td>
            <LabelTd>게시일</LabelTd>
            <Td colSpan={3}>
              <CustomTimePicker
                date={state.publishedDate}
                onChange={(_date: unknown, dateString: string | string[]) =>
                  updateState('SET_PUBLISHED_DATE', dateString as string)
                }
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
                value={state.originType}
                onChange={(item: { items: any; value: string[] }) =>
                  updateState('SET_ORIGIN_TYPE', item.value.join(','))
                }
              />
            </Td>
            <LabelTd colSpan={2}>최초인지 상세</LabelTd>
            <Td colSpan={9}>
              <CustomEditable
                id={'originTypeDetail'}
                value={state.originTypeDetail}
                onChange={(item: { value: string }) =>
                  updateState('SET_ORIGIN_TYPE_DETAIL', item.value)
                }
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
                value={state.shareTarget as string[]}
                onChange={(value) => updateState('SET_SHARE_TARGET', value)}
                children={
                  <CustomEditable
                    id={'shareTarget'}
                    value={state.shareTargetEtc || ''}
                    onChange={(item: { value: string }) =>
                      updateState('SET_SHARE_TARGET_ETC', item.value)
                    }
                    disabled={!state.shareTarget?.includes('기타')}
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
                value={state.colInfo}
                onChange={(item: { items: any; value: string[] }) =>
                  updateState('SET_COL_INFO', item.value.join(','))
                }
              />
            </Td>
            <LabelTd>이미지 유무</LabelTd>
            <Td colSpan={3}>
              <CustomRadio
                items={[
                  { label: '있음', value: 'Y' },
                  { label: '없음', value: 'N' },
                ]}
                value={state.imageFlag}
                onChange={(item: { value: string }) =>
                  updateState('SET_IMAGE_FLAG', item.value)
                }
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>보고문구</LabelTd>
            <Td colSpan={15}>
              <CustomTextarea
                value={state.contents}
                onChange={(e: any) =>
                  updateState('SET_CONTENTS', e.target.value)
                }
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>해커그룹</LabelTd>
            <Td colSpan={7}>
              <CustomEditable
                id={'hackGroup'}
                value={state.hackGroup}
                onChange={(item: { value: string }) =>
                  updateState('SET_HACK_GROUP', item.value)
                }
              />
            </Td>
            <LabelTd>비고</LabelTd>
            <Td colSpan={7}>
              <CustomEditable
                id={'comment'}
                value={state.comment}
                onChange={(item: { value: string }) =>
                  updateState('SET_COMMENT', item.value)
                }
              />
            </Td>
          </tr>
          <tr>
            <LabelTd>키워드</LabelTd>
            <Td colSpan={15}>
              <CustomEditable
                id={'keyword'}
                value={state.keyword}
                onChange={(item: { value: string }) =>
                  updateState('SET_KEYWORD', item.value)
                }
              />
            </Td>
          </tr>
        </tbody>
      </Table>
      <ButtonContainer>
        <Button
          type={'primary'}
          onClick={() => {
            insertResponseIssue.mutate({
              registrationDate: state.registrationDate || '',
              incidentType: !state.incidentTypeEtc
                ? state.incidentType
                : `${state.incidentType}:${state.incidentTypeEtc}`,
              incidentTypeDetail: state.incidentTypeDetail || '',
              threatFlag: state.threatFlag || '',
              channelId: state.channelId || '',
              url: state.url || '',
              downloadUrl: state.downloadUrl || '',
              title: state.title || '',
              writer: state.writer || '',
              publishedDate: state.publishedDate || '',
              originType: state.originType || '',
              originTypeDetail: state.originTypeDetail || '',
              shareTarget: !state.shareTargetEtc
                ? state.shareTarget
                : `${state.shareTarget}:${state.shareTargetEtc}`,
              colInfo: state.colInfo || '',
              imageFlag: state.imageFlag || '',
              contents: state.contents || '',
              hackGroup: state.hackGroup || '',
              keyword: state.keyword || '',
              comment: state.comment || '',
              indFlag: state.indFlag || '',
              seqidx: Number(queryParams.get('seqidx')) || 0,
              sourceIdx: Number(responseDetail.data?.data.sourceIdx) || 0,
              sourceType: responseDetail.data?.data.sourceType || '',
            })
          }}
          text={'저장'}
        />
        <Button type={'tertiary'} onClick={handleOnExitPage} text={'닫기'} />
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

export default React.memo(TrackingFormPage)
