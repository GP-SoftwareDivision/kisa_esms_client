import styled from '@emotion/styled'
// import { Modal, Button } from 'antd'
import Modal from '@mui/material/Modal'
import { IoMdClose } from 'react-icons/io'

interface Modal {
  title: string
  isOpen: boolean
  onOk?: () => void
  onCancel: () => void
  content: React.ReactNode
}

const CustomModal = (props: Modal) => {
  const { title, content, isOpen, onOk, onCancel } = props

  return (
    <Modal
      open={isOpen!}
      onClose={onCancel}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <ModalContainer>
        <StyledHeader>
          <span>{title}</span>
          <IoMdClose onClick={() => onCancel()} />
        </StyledHeader>
        <StyledContent>{content}</StyledContent>
      </ModalContainer>
    </Modal>
  )
}
export default CustomModal

const ModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  outline: none;
`

const StyledHeader = styled.div`
  height: 40px;
  background-color: #004d9f;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  svg {
    cursor: pointer;
  }
`

const StyledContent = styled.div`
  background-color: #fff;
  border: 2px solid #004d9f;
`
