import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom'

import Wrapper from '@/layouts/Wrapper'
import LoginPage from '@/pages/user/login.tsx'
import { routes } from './routes/routes'
import { theme } from '@/assets/styles/theme.ts'

const queryClient = new QueryClient()

const App = () => {
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
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div></div>}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route
                path='/'
                element={<Navigate to='/main/dashboard' replace />}
              />
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
          </ThemeProvider>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

export default App
