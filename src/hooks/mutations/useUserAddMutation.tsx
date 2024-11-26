import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import instance from '@/apis/instance.ts'
import { notify } from '@/utils/notify.ts'
import useModal from '@/hooks/common/useModal.tsx'
import { useNavigate } from 'react-router-dom'

// interface UserMutationType {
//   username: string
//   comment: string
// }

export const useUserAddMutation = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { openModal, closeModal, isOpen } = useModal()

  // 그룹 수정 API
  const insertUser = useMutation({
    mutationKey: ['checkAuth'],
    mutationFn: async () => {
      const response = await instance.post('/api/manage/UserInsert')
      return response.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        switch (status) {
          case 401:
            notify(
              `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
            )
            setTimeout(() => {
              navigate('/login')
            }, 3000)
            break

          default:
            notify(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
        }
      }
    },
    onSuccess: () => {
      notify('추가되었습니다.')

      closeModal('insert_user')
      queryClient?.invalidateQueries({ queryKey: ['userList'] })
    },
  })

  // 그룹 추가 => 모달 열림
  const handleOnAddUser = () => {
    openModal('insert_user')
  }

  // 그룹 추가 취소 => 모달 닫힘
  const handleOnAddUserCancel = () => {
    closeModal('insert_user')
  }

  return {
    insertUser,
    handleOnAddUser,
    handleOnAddUserCancel,
    insertUserOpen: isOpen('insert_user'),
  }
}
