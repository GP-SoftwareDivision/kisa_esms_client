import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'
import Empty from '@/components/elements/Empty.tsx'

interface PieProps {
  series: number[] | undefined
  categories: string[] | undefined
  loading: boolean
}

const Pie = (props: PieProps) => {
  const { series, categories, loading } = props

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

  // 로딩 중일 때
  if (loading)
    return (
      <>
        <CustomSkeleton lines={1} height={100} />
        <CustomSkeleton lines={4} height={5} />
      </>
    )

  // 데이터 존재하지 않을때
  if (series?.every((num) => num === 0)) return <Empty />
  return (
    <ReactApexChart
      options={options}
      series={series}
      type='pie'
      height={350}
      width={400}
      className='charts-custom'
    />
  )
}
export default Pie
