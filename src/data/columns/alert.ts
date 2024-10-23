import { TableColumnsType } from 'antd'

export const column: TableColumnsType = [
  {
    title: '구분',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '카테고리',
    dataIndex: 'category',
    align: 'center',
  },
  {
    title: '키워드',
    dataIndex: 'keyword',
    align: 'center',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    align: 'center',
  },
  {
    title: '제목/채팅방명',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: '내용',
    dataIndex: 'content',
    align: 'center',
  },
  {
    title: '작성일시',
    dataIndex: 'writeTime',
    align: 'center',
  },
]
