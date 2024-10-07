import MainPage from '@/pages/main'
import User from '@/pages/manage/user'
import History from '@/pages/issue/history'
import DarkWeb from '@/pages/data/darkweb'
import Telegram from '@/pages/data/telegram'
import Alert from '@/pages/manage/alert'
import Keyword from '@/pages/manage/keyword'
import Ruleset from '@/pages/manage/ruleset'
import Schedule from '@/pages/manage/schedule'

export const routes = [
  { path: '/main', element: <MainPage /> },
  { path: '/history', element: <History /> },
  { path: '/darkweb', element: <DarkWeb /> },
  { path: '/telegram', element: <Telegram /> },
  { path: '/user', element: <User /> },
  { path: '/alert', element: <Alert /> },
  { path: '/keyword', element: <Keyword /> },
  { path: '/ruleset', element: <Ruleset /> },
  { path: '/schedule', element: <Schedule /> },
]
