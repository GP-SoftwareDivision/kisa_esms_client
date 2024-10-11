import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const Bar = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    title: {
      text: '유출 사고 유형',
    },
    xaxis: {
      categories: ['정보유출', '서버해킹', '기업/개인', '기타'],
    },
    colors: ['#3366d6', '#71a3f6', '#4285f4', '#d0dffc'],
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'right',
      customLegendItems: ['정보유출', '서버해킹', '기업/개인', '기타'],
      markers: {
        fillColors: ['#3366d6', '#71a3f6', '#4285f4', '#d0dffc'],
      },
    },
  }
  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50],
    },
  ]
  return (
    <ReactApexChart options={options} series={series} type='bar' height={250} />
  )
}
export default Bar
