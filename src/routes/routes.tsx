import MainPage from '@/pages/main'
import User from '@/pages/manage/user'
import History from '@/pages/issue/responseHistory'
import DarkWeb from '@/pages/dataLookup/darkweb'
import Telegram from '@/pages/dataLookup/telegram'
import Alert from '@/pages/manage/alert'
import Keyword from '@/pages/manage/keyword'
import Ruleset from '@/pages/manage/ruleset'
import Schedule from '@/pages/manage/schedule'

export const routes = [
  { path: '/main', element: <MainPage /> },
  { path: '/responseHistory', element: <History /> },
  { path: '/darkweb', element: <DarkWeb /> },
  { path: '/telegram', element: <Telegram /> },
  { path: '/user', element: <User /> },
  { path: '/alert', element: <Alert /> },
  { path: '/keyword', element: <Keyword /> },
  { path: '/ruleset', element: <Ruleset /> },
  { path: '/schedule', element: <Schedule /> },
]
