import { lazy } from 'react'

export const MainPage = lazy(() => import('@/pages/main/DashBoardPage.tsx'))
export const User = lazy(() => import('@/pages/manage/UserPage.tsx'))

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

export const Telegram = lazy(
  () => import('@/pages/retrieve/TelegramDataPage.tsx')
)
export const Alert = lazy(() => import('@/pages/main/AlertPage.tsx'))
export const Keyword = lazy(() => import('@/pages/manage/KeywordPage.tsx'))
export const Ruleset = lazy(() => import('@/pages/manage/RulesetPage.tsx'))
export const Group = lazy(() => import('@/pages/manage/GroupPage.tsx'))
export const Server = lazy(() => import('@/pages/manage/ServerPage.tsx'))
export const Domain = lazy(() => import('@/pages/manage/DomainPage.tsx'))
export const SearchHistory = lazy(
  () => import('@/pages/manage/SearchHistoryPage.tsx')
)
