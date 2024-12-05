import { RouteObject } from 'react-router-dom'
import * as Components from './components'

export const routeConfig: RouteObject[] = [
  { path: '/main/dashboard', element: <Components.MainPage /> },
  { path: '/issue/tracking', element: <Components.Tracking /> },
  {
    path: '/issue/tracking/detail',
    element: <Components.TrackingDetailPage />,
  },
  { path: '/issue/infringement', element: <Components.Infringement /> },
  { path: '/retrieve/darkweb', element: <Components.DarkWeb /> },
  { path: '/retrieve/darkweb/detail', element: <Components.DarkWebDetail /> },
  { path: '/retrieve/telegram', element: <Components.Telegram /> },
  { path: '/manage/user', element: <Components.User /> },
  { path: '/manage/alert', element: <Components.Alert /> },
  { path: '/manage/keyword', element: <Components.Keyword /> },
  { path: '/manage/ruleset', element: <Components.Ruleset /> },
  { path: '/manage/group', element: <Components.Group /> },
  { path: '/manage/server', element: <Components.Server /> },
  { path: '/manage/domain', element: <Components.Domain /> },
  { path: '/manage/searchhistory', element: <Components.SearchHistory /> },
]
