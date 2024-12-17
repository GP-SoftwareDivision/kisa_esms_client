import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { responseListColumns } from '@/constants/tableColumns.ts'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import Button from '@/components/elements/Button.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'

// 대응 이력 현황 타입 정의
interface ResponseListType {
  seqidx: number
  regdate: string
  targettype: string
  hackedorganization: string
  incidenttype: string
  channeltype: string
  darktelegramname: string
  firstrecogition: string
}

const TrackingPage = () => {
  const navigate = useNavigate()
  const { page, handlePageChange } = usePagination(1)

  const { fields, handleOnChange } = useForm()

  // 조회기간
  const [date, setDate] = useState({
    startdate: '2024-12-03',
    enddate: '2024-12-03',
  })

  // 대상 구분 / 사고 유형 / 채널 구분 / 최초 인지
  const [selectFields, setSelectFields] = useState({
    targetType: '',
    incidentType: '',
    channelType: '',
    firstRecognition: '',
  })

  // 요청 파라미터
  const [request, setRequest] = useState({
    startdate: date.startdate,
    enddate: date.enddate,
    ...selectFields,
    ...fields,
  })

  // 이슈 대응 이력 리스트 API
  const responseList = useQueries<{ data: ResponseListType[] }>({
    queryKey: `responseList`,
    method: 'POST',
    url: `/api/issue/history`,
    body: { ...request, page: page },
  })

  // 조회 이벤트
  const handleOnClick = () => {
    setRequest({
      startdate: date.startdate,
      enddate: date.enddate,
      ...selectFields,
      ...fields,
    })
  }

  // 셀렉트 박스 옵션 변경 이벤트
  const handleSelectChange = (field: string, value: any) => {
    setSelectFields((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <ContentContainer>
      <PageTitle
        text={'이슈 대응 이력'}
        children={
          <ButtonContainer>
            <Button
              type={'tertiary'}
              onClick={() => navigate('detail')}
              text={'추가'}
            />
            <Button
              type={'secondary'}
              onClick={handleOnClick}
              text={'엑셀 다운로드'}
            />
          </ButtonContainer>
        }
      />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회기간'} date={date} setDate={setDate} />
        </Box>
        <Box>
          <CustomSelect
            label={'대상구분'}
            options={[
              { value: '', label: '전체' },
              { value: '개인', label: '개인' },
              { value: '기업', label: '기업' },
              { value: '협회', label: '협회' },
              { value: '공공', label: '공공' },
              { value: '교육', label: '교육' },
              { value: '금융', label: '금융' },
              { value: '의료', label: '의료' },
              { value: '기타', label: '기타' },
            ]}
            value={selectFields.targetType}
            setState={(value) => handleSelectChange('targetType', value)}
          />
        </Box>
        <Box>
          <CustomInput
            id={'hackedOrganization'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={fields.hackedOrganization}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'사고유형'}
            options={[
              { value: '', label: '전체' },
              { value: '정보유출', label: '정보유출' },
              { value: '공격예고', label: '공격예고' },
              { value: 'DDoS', label: 'DDoS' },
              { value: '랜섬웨어', label: '랜섬웨어' },
              { value: '웹변조', label: '웹변조' },
              { value: '취약점', label: '취약점' },
              { value: '정보노출', label: '정보노출' },
              { value: '기타해킹', label: '기타해킹' },
              { value: '확인불가', label: '확인불가' },
              { value: '기타', label: '기타' },
            ]}
            value={selectFields.incidentType}
            setState={(value) => handleSelectChange('incidentType', value)}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'채널구분'}
            options={[
              { value: '', label: '전체' },
              { value: '다크웹', label: '다크웹' },
              { value: '해킹포럼', label: '해킹포럼' },
              { value: '텔레그램', label: '텔레그램' },
              { value: 'SNS', label: 'SNS' },
              { value: '블로그', label: '블로그' },
              { value: '기타', label: '기타' },
            ]}
            value={fields.channelType}
            setState={(value) => handleSelectChange('channelType', value)}
          />
        </Box>
        <Box>
          <CustomInput
            id={'channelName'}
            label={'채널명'}
            placeholder={'내용을 입력하세요.'}
            value={fields.channelName}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'최초인지'}
            options={[
              { value: '', label: '전체' },
              { value: '자체탐지', label: '자체탐지' },
              { value: 'S2W', label: 'S2W' },
              { value: '금융보안원', label: '금융보안원' },
              { value: '경찰청', label: '경찰청' },
              { value: '언론보도', label: '언론보도' },
              { value: '기타', label: '기타' },
            ]}
            value={selectFields.firstRecognition}
            setState={(value) => handleSelectChange('firstRecognition', value)}
          />
        </Box>
        <ButtonContainer>
          <Button type={'primary'} onClick={handleOnClick} text={'조회'} />
        </ButtonContainer>
      </SelectContainer>
      <ContentBox mt={4}>
        <CustomTable
          loading={false}
          data={responseList.data?.data ? responseList.data?.data : []}
          columns={responseListColumns}
        />
        <CustomPagination
          total={1}
          page={page}
          handlePageChange={(newPage) => handlePageChange(newPage as number)}
        />
      </ContentBox>
    </ContentContainer>
  )
}
export default TrackingPage
