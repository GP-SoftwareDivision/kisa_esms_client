import { RouteObject } from 'react-router-dom'
import * as Components from './components'

export const routeConfig: RouteObject[] = [
  { path: '/main/dashboard', element: <Components.DashBoardPage /> },
  { path: '/main/monitoring', element: <Components.MonitoringPage /> },

  { path: '/issue/tracking', element: <Components.Tracking /> },
  {
    path: '/issue/tracking/detail',
    element: <Components.TrackingDetailPage />,
  },
  {
    path: '/issue/tracking/detail/form',
    element: <Components.TrackingFormPage />,
  },
  { path: '/issue/infringement', element: <Components.Infringement /> },
  { path: '/issue/damagetarget', element: <Components.DamageTarget /> },
  { path: '/retrieve/darkweb', element: <Components.DarkWeb /> },
  { path: '/retrieve/darkweb/detail', element: <Components.DarkWebDetail /> },
  { path: '/retrieve/telegram', element: <Components.Telegram /> },
  { path: '/retrieve/telegram/detail', element: <Components.TelegramDetail /> },
  { path: '/manage/rulesetkeyword', element: <Components.RuleSetKeyword /> },
  { path: '/manage/channel', element: <Components.Channel /> },
  { path: '/manage/searchhistory', element: <Components.SearchHistory /> },
  { path: '/setting/user', element: <Components.User /> },
  { path: '/setting/alert', element: <Components.Alert /> },
  { path: '/setting/group', element: <Components.Group /> },
  { path: '/setting/server', element: <Components.Server /> },
  { path: '/setting/mypage', element: <Components.MyPage /> },
]
