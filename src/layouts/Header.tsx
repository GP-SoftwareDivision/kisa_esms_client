import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import menu from '@/data/menu.json'
import NavBar from '@/components/elements/NavBar.tsx'
import { mq } from '@/utils/mediaQueries.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'

interface UserInfoType {
  name: string
  type: string
}

const Header = () => {
  const navigate = useNavigate()

  // 유저 정보
  const accountInfo = useQueries<{ data: UserInfoType }>({
    queryKey: 'account',
    url: '/api/loginInfo',
    method: 'POST',
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })

  const onSubMenuSelect = (subItemKey: string | null) => {
    // 다크웹 파라미터
    const darkwebParams = new URLSearchParams({
      startdate: dayjs().subtract(14, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
      threatflag: 'Y',
      responseflag: '',
      category: '',
      title: '',
      writer: '',
      keyword: '',
      url: '',
      regex: '',
      re_keyword: '&&:',
      re_title: '&&:',
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
      regex: '',
      page: '1',
      re_channel: '&&:',
      re_contents: '&&:',
      re_username: '&&:',
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
      startdate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
    }).toString()

    // 수집 채널 관리 파라미터
    const ChannelParams = new URLSearchParams({
      page: '1',
      domain: '',
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
