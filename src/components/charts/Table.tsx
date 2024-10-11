import { Table } from 'antd'
import type { TableColumnsType } from 'antd'

interface TableProps<T extends Record<string, any>> {
  data: T[]
  columns: TableColumnsType
}

function CustomTable<T extends Record<string, any>>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ['bottomCenter'] }}
      className='custom-table'
    />
  )
}

export default CustomTable
