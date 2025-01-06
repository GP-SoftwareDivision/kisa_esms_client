import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useEffect, useReducer, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import instance from '@/apis/instance.ts'
import { targetOptions } from '@/data/selectOptions.ts'

// 피해 대상 타입 선언
export interface VictimType {
  id?: number // 클라이언트 관리
  seqidx: number
  registrationDate: string
  targetType: string
  institution: string
  reportFlag: string | null
  incidentId: string
  supportFlag: string | null
  reason: string | null
  reasonEtc?: string
}

// 이슈 대응 타입 선언
export interface insertResponseType {
  registrationDate: string
  incidentType: string[] | string
  incidentTypeEtc?: string
  incidentTypeDetail: string
  threatFlag: string
  channelId: string
  url: string
  downloadUrl: string
  title: string
  writer: string
  publishedDate: string
  originType: string
  originTypeDetail: string
  shareTarget: string[] | string
  shareTargetEtc?: string
  colInfo: string
  imageFlag: string
  contents: string
  hackGroup: string
  keyword: string
  comment: string
  indFlag: string[]
  seqidx: number
  sourceIdx: number
  sourceType: string
}

// 피해 대상 + 이슈 대응 전체 타입 선언
export type VictimAndResponseType = VictimType & insertResponseType

type Action =
  | { type: 'SET_REGISTRATION_DATE'; payload: string } // 작성일 업데이트
  | { type: 'SET_PUBLISHED_DATE'; payload: string } // 게시일 업데이트
  | { type: 'SET_INCIDENT_TYPE'; payload: string[] } // 사고 유형 업데이트
  | { type: 'SET_INCIDENT_TYPE_ETC'; payload: string } // 사고 유형 기타 업데이트
  | { type: 'SET_INCIDENT_DETAIL'; payload: string } // 사고 유형 상세 업데이트
  | { type: 'SET_THREAT_FLAG'; payload: string } // 협박 유무 업데이트
  | { type: 'SET_CHANNEL_ID'; payload: string } // 선택된 채널 업데이트
  | { type: 'SET_ORIGIN_TYPE'; payload: string } // 최초 인지 정보 업데이트
  | { type: 'SET_SHARE_TARGET'; payload: string[] } // 공유 대상 업데이트
  | { type: 'SET_SHARE_TARGET_ETC'; payload: string } // 기타 공유 대상 업데이트
  | { type: 'SET_COL_INFO'; payload: string } // 수집 정보 업데이트
  | { type: 'SET_IMAGE_FLAG'; payload: string } // 이미지 유무 업데이트
  | { type: 'SET_CONTENTS'; payload: string } // 보고 문구 업데이트
  | { type: 'SET_IND_FLAG'; payload: string[] } // 대상 구분 업데이트
  | { type: 'SET_TARGET_TYPE'; payload: string } // 피해 대상 업데이트
  | { type: 'SET_INSTITUTION'; payload: string } // 피해 대상 업데이트
  | { type: 'SET_REPORT_FLAG'; payload: string } // 침해 신고 여부 업데이트
  | { type: 'SET_SUPPORT_FLAG'; payload: string } // 기술 지원 여부 업데이트
  | { type: 'SET_REASON'; payload: string } // 거부 사유 업데이트
  | { type: 'SET_REASON_ETC'; payload: string } // 거부 사유 업데이트
  | { type: 'SET_URL'; payload: string } // 게시글/텔레그램 url 업데이트
  | { type: 'SET_DOWNLOAD_URL'; payload: string } // 다운로드 url 업데이트
  | { type: 'SET_INCIDENT_ID'; payload: string } // 사고 ID 업데이트
  | { type: 'SET_TITLE'; payload: string } // 제목 업데이트
  | { type: 'SET_WRITER'; payload: string } // 작성자 업데이트
  | { type: 'SET_ORIGIN_TYPE_DETAIL'; payload: string } // 최초 인지 정보 상세 업데이트
  | { type: 'SET_HACK_GROUP'; payload: string } // 해킹 그룹 업데이트
  | { type: 'SET_KEYWORD'; payload: string } // 유출 정보 업데이트
  | { type: 'SET_COMMENT'; payload: string } // 코멘트 업데이트

