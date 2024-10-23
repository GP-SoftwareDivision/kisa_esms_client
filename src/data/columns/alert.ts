import { TableColumnsType } from 'antd'

export const Alertcolumn: TableColumnsType = [
  {
    title: '발송시간',
    dataIndex: 'send_date',
    align: 'center',
  },
  {
    title: '발송내용',
    dataIndex: 'send_content',
    align: 'center',
  },
  {
    title: '발송 그룹',
    dataIndex: 'send_group',
    align: 'center',
  },
  {
    title: '발송 방법',
    dataIndex: 'send_method',
    align: 'center',
  },
  {
    title: '대상 채널',
    dataIndex: 'channel_name',
    align: 'center',
  },
]
