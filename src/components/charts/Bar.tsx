import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface BarProps {
  series: number[]
  categories: string[]
}

const Bar = (props: BarProps) => {
  const { series, categories } = props

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
    xaxis: {
      categories: categories,
    },
    dataLabels: {
      enabled: false,
    },
    colors: [
      '#142956',
      '#1f3d80',
      '#103d73',
      '#204c91',
      '#2952ab',
      '#3366d6',
      '#3a76cc',
      '#4285f4',
      '#71a3f6',
      '#8fb3f9',
      '#d0dffc',
    ],
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'right',
      formatter: function (legendName: string, opts: any) {
        return `${legendName} ${opts.w.globals.stackedSeriesTotals[opts.seriesIndex]}건`
      },
      customLegendItems: [
        '정보유출',
        '정보유출(협박)',
        '공격예고(협박)',
        'DDos',
        '랜섬웨어',
        '웹변조',
        '취약점',
        '정보노출',
        '확인불가',
        '기타해킹',
        '기타',
      ],
      markers: {
        fillColors: [
          '#142956',
          '#1f3d80',
          '#103d73',
          '#204c91',
          '#2952ab',
          '#3366d6',
          '#3a76cc',
          '#4285f4',
          '#71a3f6',
          '#8fb3f9',
          '#d0dffc',
        ],
      },
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={[
        {
          name: '건수',
          data: series,
        },
      ]}
      type='bar'
      // height={350}
      width={420}
      className='charts-custom'
    />
  )
}
export default Bar
