import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
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
import dayjs from 'dayjs'

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

  const targetList = [
    // { value: '', label: '전체' },
    { value: 'ind', label: '개인' },
    { value: 'company', label: '기업' },
    { value: 'pub', label: '공공' },
    { value: 'edu', label: '교육' },
    { value: 'fin', label: '금융' },
    { value: 'med', label: '의료' },
    { value: 'other', label: '기타(해외)' },
  ]

  // 조회기간
  const [date, setDate] = useState({
    startdate: dayjs().subtract(7, 'd').format('YYYY-MM-DD'),
    enddate: dayjs().format('YYYY-MM-DD'),
  })

  // 대상 구분 / 사고 유형 / 채널 구분 / 최초 인지
  const [selectFields, setSelectFields] = useState({
    targetType: '',
    incidentType: '',
    apiType: '',
    originType: '',
  })

  // 요청 파라미터
  const [request, setRequest] = useState({
    startdate: date.startdate,
    enddate: date.enddate,
    institution: '',
    channelName: '',
    ...selectFields,
  })

  // 조회 이벤트
  const handleOnClick = () => {
    setRequest({
      startdate: date.startdate,
      enddate: date.enddate,
      institution: fields.institution || '',
      channelName: fields.channelName || '',
      ...selectFields,
    })
  }

  // 이슈 대응 이력 리스트 API
  const responseList = useQueries<{ data: ResponseListType[] }>({
    queryKey: `responseList`,
    method: 'POST',
    url: `/api/issue/history`,
    body: { type: 'I', page: page, ...request },
  })

  // 셀렉트 박스 옵션 변경 이벤트
  const handleSelectChange = (field: string, value: any) => {
    setSelectFields((prev) => ({ ...prev, [field]: value }))
  }

  // 테이블 컬럼
  const responseListColumns = [
    {
      header: '등록일시',
      accessorKey: 'registrationDate',
    },
    {
      header: '대상구분',
      accessorKey: 'targetType',
      cell: ({ row }: any) => {
        const matching = targetList
          .filter((item) =>
            row.original.targetType.split('/').includes(item.value)
          )
          .map((item) => item.label)
        return matching.join('/')
      },
    },
    {
      header: '피해기관',
      accessorKey: 'institution',
    },
    {
      header: '사고유형',
      accessorKey: 'incidentType',
    },
    {
      header: '채널구분',
      accessorKey: 'domainType',
      cell: ({ row }: any) =>
        row.original.domainType === 'dt' ? (
          <span>다크웹</span>
        ) : (
          <span>텔레그램</span>
        ),
    },
    {
      header: '채널명',
      accessorKey: 'channelName',
    },
    {
      header: '최초인지',
      accessorKey: 'originType',
    },
    {
      header: '업로드',
      accessorKey: '',
      id: 'actions',
      cell: () => (
        <Box display={'flex'} justifyContent={'center'}>
          <Button type={'outline'} text={'파일선택'} onClick={() => {}} />
        </Box>
      ),
    },
  ]

  return (
    <ContentContainer>
      <PageTitle
        text={'대응 이력'}
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
            options={targetList}
            value={selectFields.targetType}
            setState={(value) => handleSelectChange('targetType', value)}
          />
        </Box>
        <Box>
          <CustomInput
            id={'institution'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={fields.institution}
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
            value={fields.apiType}
            setState={(value) => handleSelectChange('apiType', value)}
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
            value={selectFields.originType}
            setState={(value) => handleSelectChange('originType', value)}
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
          detailIdx={'issueIdx'}
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
