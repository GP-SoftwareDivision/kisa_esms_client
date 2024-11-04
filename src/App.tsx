import { Suspense } from 'react'
import { ThemeProvider } from '@emotion/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import instance from './apis/instance.ts'
import { routes } from './routes/routes'
import { theme } from '@/assets/styles/theme.ts'
import Wrapper from '@/layouts/Wrapper'
import LoginPage from '@/pages/user/login.tsx'
import { Loading } from '@/components/elements/Loading.tsx'

// 루트 경로 진입 시 로그인 여부 확인
const checkAuthStatus = async () => {
  const response = await instance.get('/auth')
  return response.data
}

const App = () => {
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
  const RootRoute = () => {
    const { isLoading, data } = useQuery({
      queryKey: ['authStatus'],
      queryFn: checkAuthStatus,
      retry: false,
    })

    if (isLoading) return <Loading />
    if (data?.isLoggedIn) return <Navigate to='/main/dashboard' replace />
    return <Navigate to='/login' replace />
  }

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<RootRoute />} />
              <Route path='/login' element={<LoginPage />} />
              <Route element={<Layout />}>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            </Routes>
          </Suspense>
        </ThemeProvider>
      </Suspense>
    </Router>
  )
}

export default App
