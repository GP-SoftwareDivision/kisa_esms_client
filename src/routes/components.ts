import { lazy } from 'react'

// 메인
export const DashBoardPage = lazy(
  () => import('@/pages/main/DashBoardPage.tsx')
)
export const MonitoringPage = lazy(
  () => import('@/pages/main/MonitoringPage.tsx')
)

// 데이터 조회

export const DarkWeb = lazy(() => import('@/pages/retrieve/DarkWebPage.tsx'))
export const DarkWebDetail = lazy(
  () => import('@/pages/retrieve/DarkWebDetailPage.tsx')
)

export const Telegram = lazy(() => import('@/pages/retrieve/TelegramPage.tsx'))
export const TelegramDetail = lazy(
  () => import('@/pages/retrieve/TelegramDetailPage.tsx')
)

// 이력 관리
export const Tracking = lazy(() => import('@/pages/issue/TrackingPage.tsx'))
export const TrackingDetailPage = lazy(
  () => import('@/pages/issue/TrackingDetailPage.tsx')
)
export const TrackingFormPage = lazy(
  () => import('@/pages/issue/TrackingFormPage.tsx')
)
export const Infringement = lazy(
  () => import('@/pages/issue/InfringementPage.tsx')
)
export const DamageTarget = lazy(
  () => import('@/pages/issue/DamageTargetPage.tsx')
)

// 관리
export const RuleSetKeyword = lazy(
  () => import('@/pages/manage/RuleSetKeywordPage.tsx')
)
export const Channel = lazy(() => import('@/pages/manage/ChannelPage.tsx'))
export const SearchHistory = lazy(
  () => import('@/pages/manage/SearchHistoryPage.tsx')
)

// 설정 : 관리자
export const Alert = lazy(() => import('@/pages/setting/AlertPage.tsx'))
export const User = lazy(() => import('@/pages/setting/UserPage.tsx'))
export const Group = lazy(() => import('@/pages/setting/GroupPage.tsx'))
export const Server = lazy(() => import('@/pages/setting/ServerPage.tsx'))

// 설정 : 일반 사용자
export const MyPage = lazy(() => import('@/pages/setting/MyPage.tsx'))
