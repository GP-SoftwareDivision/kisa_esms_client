import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import Wrapper from '@/layouts/Wrapper'
import MainPage from '@/pages/main'
import LoginPage from '@/pages/login'
import { routes } from './routes/routes'

const queryClient = new QueryClient()

const App = () => {
  const Layout = () => {
    return (
      <Wrapper>
        <Outlet />
      </Wrapper>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path='/' element={<MainPage />} />
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

export default App
