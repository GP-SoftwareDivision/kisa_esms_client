import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'

import instance from '../apis/instance.ts'
import menu from '@/data/menu.json'
import NavBar from '@/components/elements/NavBar.tsx'
import { mq } from '@/utils/mediaQueries.ts'
import { notifyError } from '@/utils/notify.ts'

interface UserInfoType {
  name: string
  type: string
}

const Header = () => {
  const navigate = useNavigate()

  // 유저 정보
  const accountInfo = useQuery<{ data: UserInfoType }>({
    queryKey: ['account'],
    queryFn: async () => {
      try {
        const response = await instance.post('/api/loginInfo')
        return response.data
      } catch (error) {
        console.error(error)
        notifyError(
          `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
        )
      }
    },
    staleTime: 60000,
    gcTime: 10 * 60000, // 10분 동안 캐시 유지
  })

  const onSubMenuSelect = (subItemKey: string | null) => {
    // 다크웹 파라미터
    const darkwebParams = new URLSearchParams({
      startdate: dayjs().subtract(14, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
      threatflag: 'Y',
      category: '',
      keyword: '',
      writer: '',
      re_keyword: '',
      title: '',
      re_title: '',
      url: '',
      responseflag: '',
      regex: '',
      page: '1',
    }).toString()

    // 텔레그램 파라미터
    const telegramParams = new URLSearchParams({
      startdate: dayjs().subtract(14, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
      threatflag: 'Y',
      username: '',
      channel: '',
      contents: '',
      responseflag: '',
      page: '1',
      re_channel: '',
      re_contents: '',
      regex: '',
      re_username: '',
    }).toString()

    // 대응 이력 파라미터
    const trackingParams = new URLSearchParams({
      type: 'I',
      page: '1',
      startdate: dayjs().subtract(14, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
      institution: '',
      channelName: '',
      targetType: '',
      incidentType: '',
      apiType: '',
      originType: '',
      keyword: '',
    }).toString()

    // 피해 대상 관리 파라미터
    const DamageTargetParams = new URLSearchParams({
      page: '1',
      startdate: dayjs().subtract(14, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
      targetType: '',
      reportFlag: '',
      supportFlag: '',
      institution: '',
    }).toString()

    // 유출 정보 판별 파라미터
    const InfringementParams = new URLSearchParams({
      page: '1',
      startdate: dayjs().subtract(14, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
    }).toString()

    // 유출 정보 판별 파라미터
    const ChannelParams = new URLSearchParams({
      page: '1',
      channelName: '',
    }).toString()

    if (subItemKey) {
      const pathName = subItemKey.split('/')[1]
      // 다크웹
      if (pathName === 'darkweb') navigate(`/${subItemKey}?${darkwebParams}`)
      // 텔레그램
      else if (pathName === 'telegram')
        navigate(`/${subItemKey}?${telegramParams}`)
      // 메인 - 모니터링
      else if (pathName === 'monitoring')
        navigate(`/${subItemKey}?type=darkweb`)
      // 이력관리 - 대응이력
      else if (pathName === 'tracking')
        navigate(`/${subItemKey}?${trackingParams}`)
      // 이력관리 - 피해대상관리
      else if (pathName === 'damagetarget')
        navigate(`/${subItemKey}?${DamageTargetParams}`)
      // 이력관리 - 유출정보판별
      else if (pathName === 'infringement')
        navigate(`/${subItemKey}?${InfringementParams}`)
      // 관리 - 수집 채널 관리
      else if (pathName === 'channel')
        navigate(`/${subItemKey}?${ChannelParams}`)
      else navigate(`/${subItemKey}`)
    }
  }

  return (
    <HeaderContainer>
      <NavBar
        menus={
          accountInfo.data?.data.type === 'administrator'
            ? menu.admin
            : menu.user
        }
        onSubMenuSelect={onSubMenuSelect}
        account={accountInfo.data?.data}
      />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  //border-bottom: 1px solid #f5f5f5;
  //box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  z-index: 1;

  ${mq.sm} {
    padding-top: 0.5rem;
  }
`
