import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface PieProps {
  series: number[]
  categories: string[]
}

const Pie = (props: PieProps) => {
  const { series, categories } = props

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: categories,
    colors: [
      '#142956',
      '#1f3d80',
      '#2952ab',
      '#3366d6',
      '#4285f4',
      '#71a3f6',
      '#d0dffc',
      '#d0dffc',
    ],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '10px !important',
      },
      formatter: function (_val: number, opts: any) {
        return `${opts.w.config.labels[opts.seriesIndex]}`
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'right',
      customLegendItems: categories,
      markers: {
        fillColors: [
          '#142956',
          '#1f3d80',
          '#2952ab',
          '#3366d6',
          '#4285f4',
          '#71a3f6',
          '#d0dffc',
          '#d0dffc',
        ],
      },
      formatter: function (legendName: string, opts: any) {
        return `${legendName} ${opts.w.globals.series[opts.seriesIndex]}건`
      },
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type='pie'
      // height={350}
      width={380}
      className='charts-custom'
    />
  )
}
export default Pie
