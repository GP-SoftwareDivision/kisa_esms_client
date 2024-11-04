import { Suspense } from 'react'
import { ThemeProvider } from '@emotion/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import instance from './apis/instance.ts'
import { routes } from './routes/routes'
import Wrapper from '@/layouts/Wrapper'
import LoginPage from '@/pages/user/login.tsx'
import { theme } from '@/assets/styles/theme.ts'

const checkAuthStatus = async () => {
  const response = await instance.get('/auth')
  return response.data
}

const App = () => {
  // 인증 상태를 확인하는 API 호출 함수
  useQuery({
    queryKey: ['authStatus'],
    queryFn: checkAuthStatus,
    enabled: window.location.pathname === '/',
    retry: false,
  })

  // 로그인 페이지 제외 레이아웃 추가
  const Layout = () => {
    return (
      <>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </>
    )
  }

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <ThemeProvider theme={theme}>
          <Routes>
            {/*<Route path='/' element={<RootRedirect />} />*/}
            <Route path='/login' element={<LoginPage />} />
            <Route element={<Layout />}>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          </Routes>
        </ThemeProvider>
      </Suspense>
    </Router>
  )
}

export default App
