import React from 'react'
import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Wrapper from '@/layouts/Wrapper'
import MainPage from '@/pages/main'

const App: React.FC = () => {
  const Layout = () => {
    return (
      <Wrapper>
        <Outlet />
      </Wrapper>
    )
  }

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<MainPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
