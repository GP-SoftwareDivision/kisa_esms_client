import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const Pie = () => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '대응 현황',
    },
    labels: ['진행중', '대기', '완료'],
    colors: ['#3366d6', '#71a3f6', '#4285f4', '#d0dffc'],
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'right',
      customLegendItems: ['진행중', '대기', '완료'],
      markers: {
        fillColors: ['#3366d6', '#71a3f6', '#4285f4', '#d0dffc'],
      },
    },
  }
  const series = [44, 55, 13]

  return (
    <ReactApexChart
      options={options}
      series={series}
      type='pie'
      height={250}
      width={350}
    />
  )
}
export default Pie
