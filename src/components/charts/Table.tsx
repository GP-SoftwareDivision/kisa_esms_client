/** @jsxImportSource @emotion/react */
import React, { Dispatch } from 'react'
import { css } from '@emotion/react'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'

interface TableProps<T extends Record<string, any>> {
  data: T[]
  columns: TableColumnsType
  pagination?: boolean
  pageNum?: number
  setPageNum?: Dispatch<React.SetStateAction<number>>
  total?: number
}

function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  pageNum,
  setPageNum,
  pagination,
  total,
}: TableProps<T>) {
  const tableStyles = css`
    .ant-table-thead > tr > th {
      font-size: 0.875rem;
      line-height: 1.5;
      font-weight: 500;
      padding: 8px 12px;
      font-family: PretendardR, sans-serif !important;
    }

    .ant-table-tbody > tr > td {
      font-size: 0.825rem;
      line-height: 1.5;
      font-weight: 400;
      padding: 12px 12px;
      font-family: PretendardR, sans-serif !important;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `
  // 페이지네이션 이벤트
  const handleOnPaging = (page: number) => {
    if (setPageNum) setPageNum(page)
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={
        pagination
          ? {
              current: pageNum,
              position: ['bottomCenter'],
              total: total,
              pageSize: 15,
              onChange: (page) => handleOnPaging(page),
            }
          : false
      }
      css={tableStyles}
    />
  )
}

export default CustomTable
