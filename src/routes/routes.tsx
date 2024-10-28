import { lazy } from 'react'

const MainPage = lazy(() => import('@/pages/main/dashboard.tsx'))
const User = lazy(() => import('@/pages/manage/user'))
const Tracking = lazy(() => import('@/pages/issue/tracking'))
const Infringement = lazy(() => import('@/pages/issue/Infringement.tsx'))
const DarkWeb = lazy(() => import('@/pages/retrieve/darkweb'))
const Telegram = lazy(() => import('@/pages/retrieve/telegram'))
const Alert = lazy(() => import('@/pages/main/alert.tsx'))
const Keyword = lazy(() => import('@/pages/manage/keyword'))
const Ruleset = lazy(() => import('@/pages/manage/ruleset'))
const Group = lazy(() => import('@/pages/manage/group.tsx'))

export const routes = [
  { path: '/main/dashboard', element: <MainPage /> },
  { path: '/main/alert', element: <Alert /> },
  { path: '/issue/tracking', element: <Tracking /> },
  { path: '/issue/Infringement', element: <Infringement /> },
  { path: '/retrieve/darkweb', element: <DarkWeb /> },
  { path: '/retrieve/telegram', element: <Telegram /> },
  { path: '/manage/user', element: <User /> },
  { path: '/manage/keyword', element: <Keyword /> },
  { path: '/manage/ruleset', element: <Ruleset /> },
  { path: '/manage/group', element: <Group /> },
]