const reducer = (
  state: VictimAndResponseType,
  action: Action
): VictimAndResponseType => {
  switch (action.type) {
    case 'SET_REGISTRATION_DATE':
      return { ...state, registrationDate: action.payload }
    case 'SET_PUBLISHED_DATE':
      return { ...state, publishedDate: action.payload }
    case 'SET_INCIDENT_TYPE':
      return { ...state, incidentType: action.payload }
    case 'SET_INCIDENT_TYPE_ETC':
      return { ...state, incidentTypeEtc: action.payload }
    case 'SET_INCIDENT_DETAIL':
      return { ...state, incidentTypeDetail: action.payload }
    case 'SET_THREAT_FLAG':
      return { ...state, threatFlag: action.payload }
    case 'SET_CHANNEL_ID':
      return { ...state, channelId: action.payload }
    case 'SET_ORIGIN_TYPE':
      return { ...state, originType: action.payload }
    case 'SET_SHARE_TARGET':
      return { ...state, shareTarget: action.payload }
    case 'SET_SHARE_TARGET_ETC':
      return { ...state, shareTargetEtc: action.payload }
    case 'SET_COL_INFO':
      return { ...state, colInfo: action.payload }
    case 'SET_IMAGE_FLAG':
      return { ...state, imageFlag: action.payload }
    case 'SET_CONTENTS':
      return { ...state, contents: action.payload }
    case 'SET_IND_FLAG':
      return { ...state, indFlag: action.payload }
    case 'SET_TARGET_TYPE':
      return { ...state, targetType: action.payload }
    case 'SET_REPORT_FLAG':
      return { ...state, reportFlag: action.payload }
    case 'SET_SUPPORT_FLAG':
      return { ...state, supportFlag: action.payload }
    case 'SET_REASON':
      return { ...state, reason: action.payload }
    case 'SET_REASON_ETC':
      return { ...state, reasonEtc: action.payload }
    case 'SET_URL':
      return { ...state, url: action.payload }
    case 'SET_DOWNLOAD_URL':
      return { ...state, downloadUrl: action.payload }
    case 'SET_INCIDENT_ID':
      return { ...state, incidentId: action.payload }
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_WRITER':
      return { ...state, writer: action.payload }
    case 'SET_ORIGIN_TYPE_DETAIL':
      return { ...state, originTypeDetail: action.payload }
    case 'SET_HACK_GROUP':
      return { ...state, hackGroup: action.payload }
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload }
    case 'SET_COMMENT':
      return { ...state, comment: action.payload }
    case 'SET_INSTITUTION':
      return { ...state, institution: action.payload }
    default:
      return state
  }
}

