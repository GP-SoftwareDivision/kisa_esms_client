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
}
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
const CustomDatePicker = (props: DatePickerProps) => {
  const { label } = props

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
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
          defaultValue={[dayjs(), dayjs().subtract(7, 'd')]}
        />
      </SelectBox>
    </ConfigProvider>
  )
}

export default CustomDatePicker

const StyledRangePicker = styled(RangePicker)`
  && input {
    ${({ theme }) => theme.typography.body2} !important;
  }
`
