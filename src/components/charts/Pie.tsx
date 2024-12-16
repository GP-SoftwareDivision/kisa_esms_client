import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const Pie = () => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    // title: {
    //   text: '대응 현황',
    // },
    labels: ['개인', '기업', '공공', '교육', '금융', '의료', '기타'],
    colors: [
      '#142956',
      '#1f3d80',
      '#2952ab',
      '#3366d6',
      '#4285f4',
      '#71a3f6',
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
      customLegendItems: [
        '개인',
        '기업',
        '공공',
        '교육',
        '금융',
        '의료',
        '기타(해외)',
      ],
      markers: {
        fillColors: [
          '#142956',
          '#1f3d80',
          '#2952ab',
          '#3366d6',
          '#4285f4',
          '#71a3f6',
          '#d0dffc',
        ],
      },
      formatter: function (legendName: string, opts: any) {
        return `${legendName} ${opts.w.globals.series[opts.seriesIndex]}건`
      },
    },
  }
  const series = [48, 30, 28, 20, 15, 9, 7]

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