export const useTrackingDetailMutation = () => {
  const navigate = useNavigate()

  const initialState: VictimAndResponseType = {
    registrationDate: '', // 등록일시
    publishedDate: '', // 게시일
    incidentType: [], // 사고유형
    threatFlag: '', // 협박유무
    channelId: '', // 채널구분
    originType: '', // 최초인지
    shareTarget: [], // 공유
    shareTargetEtc: '', // 공유 : 기타
    colInfo: '', // 수집정보
    imageFlag: '', // 이미지 유무
    contents: '', // 보고문구
    indFlag: [], // 대상구분
    targetType: '', // 피해 대상
    reportFlag: '', // 침해신고여부
    supportFlag: '', // 기술지원여부
    reason: '', // 거부사유
    reasonEtc: '', // 거부사유 : 기타
    incidentTypeEtc: '', // 기타 사고 유형
    incidentTypeDetail: '', // 사고 상세 정보
    url: '', // URL 정보
    downloadUrl: '', // 다운로드 URL 정보
    title: '', // 제목
    writer: '', // 작성자
    originTypeDetail: '', // 최초 인지 상세 정보
    hackGroup: '', // 해킹 그룹 정보
    keyword: '', // 유출 정보
    comment: '', // 코멘트
    institution: '', // 기관 정보
    incidentId: '', // 사건 ID
    seqidx: 0,
    sourceIdx: 0,
    sourceType: '',
  }

  // 이력대응 관리 전체 상태 관리
  const [state, dispatch] = useReducer(reducer, initialState)

  // 피해대상 관리 저장 리스트
  const [victims, setVictims] = useState<VictimType[]>([])

  // 디스패치 함수 래핑
  const updateState = <T extends Action['type']>(
    type: T,
    payload: Extract<Action, { type: T }>['payload']
  ) => {
    dispatch({ type, payload } as Action)
  }

  // 피해기관 리스트에서 한글로 반환해주는 함수
  const findTargetTypeText = (value: string): string | undefined => {
    if (!value) return undefined
    return (
      targetOptions.find(
        (list: { value: string; label: string }) => list.value === value
      )?.label || ''
    )
  }

  // 피해대상 관리 저장
  const insertVictims = useMutation({
    mutationKey: ['insertVictims'],
    mutationFn: async (data: { issueIdx: number; list: VictimType[] }) => {
      const response = await instance.post('/api/issue/victims/upsert', data)
      return response.data
    },
    onSuccess: (_response: any, variables) => {
      notifySuccess('저장되었습니다.')
      navigate(`/issue/tracking/detail?seqidx=${variables.issueIdx}`)
    },
  })

  // 대응 이력 저장
  const insertResponseIssue = useMutation({
    mutationKey: ['insertResponseIssue'],
    mutationFn: async (data: insertResponseType) => {
      const request = {
        ...data,
        indFlag: data.indFlag.includes('개인') ? 'Y' : 'N',
      }
      if (
        data.registrationDate === '' ||
        data.incidentType.length === 0 ||
        data.channelId === '' ||
        data.originType === '' ||
        data.threatFlag === ''
      ) {
        notifyError('필수 사항을 모두 입력해주세요')
        throw new Error()
      }
      const response = await instance.post('/api/issue/history/upsert', request)
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 401:
            notifyError(
              `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
            )
            setTimeout(() => {
              navigate('/login')
            }, 2000)
            break
          default:
            notifyError(
              `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
            )
        }
      }
    },
    onSuccess: (response) => {
      insertVictims.mutate({ issueIdx: response.seqidx, list: victims })
    },
  })

  // 페이지 이탈
  const handleOnExitPage = () => {
    const isConfirm = confirm(
      '작성 중인 내용이 저장되지 않습니다. 계속하시겠습니까?'
    )
    if (isConfirm) navigate(-1)
  }

  // 피해 대상 생성
  const handleCreateVictims = () => {
    if (!state.targetType || !state.institution) {
      notifyError('모든 필수 항목을 입력해주세요.')
      return
    }
    const request = {
      id: victims.length + 1,
      seqidx: 0,
      registrationDate: state.registrationDate,
      targetType: state.targetType,
      institution: state.institution,
      reportFlag: state.reportFlag,
      incidentId: state.incidentId,
      supportFlag: state.supportFlag,
      reason:
        state.reason === '기타'
          ? `${state.reason}:${state.reasonEtc}`
          : state.reason,
    }

    setVictims((prev) => [...prev, request])

    updateState('SET_TARGET_TYPE', '')
    updateState('SET_INSTITUTION', '')
    updateState('SET_REPORT_FLAG', ' ')
    updateState('SET_INCIDENT_ID', '')
    updateState('SET_SUPPORT_FLAG', ' ')
    updateState('SET_REASON', ' ')
    updateState('SET_REASON_ETC', '')
  }

  // 대상구분이 개인일 경우 빈 리스트 추가
  useEffect(() => {
    if (state.indFlag[0] === '개인') {
      setVictims([
        {
          id: 0,
          seqidx: 0,
          registrationDate: state.registrationDate,
          targetType: 'ind',
          institution: '',
          reportFlag: '',
          incidentId: '',
          supportFlag: '',
          reason: '',
        },
      ])
    }
    if (!state.indFlag.includes('개인') || state.indFlag.length > 1)
      setVictims((prev) => prev.filter((v) => v.id !== 0))
  }, [state])

  return {
    state,
    updateState,
    insertResponseIssue,
    victims,
    setVictims,
    targetOptions,
    findTargetTypeText,
    handleOnExitPage,
    handleCreateVictims,
  }
}
