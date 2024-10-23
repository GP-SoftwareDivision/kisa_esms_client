import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import { Alertcolumn } from '@/data/columns/alert.ts'

const Alert = () => {
  const data = [
    {
      send_date: '2024-02-04 09:12:44',
      send_content: 'Terminal High Altitude Area Defense - The Hidden Wiki',
      send_group: '키사',
      send_method: '자동',
      channel_name: '텔레그램',
    },
    {
      send_date: '2024-02-04 09:12:44',
      send_content: 'Terminal High Altitude Area Defense - The Hidden Wiki',
      send_group: '키사',
      send_method: '자동',
      channel_name: '텔레그램',
    },
    {
      send_date: '2024-02-04 09:12:44',
      send_content: 'Terminal High Altitude Area Defense - The Hidden Wiki',
      send_group: '키사',
      send_method: '자동',
      channel_name: '텔레그램',
    },
  ]

  return (
    <>
      <ContentContainer>
        <PageTitle text={'알림 내역'} />
        <ContentBox>
          <CustomTable data={data} columns={Alertcolumn} pagination={true} />
        </ContentBox>
      </ContentContainer>
    </>
  )
}
export default Alert
