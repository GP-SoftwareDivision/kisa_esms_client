import { lazy } from 'react'

export const DashBoardPage = lazy(
  () => import('@/pages/main/DashBoardPage.tsx')
)
export const MonitoringPage = lazy(
  () => import('@/pages/main/MonitoringPage.tsx')
)

export const User = lazy(() => import('@/pages/setting/UserPage.tsx'))

export const Tracking = lazy(() => import('@/pages/issue/TrackingPage.tsx'))
export const TrackingDetailPage = lazy(
  () => import('@/pages/issue/TrackingDetailPage.tsx')
)

export const Infringement = lazy(
  () => import('@/pages/issue/InfringementPage.tsx')
)
export const DarkWeb = lazy(() => import('@/pages/retrieve/DarkWebPage.tsx'))
export const DarkWebDetail = lazy(
  () => import('@/pages/retrieve/DarkWebDetailPage.tsx')
)

export const Telegram = lazy(() => import('@/pages/retrieve/TelegramPage.tsx'))
export const TelegramDetail = lazy(
  () => import('@/pages/retrieve/TelegramDetailPage.tsx')
)

export const Alert = lazy(() => import('@/pages/setting/AlertPage.tsx'))
// export const Keyword = lazy(() => import('@/pages/manage/KeywordPage.tsx'))
export const JudgmentKeyword = lazy(
  () => import('@/pages/manage/JudgmentKeywordPage.tsx')
)
export const Group = lazy(() => import('@/pages/setting/GroupPage.tsx'))
export const Server = lazy(() => import('@/pages/setting/ServerPage.tsx'))
export const Channel = lazy(() => import('@/pages/manage/ChannelPage.tsx'))
export const SearchHistory = lazy(
  () => import('@/pages/manage/SearchHistoryPage.tsx')
)
