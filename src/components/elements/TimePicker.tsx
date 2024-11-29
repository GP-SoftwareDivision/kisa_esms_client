import { DatePicker } from 'antd'
import styled from '@emotion/styled'
import ko_KR from 'antd/es/locale/ko_KR'
import ConfigProvider from 'antd/es/config-provider'
import 'dayjs/locale/ko'

import { SelectBox } from '@/assets/styles/global.ts'
import React, { Dispatch } from 'react'

interface TimePickerProps {
  setDate?: Dispatch<React.SetStateAction<string>>
}

const CustomTimePicker = (props: TimePickerProps) => {
  const { setDate } = props

  const onOk = (value: string | unknown) => {
    if (value && setDate) {
      setDate(value as string)
    }
  }

  const onChange = (date: string | unknown) => {
    if (date && setDate) {
      setDate(date as string)
    }
  }

  return (
    <ConfigProvider locale={ko_KR}>
      <SelectBox>
        <StyledDatePicker showTime onChange={onChange} onOk={onOk} />
      </SelectBox>
    </ConfigProvider>
  )
}
export default CustomTimePicker

const StyledDatePicker = styled(DatePicker)`
  .ant-picker-input > input {
    ${({ theme }) => theme.typography.body3};
  }
  .ant-picker-suffix {
    ${({ theme }) => theme.typography.body3};
  }
`
