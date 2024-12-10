import React, { Dispatch, memo } from 'react'
import ConfigProvider from 'antd/es/config-provider'
import DatePicker from 'antd/es/date-picker'
import type { RangePickerProps } from 'antd/es/date-picker'
import ko_KR from 'antd/es/locale/ko_KR'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'
import styled from '@emotion/styled'

const { RangePicker } = DatePicker

interface DateRangePickerProps {
  startdate: string
  enddate: string
}

interface DatePickerProps {
  label: string
  date: DateRangePickerProps
  setDate: Dispatch<React.SetStateAction<DateRangePickerProps>>
}

const CustomDatePicker = memo(({ label, date, setDate }: DatePickerProps) => {
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      setDate({ startdate: dateStrings[0], enddate: dateStrings[1] })
    }
  }

  const rangePresets: RangePickerProps['presets'] = [
    { label: '최근 7일', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: '최근 30일', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: '최근 90일', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  // 오늘 이후 선택 못하게
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day')
  }

  return (
    <ConfigProvider locale={ko_KR}>
      <SelectBox>
        <SelectLabel>{label}</SelectLabel>
        <StyledRangePicker
          presets={rangePresets}
          onChange={onRangeChange}
          disabledDate={disabledDate}
          defaultValue={
            date
              ? [dayjs(date.startdate), dayjs(date.enddate)]
              : [dayjs().subtract(7, 'd'), dayjs()]
          }
        />
      </SelectBox>
    </ConfigProvider>
  )
})

CustomDatePicker.displayName = 'CustomDatePicker'

export default CustomDatePicker

const StyledRangePicker = styled(RangePicker)`
  && input {
    ${({ theme }) => theme.typography.body2} !important;
  }
`
