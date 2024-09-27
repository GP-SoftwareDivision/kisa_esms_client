import { ReactNode } from 'react'
import Header from '@/layouts/Header.tsx'
import Aside from '@/layouts/Aside.tsx'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Aside />
      <Header />
      {children}
    </>
  )
}
export default Wrapper
