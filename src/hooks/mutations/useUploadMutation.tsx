import useModal from '@/hooks/common/useModal.tsx'

const useUploadMutation = () => {
  const { openModal, closeModal, isOpen } = useModal()

  // 키워드 추가 => 모달 열림
  const openInsertUpload = () => {
    openModal('insert_upload')
  }

  // 키워드 추가 취소 => 모달 닫힘
  const closeInsertUpload = () => {
    closeModal('insert_upload')
  }

  return {
    openInsertUpload,
    closeInsertUpload,
    insertUploadOpen: isOpen('insert_upload'),
  }
}

export default useUploadMutation
