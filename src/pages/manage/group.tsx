import { TableColumnsType } from 'antd'
import styled from '@emotion/styled'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'

const Group = () => {
  const columns: TableColumnsType = [
    {
      title: '그룹명',
      dataIndex: 'group',
      align: 'center',
    },
    {
      title: '설명',
      dataIndex: 'comment',
      align: 'center',
    },
    {
      title: '알람방식',
      dataIndex: 'alarm_method',
      align: 'center',
    },
    {
      title: '자동발송여부',
      dataIndex: 'auto_send',
      align: 'center',
    },
    {
      title: '',
      dataIndex: '',
      align: 'center',
      width: '10%',
      render: (_: any, record: any) => (
        <TableButtonWrapper>
          <Button
            type={'download'}
            text={'수정'}
            onClick={() => console.log(record)}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  const data = [
    {
      group: '골든플래닛',
      comment: '-',
      alarm_method: '-',
      auto_send: '자동',
    },
    {
      group: '골든플래닛',
      comment: '-',
      alarm_method: '-',
      auto_send: '자동',
    },
    {
      group: '골든플래닛',
      comment: '-',
      alarm_method: '-',
      auto_send: '자동',
    },
  ]

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'유저 관리'} />
      <ButtonWrapper>
        <Button
          type={'download'}
          onClick={handleOnSelectChange}
          text={'추가'}
        />
      </ButtonWrapper>
      <ContentBox>
        <CustomTable data={data} columns={columns} pagination={true} />
      </ContentBox>
    </ContentContainer>
  )
}
export default Group

const TableButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`
