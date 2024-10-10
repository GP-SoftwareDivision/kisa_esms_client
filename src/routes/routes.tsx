import { lazy } from 'react'

const MainPage = lazy(() => import('@/pages/main'))
const User = lazy(() => import('@/pages/manage/user'))
const Tracking = lazy(() => import('@/pages/issue/tracking'))
const DarkWeb = lazy(() => import('@/pages/retrieve/darkweb'))
const Telegram = lazy(() => import('@/pages/retrieve/telegram'))
const Alert = lazy(() => import('@/pages/manage/alert'))
const Keyword = lazy(() => import('@/pages/manage/keyword'))
const Ruleset = lazy(() => import('@/pages/manage/ruleset'))
const Schedule = lazy(() => import('@/pages/manage/schedule'))

export const routes = [
  { path: '/main', element: <MainPage /> },
  { path: '/tracking', element: <Tracking /> },
  { path: '/darkweb', element: <DarkWeb /> },
  { path: '/telegram', element: <Telegram /> },
  { path: '/user', element: <User /> },
  { path: '/alert', element: <Alert /> },
  { path: '/keyword', element: <Keyword /> },
  { path: '/ruleset', element: <Ruleset /> },
  { path: '/schedule', element: <Schedule /> },
]
