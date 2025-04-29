import { Suspense } from 'react'
import { ThemeProvider } from '@emotion/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom'
import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from '@tanstack/react-query'

import { routeConfig } from './routes/routeConfig.tsx'
import instance from '@/apis/instance.ts'
import { theme } from '@/assets/styles/theme.ts'
import { Loading } from '@/components/elements/Loading.tsx'
import Wrapper from '@/layouts/Wrapper'
import ErrorPage from '@/pages/ErrorPage.tsx'
import LoginPage from '@/pages/LoginPage.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

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

  // 루트 경로 진입 시 로그인 여부 확인 후 페이지 라우팅 처리
  const RootRoute = () => {
    const checkAuthStatus = async () => {
      const response = await instance.get('/auth')
      return response.data
    }

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster
          position='bottom-center'
          reverseOrder={false}
          gutter={16}
          containerStyle={{ bottom: '50px' }}

          toastOptions={{
            // Define default options
            className: 'toast',
            duration: 5000,
            removeDelay: 10000,

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#5bac73',
                secondary: 'white',
              },
            },
          }}
        />
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<RootRoute />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path='/error' element={<ErrorPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route element={<Layout />}>
                {routeConfig.map((route, index) => (
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
      </Router>
    </QueryClientProvider>
  )
}

export default App
