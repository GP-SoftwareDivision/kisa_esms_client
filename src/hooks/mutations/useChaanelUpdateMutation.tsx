import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notifyError, notifySuccess } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 테이블 개별 리스트 타입
export interface ChannelRowType {
  seqidx: number
  domain: string
  firstcrawl: string
  lastcrawl: string
  channelType: string
  channelName: string
  hackGroup: string
  comment: string
}

export const useChannelUpdateMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  const [updateData, setUpdateData] = useState<ChannelRowType>({
    seqidx: 0,
    domain: '',
    firstcrawl: '',
    lastcrawl: '',
    channelType: '',
    channelName: '',
    hackGroup: '',
    comment: '',
  })

  // 채널 수정 API
  const updateChannel = useMutation({
    mutationKey: ['updateChannel'],
    mutationFn: async () => {
      const { domain, firstcrawl, lastcrawl, ...req } = updateData
      const response = await instance.post('/api/manage/channel/update', req)
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
    onSuccess: async () => {
      notifySuccess('수정되었습니다.')
      closeModal('update_channel')
      await queryClient?.invalidateQueries({ queryKey: ['channelList'] })
    },
  })

  // 키워드 수정 => 모달 열림
  const openUpdateChannel = () => {
    openModal('update_channel')
  }

  // 키워드 수정 취소 => 모달 닫힘
  const closeUpdateChannel = () => {
    closeModal('update_channel')
  }

  // textBox 업데이트
  const handleOnUpdateText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      setUpdateData((prev) => ({ ...prev, [id]: value }))
    },
    []
  )

  return {
    updateChannel,
    openUpdateChannel,
    closeUpdateChannel,
    updateChannelOpen: isOpen('update_channel'),
    updateData,
    setUpdateData,
    handleOnUpdateText,
  }
}
