import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import instance from '@/apis/instance.ts'

// 피해 대상 타입
export interface VictimType {
  seqidx?: number
  registrationDate: string
  targetType: string
  institution: string
  reportFlag: string
  incidentId: string
  supportFlag: string
  reason: string
}

// 이슈 대응 타입
export interface insertResponseType {
  registrationDate: string
  incidentType: string
  incidentTypeDetail: string
  threatFlag: string
  channelId: number
  url: string
  downloadUrl: string
  title: string
  writer: string
  publishedDate: string
  originType: string
  originTypeDetail: string
  shareTarget: string
  colInfo: string
  imageFlag: string
  contents: string
  hackGroup: string
  leakedInfo: string
  comment: string
  indFlag: string
}

interface InsertVictimsRequestType {
  issueIdx: number
  list: VictimType[]
}

export const useResponseAddMutation = () => {
  const navigate = useNavigate()

  // 피해대상 관리 저장 리스트
  const [victims, setVictims] = useState<VictimType[]>([])

  // 피해 대상 리스트
  const targetList = [
    { value: 'company', label: '기업(민간)' },
    { value: 'pub', label: '공공' },
    { value: 'edu', label: '교육' },
    { value: 'fin', label: '금융' },
    { value: 'med', label: '의료' },
    { value: 'other', label: '기타(해외)' },
  ]

  // 피해기관 리스트에서 한글로 반환해주는 함수
  const findTargetTypeText = (value: string): string | undefined => {
    if (!value) return undefined
    return (
      targetList.find(
        (list: { value: string; label: string }) => list.value === value
      )?.label || ''
    )
  }

  // 피해대상 관리 저장
  const insertVictims = useMutation({
    mutationKey: ['insertVictims'],
    mutationFn: async (data: InsertVictimsRequestType) => {
      const response = await instance.post('/api/issue/victims/insert', data)
      return response.data
    },
    onSuccess: () => {
      notifySuccess('저장되었습니다.')
    },
  })

  // 대응 이력 저장
  const insertResponseIssue = useMutation({
    mutationKey: ['insertResponseIssue'],
    mutationFn: async (data: insertResponseType) => {
      if (
        data.registrationDate === '' ||
        (data.indFlag === 'N' && victims.length === 0) ||
        data.incidentType === '' ||
        data.channelId === 0 ||
        data.originType === '' ||
        data.threatFlag === ''
      ) {
        notifyError('필수 사항을 모두 입력해주세요')
        throw new Error()
      }
      const response = await instance.post('/api/issue/history/insert', data)
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

  return {
    insertResponseIssue,
    victims,
    setVictims,
    targetList,
    findTargetTypeText,
  }
}
