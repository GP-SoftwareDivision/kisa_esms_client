import React from 'react'
import styled from '@emotion/styled'
import { IoMdClose } from 'react-icons/io'
import { mq } from '@/utils/mediaQueries.ts'

interface ModalType {
  title: string
  isOpen: boolean
  onCancel: () => void
  content?: React.ReactNode
}

const CustomModal = ({ title, content, isOpen, onCancel }: ModalType) => {
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
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`

const ModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 20rem;
  outline: none;
  width: 25rem;

  ${mq.sm} {
    width: auto;
  }
`

const StyledHeader = styled.div`
  height: 40px;
  background-color: #061f5c;
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
  border: 2px solid #061f5c;
`
