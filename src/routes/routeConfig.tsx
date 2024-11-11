import { lazy } from 'react'

const MainPage = lazy(() => import('@/pages/main/DashBoardPage.tsx'))
const User = lazy(() => import('@/pages/manage/UserPage.tsx'))
const Tracking = lazy(() => import('@/pages/issue/TrackingPage.tsx'))
const Infringement = lazy(() => import('@/pages/issue/InfringementPage.tsx'))
const DarkWeb = lazy(() => import('@/pages/retrieve/DarkwebPage.tsx'))
const Telegram = lazy(() => import('@/pages/retrieve/TelegramDataPage.tsx'))
const Alert = lazy(() => import('@/pages/main/AlertPage.tsx'))
const Keyword = lazy(() => import('@/pages/manage/KeywordPage.tsx'))
const Ruleset = lazy(() => import('@/pages/manage/RulesetPage.tsx'))
const Group = lazy(() => import('@/pages/manage/GroupPage.tsx'))

export const routeConfig = [
  { path: '/main/dashboard', element: <MainPage /> },
  { path: '/main/alert', element: <Alert /> },
  { path: '/issue/tracking', element: <Tracking /> },
  { path: '/issue/infringement', element: <Infringement /> },
  { path: '/retrieve/darkweb', element: <DarkWeb /> },
  { path: '/retrieve/telegram', element: <Telegram /> },
  { path: '/manage/user', element: <User /> },
  { path: '/manage/keyword', element: <Keyword /> },
  { path: '/manage/ruleset', element: <Ruleset /> },
  { path: '/manage/group', element: <Group /> },
]
