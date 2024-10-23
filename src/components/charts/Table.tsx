/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'

interface TableProps<T extends Record<string, any>> {
  data: T[]
  columns: TableColumnsType
  pagination: boolean
}

function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  pagination,
}: TableProps<T>) {
  const tableStyles = css`
    .ant-table-thead > tr > th {
      font-size: 0.875rem;
      line-height: 1.5;
      font-weight: 500;
      padding: 8px 12px;
      font-family: 'PretendardR', sans-serif !important;
    }

    .ant-table-tbody > tr > td {
      font-size: 0.825rem;
      line-height: 1.5;
      font-weight: 400;
      padding: 12px 12px;
      font-family: 'PretendardR', sans-serif !important;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination ? { position: ['bottomCenter'] } : false}
      css={tableStyles}
    />
  )
}

export default CustomTable

// 15개
// default date => 1주일
