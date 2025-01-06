import { DatePicker } from 'antd'
import styled from '@emotion/styled'
import ko_KR from 'antd/es/locale/ko_KR'
import ConfigProvider from 'antd/es/config-provider'
import 'dayjs/locale/ko'

import { SelectBox } from '@/assets/styles/global.ts'
import dayjs from 'dayjs'

interface TimePickerProps {
  date: string
  onChange: (date: unknown, dateString: string | string[]) => void
}

const CustomTimePicker = (props: TimePickerProps) => {
  const { date, onChange } = props

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
