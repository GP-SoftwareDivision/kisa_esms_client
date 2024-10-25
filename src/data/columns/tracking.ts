import { TableColumnsType } from 'antd'

export const issueTrackingcolumns: TableColumnsType = [
  {
    title: 'API 타입',
    dataIndex: 'api_type',
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'title',
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '인지날짜',
    dataIndex: 'write_time',
    align: 'center',
    responsive: ['lg'],
  },
  {
    title: '피해기관',
    dataIndex: 'hacked_organization',
    align: 'center',
  },
  {
    title: '사고유형',
    dataIndex: 'incident_type',
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'response_status',
    align: 'center',
  },
  {
    title: '유출정보',
    dataIndex: 'leaked_data',
    align: 'center',
    responsive: ['lg'],
  },
  {
    title: '대상구분',
    dataIndex: 'target_type',
    align: 'center',
    responsive: ['lg'],
  },
]
