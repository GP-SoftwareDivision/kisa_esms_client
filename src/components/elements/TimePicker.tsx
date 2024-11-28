import { DatePicker, DatePickerProps } from 'antd'
import ko_KR from 'antd/es/locale/ko_KR'
import ConfigProvider from 'antd/es/config-provider'
import 'dayjs/locale/ko'

import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'
import React, { Dispatch } from 'react'

interface TimePickerProps {
  label: string
  setDate?: Dispatch<React.SetStateAction<DatePickerProps['value']>>
}

const CustomTimePicker = (props: TimePickerProps) => {
  const { label, setDate } = props

  const onOk = (value: DatePickerProps['value']) => {
    if (setDate) setDate(value)
  }

  return (
    <ConfigProvider locale={ko_KR}>
      <SelectBox>
        <SelectLabel>{label}</SelectLabel>
        <DatePicker
          showTime
          onChange={(value) => setDate && setDate(value)}
          onOk={onOk}
        />
      </SelectBox>
    </ConfigProvider>
  )
}
export default CustomTimePicker
