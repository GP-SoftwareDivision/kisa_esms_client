import { TableColumnsType } from 'antd'

export const InfringementColumns: TableColumnsType = [
  {
    title: '파일형식',
    dataIndex: 'filetype',
    align: 'center',
  },
  {
    title: '파일명',
    dataIndex: 'filename',
    align: 'center',
    width: '20%',
  },
  {
    title: '업로드 날짜',
    dataIndex: 'uploaddate',
    align: 'center',
    responsive: ['lg'],
    width: '15%',
  },
  {
    title: '담당자',
    dataIndex: 'uploader',
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '신규 총 개수',
    dataIndex: 'all_new_cnt',
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '총 개수',
    dataIndex: 'total_count',
    align: 'center',
  },
  {
    title: '대응 여부',
    dataIndex: 'responsestatus',
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '최초 인지',
    dataIndex: 'firstrecognition',
    align: 'center',
    responsive: ['lg'],
  },
]
