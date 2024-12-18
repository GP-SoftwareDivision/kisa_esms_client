import { DatePicker } from 'antd'
import styled from '@emotion/styled'
import ko_KR from 'antd/es/locale/ko_KR'
import ConfigProvider from 'antd/es/config-provider'
import 'dayjs/locale/ko'

import { SelectBox } from '@/assets/styles/global.ts'
import React, { Dispatch } from 'react'
import dayjs from 'dayjs'

interface TimePickerProps {
  date: string
  setDate: Dispatch<React.SetStateAction<string>>
}

const CustomTimePicker = (props: TimePickerProps) => {
  const { date, setDate } = props

  const onChange = (date: any) => {
    if (date && setDate) {
      setDate(dayjs(date).format('YYYY-MM-DD'))
    }
  }

  return (
    <ConfigProvider locale={ko_KR}>
      <SelectBox>
        <StyledDatePicker
          onChange={onChange}
          value={dayjs(date).isValid() ? dayjs(date) : undefined}
        />
      </SelectBox>
    </ConfigProvider>
  )
}
export default CustomTimePicker

const StyledDatePicker = styled(DatePicker)`
  .ant-picker-input > input {
    ${({ theme }) => theme.typography.body3};
  }
`
