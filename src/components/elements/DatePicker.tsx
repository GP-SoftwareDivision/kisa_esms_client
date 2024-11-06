import React, { Dispatch, memo } from 'react'
import type { GetProps, TimeRangePickerProps } from 'antd'
import { DatePicker, ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/ko_KR'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import { SelectBox, SelectLabel } from '@/assets/styles/global.ts'
import styled from '@emotion/styled'

const { RangePicker } = DatePicker

interface DatePickerProps {
  label: string
  setDate?: Dispatch<React.SetStateAction<{ start: string; end: string }>>
}
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

const CustomDatePicker = memo((props: DatePickerProps) => {
  const { label, setDate } = props
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates && setDate) {
      setDate({ start: dateStrings[0], end: dateStrings[1] })
    } else {
      console.log('Clear')
    }
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: '최근 7일', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: '최근 30일', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: '최근 90일', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  // 오늘 이후 선택 못하게
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day')
  }

  return (
    <ConfigProvider locale={locale}>
      <SelectBox>
        <SelectLabel>{label}</SelectLabel>
        <StyledRangePicker
          presets={rangePresets}
          onChange={onRangeChange}
          disabledDate={disabledDate}
          defaultValue={[dayjs().subtract(7, 'd'), dayjs()]}
        />
      </SelectBox>
    </ConfigProvider>
  )
})

export default CustomDatePicker

const StyledRangePicker = styled(RangePicker)`
  && input {
    ${({ theme }) => theme.typography.body2} !important;
  }
`
