import { TableColumnsType } from 'antd'

export const Alertcolumn: TableColumnsType = [
  {
    title: '발송시간',
    dataIndex: 'senddate',
    align: 'center',
  },
  {
    title: '발송내용',
    dataIndex: 'contents',
    align: 'center',
  },
  {
    title: '발송 그룹',
    dataIndex: 'groupname',
    align: 'center',
  },
  {
    title: '대상 채널',
    dataIndex: 'target',
    align: 'center',
  },
]
