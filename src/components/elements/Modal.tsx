import React from 'react'
import styled from '@emotion/styled'
import { IoMdClose } from 'react-icons/io'

interface ModalType {
  title: string
  isOpen: boolean
  onCancel: () => void
  content?: React.ReactNode
}

const CustomModal = (props: ModalType) => {
  const { title, content, isOpen, onCancel } = props

  return (
    isOpen && (
      <StyledModal>
        <ModalContainer>
          <StyledHeader>
            <span>{title}</span>
            <IoMdClose onClick={() => onCancel()} />
          </StyledHeader>
          <StyledContent>{content}</StyledContent>
        </ModalContainer>
      </StyledModal>
    )
  )
}
export default CustomModal

const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`

const ModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
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
