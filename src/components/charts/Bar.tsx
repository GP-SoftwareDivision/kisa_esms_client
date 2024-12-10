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
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
        distributed: true,
      },
    },
    title: {
      text: '유출 사고 유형',
    },
    xaxis: {
      categories: ['정보유출', '서버해킹', '기업/개인', '기타'],
    },
    colors: ['#3366d6', '#4285f4', '#71a3f6', '#d0dffc'],
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'right',
      customLegendItems: ['정보유출', '서버해킹', '기업/개인', '기타'],
      markers: {
        fillColors: ['#3366d6', '#4285f4', '#71a3f6', '#d0dffc'],
      },
    },
  }
  const series = [
    {
      name: '건수',
      data: [30, 40, 35, 50],
    },
  ]
  return (
    <ReactApexChart
      options={options}
      series={series}
      type='bar'
      height={300}
      width={450}
    />
  )
}
export default Bar
