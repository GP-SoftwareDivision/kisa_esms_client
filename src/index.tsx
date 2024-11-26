import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/assets/styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider value={defaultSystem}>
    <App />
  </ChakraProvider>
)
